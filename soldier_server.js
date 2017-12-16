#!/usr/bin/env node

const Web3 = require('web3');
const solc = require('solc');
const fs = require('fs');
const http = require('http');
var deploy_c = require('./deploy_contract');
var erc20abi = require('./erc20abi');

// Using the IPC provider in node.js
var net = require('net');
//const web3 = new Web3(new Web3.providers.IpcProvider("\\\\.\\pipe\\geth.ipc", net)); // WINDOWS path
const web3 = new Web3(new Web3.providers.WebsocketProvider('ws://localhost:8546'));
const asciiToHex = Web3.utils.asciiToHex;
const candidates = ['Rama', 'Nick', 'Jose'];

const countries_t = ["AFG","AGO","ALB","ARE","ARG","ARM","ATA","ATF","AUS","AUT","AZE","BDI","BEL","BEN","BFA","BGD","BGR","BHS","BIH","BLR","BLZ","BOL","BRA","BRN","BTN","BWA","CAF","CAN","CHE","CHL","CHN","CIV","CMR","COD","COG","COL","CRI","CUB","-99","CYP","CZE","DEU","DJI","DNK","DOM","DZA","ECU","EGY","ERI","ESP","EST","ETH","FIN","FJI","FLK","FRA","GUF","GAB","GBR","GEO","GHA","GIN","GMB","GNB","GNQ","GRC","GRL","GTM","GUY","HND","HRV","HTI","HUN","IDN","IND","IRL","IRN","IRQ","ISL","ISR","ITA","JAM","JOR","JPN","KAZ","KEN","KGZ","KHM","KOR","-99","KWT","LAO","LBN","LBR","LBY","LKA","LSO","LTU","LUX","LVA","MAR","MDA","MDG","MEX","MKD","MLI","MMR","MNE","MNG","MOZ","MRT","MWI","MYS","NAM","NCL","NER","NGA","NIC","NLD","NOR","NPL","NZL","OMN","PAK","PAN","PER","PHL","PNG","POL","PRI","PRK","PRT","PRY","QAT","ROU","RUS","RWA","ESH","SAU","SDN","SSD","SEN","SLB","SLE","SLV","-99","SOM","SRB","SUR","SVK","SVN","SWE","SWZ","SYR","TCD","TGO","THA","TJK","TKM","TLS","TTO","TUN","TUR","TWN","TZA","UGA","UKR","URY","USA","UZB","VEN","VNM","VUT","PSE","YEM","ZAF","ZMB","ZWE"]

var countries_ = [];
for (i=0; i<countries_t.length;i++){
	console.log('c '+countries_t[i]+' asciiToHex( countries_t[i])',asciiToHex( countries_t[i]))
	countries_.push(asciiToHex( countries_t[i]))
}

deploy_c.deploy_contract('./voting.sol','TrustMe',[countries_])
//deploy_c.deploy_contract('./General.sol','General',[])
 
/*     var coinbase = '0xf88b86b413198b3bc6527105a53ee292a30365ec';
	var user = '5404367b8332b09b2b5423e188dac2ba52df0ced';
    var ga =  '0x56724b663c54224618DeB808CAe30D9eFd57d512';
	var sa =  '0xA9B05055669781Cbb267Df22e78A53622E2d8e69';
	var trustme = '0x0bAD2f7D36f94ED3A81F41Db23A6F7347ffc7e84';
	
	//console.log('erc20abi.erc20abi ',erc20abi.erc20abi())
	//console.log(web3.eth.accounts[0]);
	
var soldier_token = new web3.eth.Contract(erc20abi.erc20abi(),sa);
var general_token = new web3.eth.Contract(erc20abi.erc20abi(),ga);


soldier_token.methods.balanceOf(coinbase).call(function(err, name) {
    if (err) return console.error('Problem getting name', err)
    console.log('Coin balance ' + name)
})

web3.eth.getAccounts()
.then((accounts)=>
soldier_token.methods.approve(user, 1000).send({from: accounts[0],gas: 470000000},function(err,res){console.log('user approved ! ',err,res);})
);


soldier_token.methods.allowance(coinbase,user).call(function(err, name) {
    if (err) return console.error('Problem getting allowance', err)
    console.log('Coin allowance ' + name)
})

// user will send from coinbase to trustMe
web3.eth.getAccounts()
.then((accounts)=>
soldier_token.methods.transferFrom(coinbase,trustme, 50).send({from: accounts[1],gas: 470000000},function(err,res){console.log('sendFrom ok ! ',err,res);})
).then(() =>

soldier_token.methods.allowance(coinbase,user).call(function(err, name) {
    if (err) return console.error('Problem getting allowance', err)
    console.log('new Coin allowance ' + name)
})
)
 */



