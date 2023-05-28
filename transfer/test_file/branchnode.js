var fs = require('fs');
var fn = "../result/log_w1";
var lineReader = require('line-reader');
var transferjs = require("./transfer_test2");
var counter1 = 0, counter2 = 0;
var trans_acc = null, trans_outchain = null, trans_acc_old = null, trans_outchain_old = null;

// //第一次读取文件
// read_file();

fs.watchFile(fn, { persistent: true, interval: 500 },
    function (curr, prev) {
        if (curr.mtime > prev.mtime) {
            //文件内容有变化，那么通知相应的进程可以执行相关操作。例如读物文件写入数据库等
            console.log("1--counter1:", counter1)
            console.log("1--counter2:", counter2)
            counter1 = counter2;
            counter2 = 0;
            read_file();
        }
    });

//读文件
function read_file() {
    lineReader.eachLine(fn, function (line, last) {
        counter2++;
        console.log("line:" + line.toString())
        console.log("last:" + last.toString())
        if (counter2 > counter1) {
            console.log("3--counter1:", counter1)
            console.log("3--counter2:", counter2)
            if (line.toString() === '--handler-TX_request--') {
                console.log("--get--handler-TX_request--\n")
            }
            if (line.slice(0, 11).toString() === '***---from:') {
                line = line.slice(11, line.length - 6)
                trans_acc = line.toString();
                console.log("trans_acc:" + trans_acc)
            }
            if (line.slice(0, 15).toString() === '***---outchain:') {
                line = line.slice(15, 29)
                while (line.slice(0, 1).toString() === 'a') {
                    line = line.slice(1,)
                }
                trans_outchain = line.toString()
                console.log("outchain:" + trans_outchain)
                // if (trans_acc != trans_acc_old && trans_outchain_old != trans_outchain){
                if (!(trans_acc == trans_acc_old && trans_outchain_old == trans_outchain)) {
                    trans_acc_old = trans_acc;
                    trans_outchain_old = trans_outchain;
                    transferjs.get_outchain_info(trans_acc, trans_outchain)
                }
            }
        }
    });
}
