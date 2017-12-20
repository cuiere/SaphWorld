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
//const web3 = new Web3(new Web3.providers.WebsocketProvider('ws://localhost:8546'));
const web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/'));

const asciiToHex = Web3.utils.asciiToHex;
const candidates = ['Rama', 'Nick', 'Jose'];

const countries_t = ["AFG","AGO","ALB","ARE","ARG","ARM","ATA","ATF","AUS","AUT","AZE","BDI","BEL","BEN","BFA","BGD","BGR","BHS","BIH","BLR","BLZ","BOL","BRA","BRN","BTN","BWA","CAF","CAN","CHE","CHL","CHN","CIV","CMR","COD","COG","COL","CRI","CUB","-99","CYP","CZE","DEU","DJI","DNK","DOM","DZA","ECU","EGY","ERI","ESP","EST","ETH","FIN","FJI","FLK","FRA","GUF","GAB","GBR","GEO","GHA","GIN","GMB","GNB","GNQ","GRC","GRL","GTM","GUY","HND","HRV","HTI","HUN","IDN","IND","IRL","IRN","IRQ","ISL","ISR","ITA","JAM","JOR","JPN","KAZ","KEN","KGZ","KHM","KOR","-99","KWT","LAO","LBN","LBR","LBY","LKA","LSO","LTU","LUX","LVA","MAR","MDA","MDG","MEX","MKD","MLI","MMR","MNE","MNG","MOZ","MRT","MWI","MYS","NAM","NCL","NER","NGA","NIC","NLD","NOR","NPL","NZL","OMN","PAK","PAN","PER","PHL","PNG","POL","PRI","PRK","PRT","PRY","QAT","ROU","RUS","RWA","ESH","SAU","SDN","SSD","SEN","SLB","SLE","SLV","-99","SOM","SRB","SUR","SVK","SVN","SWE","SWZ","SYR","TCD","TGO","THA","TJK","TKM","TLS","TTO","TUN","TUR","TWN","TZA","UGA","UKR","URY","USA","UZB","VEN","VNM","VUT","PSE","YEM","ZAF","ZMB","ZWE"]

var countries_ = [];
for (i=0; i<countries_t.length;i++){
	console.log('c '+countries_t[i]+' asciiToHex( countries_t[i])',asciiToHex( countries_t[i]))
	countries_.push(asciiToHex( countries_t[i]))
}


deploy_c.deploy_contract('./voting.sol','TrustMe',[countries_], web3)
//deploy_c.deploy_contract('./voting.sol','TrustMe',[countries_], web3)
//deploy_c.deploy_contract('./General.sol','General',[])
 



