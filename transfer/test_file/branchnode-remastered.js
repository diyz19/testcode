"use strict";

const fs = require('fs');
const lineReader = require('line-reader');

const transferjs = require("./transfer_test2_large");

const filename = "../result/log_w1";
var trans_acc = "", trans_outchain = "", trans_acc_old = "", trans_outchain_old = "";

function main() {
    // 每次读之前都把日志文件清空
    fs.openSync(filename, "w")

    let linePointer = -1

    fs.watchFile(
        filename,
        { persistent: true, interval: 500 },
        (currentFileStatus, previousFileStatus) => {
            if (currentFileStatus.mtime > previousFileStatus.mtime) {
                let tempCounter = 0
                lineReader.eachLine(filename, (line, isLast) => {
                    if (tempCounter > linePointer) {
                        // 读取到新行，处理逻辑
                        // console.log(line)
                        console.log("line:" + line.toString())
                        console.log("isLast:" + isLast.toString())

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

                        // if (line === "--handler-TX_request--") {
                        //     console.log("Received handler-TX_request\n")
                        // } else if (line.startsWith("***---from:")) {
                        //     line = line.slice(11, line.length - 6)
                        //     trans_acc = line.toString();
                        //     console.log("trans_account = " + trans_acc)
                        // } else if (line.startsWith("***---outchain:")) {
                        //     line = line.slice(15, 29)
                        //     while (line[0] === 'a') {
                        //         line = line.slice(1,)
                        //     }
                        //     trans_outchain = line.toString()
                        //     console.log("outchain(target?) = " + trans_outchain)
                        //     if (trans_acc != trans_acc_old && trans_outchain_old != trans_outchain) {
                        //         trans_acc_old = trans_acc;
                        //         trans_outchain_old = trans_outchain;
                        //         transferjs.get_outchain_info(trans_acc, trans_outchain)
                        //     }
                        // }
                    }
                    linePointer = Math.max(tempCounter, linePointer)
                    tempCounter++
                })
                // console.log("linePointer = ", linePointer)
            }
        }
    )
}

main()

// fs.watchFile(fn, { persistent: true, interval: 500 },
//     function (curr, prev) {
//         if (curr.mtime > prev.mtime) {
//             //文件内容有变化，那么通知相应的进程可以执行相关操作。例如读物文件写入数据库等
//             // console.log("1--counter1:",counter1)
//             // console.log("1--counter2:",counter2)
//             counter1 = counter2;
//             counter2 = 0;
//             read_file();
//         }
//     }
// )

// //读文件
// function read_file() {
//     lineReader.eachLine(fn, function (line, last) {
//         counter2++;
//         if (counter2 > counter1) {
//             // console.log("2--counter1:",counter1)
//             // console.log("2--counter2:",counter2)
//             if (line.toString() === '--handler-TX_request--') {
//                 console.log("--get--handler-TX_request--\n")
//             }
//             if (line.slice(0, 11).toString() === '***---from:') {
//                 line = line.slice(11, line.length - 6)
//                 trans_acc = line.toString();
//                 console.log("trans_acc:" + trans_acc)
//             }
//             if (line.slice(0, 15).toString() === '***---outchain:') {
//                 line = line.slice(15, 29)
//                 while (line.slice(0, 1).toString() === 'a') {
//                     line = line.slice(1,)
//                 }
//                 trans_outchain = line.toString()
//                 console.log("outchain:" + trans_outchain)
//                 if (trans_acc != trans_acc_old && trans_outchain_old != trans_outchain) {
//                     trans_acc_old = trans_acc;
//                     trans_outchain_old = trans_outchain;
//                     transferjs.get_outchain_info(trans_acc, trans_outchain)
//                 }
//             }
//         }
//     });
// }
