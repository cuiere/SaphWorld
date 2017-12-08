const Web3 = require('web3');
const solc = require('solc');
const fs = require('fs');
const http = require('http');


// Using the IPC provider in node.js
var net = require('net');


//const web3 = new Web3(new Web3.providers.IpcProvider("\\\\.\\pipe\\geth.ipc", net)); // WINDOWS path
const web3 = new Web3(new Web3.providers.WebsocketProvider('ws://localhost:8545'));

const asciiToHex = Web3.utils.asciiToHex;




var lineReader = require('fs').readFileSync("./world_countries.txt", 'utf-8')
    .split('\n');
	
	console.log(lineReader)
	
	var tmp='';
	
	
lineReader.forEach(function (line) {
	console.log('before ',line)
	tmp += "'"+asciiToHex(line)+"',\n";
  	console.log('After ',tmp)

});
//.then(() =>

 fs.writeFile("countries.hex", tmp, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
})// );