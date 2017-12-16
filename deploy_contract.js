#!/usr/bin/env node

const Web3 = require('web3');
const solc = require('solc');
const fs = require('fs');
const http = require('http');


// Using the IPC provider in node.js
var net = require('net');



//const web3 = new Web3(new Web3.providers.IpcProvider("\\\\.\\pipe\\geth.ipc", net)); // WINDOWS path
const web3 = new Web3(new Web3.providers.WebsocketProvider('ws://localhost:8546'));

const asciiToHex = Web3.utils.asciiToHex;

module.exports = {
deploy_contract:async function (filepath, contract_name, args){


return await web3.eth.getAccounts()
.then(async (accounts) => {
  // console.log('accounts', accounts);
  const code = [
	  fs.readFileSync(filepath).toString()
		];
	  
	  const whole = code.join('\n').toString();	   
	  const compiledCode = solc.compile(whole);
	  const errors = [];
	  const warnings = [];
	  (compiledCode.errors || []).forEach((err) => {
		if (/\:\s*Warning\:/.test(err)) {
		  warnings.push(err);
		} else {
		  errors.push(err);
		}
	  });

  if (errors.length) {
    throw new Error('solc.compile: ' + errors.join('\n'));
  }
  if (warnings.length) {
     console.warn('solc.compile: ' + warnings.join('\n'));
  }
  
  
  const byteCode = compiledCode.contracts[':'+contract_name].bytecode;
   //console.log('byteCode', byteCode);
  const abiDefinition = JSON.parse(compiledCode.contracts[':'+contract_name].interface);
   console.log('abiDefinition', compiledCode.contracts[':'+contract_name].interface);
  // console.log("from client ",accounts[0]);
  const VotingContract = new web3.eth.Contract(abiDefinition,
    {data: '0x'+byteCode, from: accounts[0], gas: 210000000*5}
  );
   //console.log('VotingContract', VotingContract);
  let deployedContract = null ;
  
  var vcd = await VotingContract.deploy({arguments: args})//{countries:countries_}
  var vcd2=  await vcd.send(function(error, transactionHash){ 
		 console.log('deploy transactionHash', transactionHash);
		})
		 .on('error', function(error){ console.log('error on deploy ',error);})
		
	     .then((result) => {
		    console.log('Contract ',contract_name,' adress : ',result.options.address);
			deployedContract = result.options.address ; // must return not log !
			return result.options.address;
	    }) 
		
		 return {
        address: deployedContract,
        abi: compiledCode.contracts[':'+contract_name].interface
    };
 
  
 //

})
  
}
}