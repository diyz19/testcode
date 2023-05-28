const fs = require('fs');
const Web3 = require('web3');

var POSITION = ("w1111111111111").slice(0, 14);
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8511"));
// let web3 = new Web3(new Web3.providers.WebsocketProvider("ws://127.0.0.1:8546"));

//Map contract
let TransfAddress = '0x23b98f92ceac005e570b6768da377b3abd11012e';
let TransContractAbi = JSON.parse(fs.readFileSync('./transfAbi.json', 'utf-8'));
let TransContract = web3.eth.contract(TransContractAbi, TransfAddress);

const value = 500;
let from_add = "0x59cadf05182c56784b60960159c0fb4d16860d10";
let to_add = "0x4d326e5422c48ca1db8695bb59c9a58005a3fb44";

TransContract.methods.transfer(to_add, value).then(function (result) {
    console.log("done!!!");
})