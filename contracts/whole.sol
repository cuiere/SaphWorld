pragma solidity ^0.4.18;


/**
 * @title SafeMath
 * @dev Math operations with safety checks that throw on error
 */
library SafeMath {
  function mul(uint256 a, uint256 b) internal pure returns (uint256) {
    if (a == 0) {
      return 0;
    }
    uint256 c = a * b;
    assert(c / a == b);
    return c;
  }

  function div(uint256 a, uint256 b) internal pure returns (uint256) {
    // assert(b > 0); // Solidity automatically throws when dividing by 0
    uint256 c = a / b;
    // assert(a == b * c + a % b); // There is no case in which this doesn't hold
    return c;
  }

  function sub(uint256 a, uint256 b) internal pure returns (uint256) {
    assert(b <= a);
    return a - b;
  }

  function add(uint256 a, uint256 b) internal pure returns (uint256) {
    uint256 c = a + b;
    assert(c >= a);
    return c;
  }
}



/**
 * @title ERC20Basic
 * @dev Simpler version of ERC20 interface
 * @dev see https://github.com/ethereum/EIPs/issues/179
 */
contract ERC20Basic {
  uint256 public totalSupply;
  function balanceOf(address who) public view returns (uint256);
  function transfer(address to, uint256 value) public returns (bool);
  event Transfer(address indexed from, address indexed to, uint256 value);
}




/**
 * @title ERC20 interface
 * @dev see https://github.com/ethereum/EIPs/issues/20
 */
contract ERC20 is ERC20Basic {
  function allowance(address owner, address spender) public view returns (uint256);
  function transferFrom(address from, address to, uint256 value) public returns (bool);
  function approve(address spender, uint256 value) public returns (bool);
  event Approval(address indexed owner, address indexed spender, uint256 value);
}



/**
 * @title Basic token
 * @dev Basic version of StandardToken, with no allowances.
 */
contract BasicToken is ERC20Basic {
  using SafeMath for uint256;

  mapping(address => uint256) balances;

  /**
  * @dev transfer token for a specified address
  * @param _to The address to transfer to.
  * @param _value The amount to be transferred.
  */
  function transfer(address _to, uint256 _value) public returns (bool) {
    require(_to != address(0));
    require(_value <= balances[msg.sender]);

    // SafeMath.sub will throw if there is not enough balance.
    balances[msg.sender] = balances[msg.sender].sub(_value);
    balances[_to] = balances[_to].add(_value);
    Transfer(msg.sender, _to, _value);
    return true;
  }

  /**
  * @dev Gets the balance of the specified address.
  * @param _owner The address to query the the balance of.
  * @return An uint256 representing the amount owned by the passed address.
  */
  function balanceOf(address _owner) public view returns (uint256 balance) {
    return balances[_owner];
  }

}



/**
 * @title Ownable
 * @dev The Ownable contract has an owner address, and provides basic authorization control
 * functions, this simplifies the implementation of "user permissions".
 */
contract Ownable {
  address public owner;


  event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);


  /**
   * @dev The Ownable constructor sets the original `owner` of the contract to the sender
   * account.
   */
  function Ownable() public {
    owner = msg.sender;
  }


  /**
   * @dev Throws if called by any account other than the owner.
   */
  modifier onlyOwner() {
    require(msg.sender == owner);
    _;
  }


  /**
   * @dev Allows the current owner to transfer control of the contract to a newOwner.
   * @param newOwner The address to transfer ownership to.
   */
  function transferOwnership(address newOwner) public onlyOwner {
    require(newOwner != address(0));
    OwnershipTransferred(owner, newOwner);
    owner = newOwner;
  }

}



/**
 * @title Standard ERC20 token
 *
 * @dev Implementation of the basic standard token.
 * @dev https://github.com/ethereum/EIPs/issues/20
 * @dev Based on code by FirstBlood: https://github.com/Firstbloodio/token/blob/master/smart_contract/FirstBloodToken.sol
 */
contract StandardToken is ERC20, BasicToken {

  mapping (address => mapping (address => uint256)) internal allowed;


  /**
   * @dev Transfer tokens from one address to another
   * @param _from address The address which you want to send tokens from
   * @param _to address The address which you want to transfer to
   * @param _value uint256 the amount of tokens to be transferred
   */
  function transferFrom(address _from, address _to, uint256 _value) public returns (bool) {
    require(_to != address(0));
    require(_value <= balances[_from]);
    require(_value <= allowed[_from][msg.sender]);

    balances[_from] = balances[_from].sub(_value);
    balances[_to] = balances[_to].add(_value);
    allowed[_from][msg.sender] = allowed[_from][msg.sender].sub(_value);
    Transfer(_from, _to, _value);
    return true;
  }

  /**
   * @dev Approve the passed address to spend the specified amount of tokens on behalf of msg.sender.
   *
   * Beware that changing an allowance with this method brings the risk that someone may use both the old
   * and the new allowance by unfortunate transaction ordering. One possible solution to mitigate this
   * race condition is to first reduce the spender's allowance to 0 and set the desired value afterwards:
   * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
   * @param _spender The address which will spend the funds.
   * @param _value The amount of tokens to be spent.
   */
  function approve(address _spender, uint256 _value) public returns (bool) {
    allowed[msg.sender][_spender] = _value;
    Approval(msg.sender, _spender, _value);
    return true;
  }

  /**
   * @dev Function to check the amount of tokens that an owner allowed to a spender.
   * @param _owner address The address which owns the funds.
   * @param _spender address The address which will spend the funds.
   * @return A uint256 specifying the amount of tokens still available for the spender.
   */
  function allowance(address _owner, address _spender) public view returns (uint256) {
    return allowed[_owner][_spender];
  }

  /**
   * approve should be called when allowed[_spender] == 0. To increment
   * allowed value is better to use this function to avoid 2 calls (and wait until
   * the first transaction is mined)
   * From MonolithDAO Token.sol
   */
  function increaseApproval(address _spender, uint _addedValue) public returns (bool) {
    allowed[msg.sender][_spender] = allowed[msg.sender][_spender].add(_addedValue);
    Approval(msg.sender, _spender, allowed[msg.sender][_spender]);
    return true;
  }

  function decreaseApproval(address _spender, uint _subtractedValue) public returns (bool) {
    uint oldValue = allowed[msg.sender][_spender];
    if (_subtractedValue > oldValue) {
      allowed[msg.sender][_spender] = 0;
    } else {
      allowed[msg.sender][_spender] = oldValue.sub(_subtractedValue);
    }
    Approval(msg.sender, _spender, allowed[msg.sender][_spender]);
    return true;
  }

}





/**
 * @title Mintable token
 * @dev Simple ERC20 Token example, with mintable token creation
 * @dev Issue: * https://github.com/OpenZeppelin/zeppelin-solidity/issues/120
 * Based on code by TokenMarketNet: https://github.com/TokenMarketNet/ico/blob/master/contracts/MintableToken.sol
 */

contract MintableToken is StandardToken, Ownable {
  event Mint(address indexed to, uint256 amount);
  event MintFinished();

  bool public mintingFinished = false;


  modifier canMint() {
    require(!mintingFinished);
    _;
  }

  /**
   * @dev Function to mint tokens
   * @param _to The address that will receive the minted tokens.
   * @param _amount The amount of tokens to mint.
   * @return A boolean that indicates if the operation was successful.
   */
  function mint(address _to, uint256 _amount) onlyOwner canMint public returns (bool) {
    totalSupply = totalSupply.add(_amount);
    balances[_to] = balances[_to].add(_amount);
    Mint(_to, _amount);
    Transfer(address(0), _to, _amount);
    return true;
  }

  /**
   * @dev Function to stop minting new tokens.
   * @return True if the operation was successful.
   */
  function finishMinting() onlyOwner canMint public returns (bool) {
    mintingFinished = true;
    MintFinished();
    return true;
  }
}


contract Soldier is MintableToken {
  string public name = "Soldier";
  string public symbol = "SDR";
  uint256 public decimals = 18;
  function Soldier(){
   balances[msg.sender] = 88888888;
  }
  
}

contract TrustMe {
  


// https://ethereum.stackexchange.com/questions/15337/can-we-get-all-elements-stored-in-a-mapping-in-the-contract



	bytes32 ss = '0x41666768616e697374616e0d';
    uint[] x = [1, 3, 4];

   bytes32[] public Countries; // must be initialized by constructor !! long array of strings

   uint8 countries_length = 197;

	function getCountries() public view returns(bytes32[]){
		return Countries;
	}



  
  // tout utilisateur peut etre un produit
   struct Product {
	uint product_id;
	//!! verif exists
	mapping (uint => uint) modalities; // modalité1=> 1
	}

	
   struct Provider {
	  bytes32 provider_id;
	  Product[] provider_products;  
   }
  
    event RankH(
       uint16 rank,
	   uint16 prodIndex
	   );
	   
	   
  
  
    mapping(address =>  mapping(bool => address) ) indexT;
	mapping(address =>  mapping(bool => address) ) indexProviders;
	mapping(bytes32 =>  mapping(bool => bytes32) ) modalites2;
	mapping(bytes32 =>  mapping(bool => bytes32) ) indexModalities;
	
	
	
	mapping( bytes32 =>  mapping(bytes32 =>  mapping(bool => bytes32) )) modalites; // mapping of linked lists
	mapping( bytes32 =>  mapping(bytes32 =>  mapping(bool => bytes32) )) products; 
	
	bool NEXT = true;
	bool PREV = false;
	
	mapping (bytes32 => mapping (bytes32 => mapping (bytes32 => uint16))) public Ranks;
	  
	event Mod(bytes32 mod);
	
	
	
	
	
// ################################################ Modalities ####################################################################################################
	function addModality(bytes32 prod, bytes32 modality) private	{
		// Link the new node 
		
		
		modalites[prod][modality][PREV] = 0x0;
		modalites[prod][modality][NEXT] = modalites[prod][0x0][NEXT];

		
		modalites[prod][0x0][NEXT] = modality;
		modalites[prod][modalites[prod][0x0][NEXT]][PREV] = modalites[prod][0x0][NEXT]; // to avoid memory copy
	
		//Mod(modalites[prod][0x0][NEXT]);
		
	}
	


	function removeModality( bytes32 prod, bytes32 modality ) private
	{
		// Stitch the neighbours together
		bytes32 no = modalites[prod][modality][PREV] ;
		bytes32 noo = modalites[prod][modality][NEXT];
		modalites[prod][no][NEXT] =modalites[prod][modality][NEXT];
		modalites[prod][noo][PREV] =modalites[prod][modality][PREV];

		// Delete state storage
		delete modalites[prod][modality][PREV];
		delete modalites[prod][modality][NEXT];
		//delete Ranks[msg.sender][provider][prod][modality];
	} 
	
	
	
	function getModalities(bytes32 prod)  public view returns(bytes32[]){
		// return all modalities for a given product
		bytes32[]  storage result;
		bytes32 nxt_add = modalites[prod][0x0][NEXT];
	
		while (nxt_add != 0x0 ){
			result.push(nxt_add);
			nxt_add = modalites[prod][nxt_add][NEXT];
		}
		
		return result;
	}
	
	
	 
	
	function getLenModalities(bytes32 prod) public view returns(uint16){
		// return all modalities for a given product
		uint16  result;
		bytes32 nxt_add = modalites[prod][0x0][NEXT];
	
		while (nxt_add != 0x0 ){
			result+= 1;
			nxt_add = modalites[prod][nxt_add][NEXT];
		}	
		return result;	
	}
	
  // ################################################ Products #########################################


    function rank(bytes32 prov, bytes32 prod, bytes32 moda) public{
		// !! this will errase old modality if the same name
		//uint16 tst = 999;
		if (Ranks[prov][prod][moda] == 0x0){
			RankH({rank:88, prodIndex:88});
			addModality(prod,moda);
		 }
		 
		    Ranks[prov][prod][moda] += 1;
			RankH({rank:100, prodIndex:Ranks[prov][prod][moda]});

	}
	
	
	function getRank(bytes32 prov, bytes32 prod, bytes32 moda) public view returns(uint16){
		return Ranks[prov][prod][moda];	
	}
  
  

  


  /* This is the constructor which will be called once when you
  deploy the contract to the blockchain. When we deploy the contract,
  we will pass an array of candidates who will be contesting in the election
  */
  function TrustMe(bytes32[] countries) public {
	  
	  Countries = countries;
	  
	  // 0x01 good
	  // 0x02 normal
	  // 0x03 bad
	 
  }
  

}
