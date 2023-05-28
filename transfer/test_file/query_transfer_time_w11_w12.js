const Web3 = require('web3');
//Geth_w11
const w11_web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8511"));
//Geth_w12
const w12_web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8521"));

//数据查询-------------------
//吞吐量计算相关
var blocknum_w11 = w11_web3.eth.blockNumber;
var blocknum_w12 = w12_web3.eth.blockNumber;
var curblock, curnum, curtype, curtime, txhash, curtx;

//写文件
var fs = require('fs');

function get_transfer_tx_w11() {
    fs.openSync("../result/tx_request_w11.txt", "w")
    fs.openSync("../result/tx_result_w11.txt", "w")

    console.log("blocknum_w11:", blocknum_w11);
    for (var i = 0; i < blocknum_w11; i++) {
        curblock = w11_web3.eth.getBlock(i);
        curnum = (curblock.transactions).length;
        curtime = curblock.timestamp;
        if (curnum > 0) {
            for (var j = 0; j < curnum; j++) {
                txhash = curblock.transactions[j];
                curtx = w11_web3.eth.getTransaction(txhash);
                curtype = curtx.txtype;
                console.log("curtype:", curtype);
                if (curtype === "0x1") {
                    fs.appendFile("../result/tx_request_w11.txt", curtx.from.toString() + '	' + curtime.toString() + '\n', (error) => {
                        if (error) return console.log("fail" + error.message);
                        console.log("tx_request success!!");
                    })
                }
                if (curtype === "0x4") {
                    fs.appendFile("../result/tx_result_w11.txt", curtx.to.toString() + '	' + curtime.toString() + '\n', (error) => {
                        if (error) return console.log("fail" + error.message);
                        console.log("tx_result success!!");
                    })
                }
            }
        }
    }
}

function get_transfer_tx_w12() {
    fs.openSync("../result/tx_request_w12.txt", "w")
    fs.openSync("../result/tx_result_w12.txt", "w")
    console.log("blocknum_w12:", blocknum_w12);
    for (var i = 0; i < blocknum_w12; i++) {
        curblock = w12_web3.eth.getBlock(i);
        curnum = (curblock.transactions).length;
        curtime = curblock.timestamp;
        if (curnum > 0) {
            for (var j = 0; j < curnum; j++) {
                txhash = curblock.transactions[j];
                curtx = w12_web3.eth.getTransaction(txhash);
                curtype = curtx.txtype;
                console.log("curtype:", curtype);
                if (curtype == "0x1") {
                    fs.appendFile("../result/tx_request_w12.txt", curtx.from.toString() + '	' + curtime.toString() + '\n', (error) => {
                        if (error) return console.log("fail" + error.message);
                        console.log("tx_request success!!");
                    })
                }
                if (curtype == "0x4") {
                    fs.appendFile("../result/tx_result_w12.txt", curtx.to.toString() + '	' + curtime.toString() + '\n', (error) => {
                        if (error) return console.log("fail" + error.message);
                        console.log("tx_result success!!");
                    })
                }
            }
        }
    }
}


get_transfer_tx_w11();
get_transfer_tx_w12();

