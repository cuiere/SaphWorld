pragma solidity ^0.4.18;

// https://github.com/ethereum/EIPs/issues/20

contract ERC20 {

    function totalSupply() constant returns (uint totalSupply);
    function balanceOf(address _owner) constant returns (uint balance);
    function transfer(address _to, uint _value) returns (bool success);
    function transferFrom(address _from, address _to, uint _value) returns (bool success);
    function approve(address _spender, uint _value) returns (bool success);
    function allowance(address _owner, address _spender) constant returns (uint remaining);
    event Transfer(address indexed _from, address indexed _to, uint _value);
    event Approval(address indexed _owner, address indexed _spender, uint _value);
	string public  name ;
    bytes32 public  symbol;
    uint8 public  decimals;

}

contract TrustMe { //is Ownable
  


// https://ethereum.stackexchange.com/questions/15337/can-we-get-all-elements-stored-in-a-mapping-in-the-contract

		

	bytes32 ss = '0x41666768616e697374616e0d';
    uint[] x = [1, 3, 4];
	
	
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
       uint rank,
	   uint prodIndex
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
	
	mapping(uint => address) token_providers;
	  
	event Mod(bytes32 mod);
	
	
	
   address soldier = 0xa6A0EF616bfEF6FE29685cF22Bb42A2E6C3731f1;
   address owner = 0xc34521c41e1859535631f1928873ab518195ca6e;

   
   struct transfer{
		ERC20 coinContract;
		uint amount;
		address recipient;
	}
	mapping(uint => transfer) transfers;
	uint numTransfers;
	
	uint numTokenProviders;
	
	function sendCoin(address coinContractAddress, address receiver, uint amount) returns(bool){
		//require(token_providers[coinContractAddress] != 0x0);
		transfer t = transfers[numTransfers]; //Creates a reference t
		t.coinContract = ERC20(coinContractAddress);
		t.amount = amount;
		t.recipient = receiver;
		t.coinContract.transfer(receiver, amount);
		numTransfers++;
		return true;
	}
   
   bytes32[] public Countries; // must be initialized by constructor !! long array of strings
   

   uint8 countries_length = 197;

	function getCountries() public view returns(bytes32[]){
		return Countries;
	}
	
	function getTokenProviderAddress(uint symb) public view returns(address){
		return token_providers[symb];
	}
	
	  event ProvA(
       uint symbol,
	   address addr
	   );
	
	function addTokenProvider(address token_address) public  {
		ERC20 s = ERC20(token_address);
		token_providers[numTokenProviders] = token_address;
		ProvA({symbol:numTokenProviders, addr:token_providers[numTokenProviders]});
		RankH({rank:11, prodIndex:numTransfers});
		numTokenProviders ++;

		//return true;
	}
	



  
	
	
	
	
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
