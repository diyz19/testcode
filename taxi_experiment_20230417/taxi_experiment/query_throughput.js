var Web3 = require('web3');
//Geth11
var wx4Web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8081"));

//数据查询-------------------
//吞吐量计算相关
var blocktime = new Array();
var txnum = new Array();
var curblock;

//写文件
const fs = require('fs');

function get_throughput() {
    //注意，每次读取的区块数需要在500块以内
    wx4Web3.eth.getBlockNumber().then((res) => {
        console.log(res)
        for (let i = 0; i < res; i++) {
            //for(var i=0;i<500;i++){
            //for(var i=500;i<blocknum;i++){
            wx4Web3.eth.getBlock(i).then((curblock) => {
                // curblock = wx4Web3.eth.getBlock(i);
                blocktime[i] = curblock.timestamp;
                txnum[i] = (curblock.transactions).length;
                fs.appendFile("./index_wx4.txt", i.toString() + '\n', (error) => {
                    if (error) return console.log("fail" + error.message);
                    console.log("index success!!");
                })
                fs.appendFile("./timestamp_wx4.txt", curblock.timestamp.toString() + '\n', (error) => {
                    if (error) return console.log("fail" + error.message);
                    console.log("timestamp success!!");
                })
                fs.appendFile("./txlen_wx4.txt", (curblock.transactions).length.toString() + '\n', (error) => {
                    if (error) return console.log("fail" + error.message);
                    console.log("txlen success!!");
                })
                console.log("index:" + i + "--txnum:", (curblock.transactions).length);
            })
        }
    })
}

get_throughput();
