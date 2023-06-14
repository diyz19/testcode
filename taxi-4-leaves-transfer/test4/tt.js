const PORT = process.argv[2];
const MAP_NAME = process.argv[3];
const POSITION = MAP_NAME === "all" ? "wx4e111111111" : `${MAP_NAME}111111111111`.slice(0, 14);
const POSITION1 = "wx4ep11111111";
const fs = require('fs');
const Web3 = require('web3');
let web3 = new Web3(new Web3.providers.WebsocketProvider("ws://127.0.0.1:" + PORT));

let web31 = new Web3(new Web3.providers.WebsocketProvider("ws://127.0.0.1:"+"8547"));
let web_main = new Web3(new Web3.providers.WebsocketProvider("ws://127.0.0.1:"+"8545"));
// console.log("eth.getAccountByRegion",web31.eth.getAccountByRegion('wx4ep'));
    
let deltaLat = 0.596496069;
let deltaLon = [1.191555127, 1.1800798, 1.157239659, 1.123254668, 1.07845212, 1.023263489, 0.958220271, 0.883948868, 0.801164554, 0.710664587, 0.613320532, 0.510069865, 0.401906947, 0.289873444, 0.175048303, 0.05853735];
let Base32 = "0123456789bcdefghjkmnpqrstuvwxyz".split("");
let Neighbors = [["p0r21436x8zb9dcf5h7kjnmqesgutwvy", // Top
    "bc01fg45238967deuvhjyznpkmstqrwx", // Right
    "14365h7k9dcfesgujnmqp0r2twvyx8zb", // Bottom
    "238967debc01fg45kmstqrwxuvhjyznp", // Left
], ["bc01fg45238967deuvhjyznpkmstqrwx", // Top
    "p0r21436x8zb9dcf5h7kjnmqesgutwvy", // Right
    "238967debc01fg45kmstqrwxuvhjyznp", // Bottom
    "14365h7k9dcfesgujnmqp0r2twvyx8zb", // Left
]];
let Borders = [["prxz", "bcfguvyz", "028b", "0145hjnp"], ["bcfguvyz", "prxz", "0145hjnp", "028b"]];
let Bits = [16, 8, 4, 2, 1];
let precision = 10;
let divnum = 4;
//Map contract
let mapContractAddress = '0x23b98f92ceac005e570b6768da377b3abd11012e';
let mapContractAbi = JSON.parse(fs.readFileSync('./mapContractAbi.json', 'utf-8'));
let mapContract = new web3.eth.Contract(mapContractAbi, mapContractAddress);
let mapContract1 = new web31.eth.Contract(mapContractAbi, mapContractAddress);

//Traffic contract
// let trafficContractAddress = '0xfa6b8f0b92b323c28557faf69da028e33856f6ca';
// let trafficContractAbi = JSON.parse(fs.readFileSync('./trafficContractAbi.json', 'utf-8'));
// let trafficContract = new web3.eth.Contract(trafficContractAbi, trafficContractAddress);
// let trafficContract1 = new web31.eth.Contract(trafficContractAbi, trafficContractAddress);

let transfContractAddress = '0x5d9ec06ef6f5384c50886174a88db14624017340';
let transfContractAbi = JSON.parse(fs.readFileSync('./transfContractAbi.json', 'utf-8'));
let transfContract = new web3.eth.Contract(transfContractAbi, transfContractAddress);
let transfContract1 = new web31.eth.Contract(transfContractAbi, transfContractAddress);

let passengersInfo = JSON.parse(fs.readFileSync("./passengers_info_" + MAP_NAME + ".json", "utf-8"));


let passengerMessagesFile = `./passengers_result_${MAP_NAME}.json`;
let error1File = `./passengers_err1_${MAP_NAME}.json`;
let error2File = `./passengers_err2_${MAP_NAME}.json`;

let startTime = Date.now();
let countNum = 0;
let passengerMessages = [];

let error1Messages = [];
let error2Messages = [];

// const FROM = "wx4er200z2r"
// const TO = "wx4erw9rnsr"
const GAS_OFFER = 500_0000
const VALUE = 100_0000_0000_0000
const accountManagerW11 = "0x196424dd2bf7c978228ebd7a17b38b993d650696"

let pa_id = "0x12d0e4381ef94a70a49252e35b9a65fadd3872b9";
let ve_id = "0xdedee68f2020c0d3f98d2a8c23b6563f7b97e559";

let hashRequests = " ";

//乘客发出调度请求
async function manageVehicleByRegion5() {
    let i = 0;
    for (let accountAddr in passengersInfo) {
        setTimeout(() => {
            console.warn(`${(new Date()).getTime()}@passenger@${accountAddr}@StartProcessing`)
            passengerUnit(accountAddr)
        }, (MAP_NAME === "all" ? 750 : 3000) * i);
        i++;
    }

}
if (process.argv.length === 4) {
    // web3.eth.sendTransaction({
    //     from: ve_id,
    //     to: pa_id,
    //     value: VALUE,
    //     position:POSITION,
    //     txtime:278000
    // });
    // region = MAP_NAME
    
    // web_main.eth.getAccountByRegion(region).then(function (result) {
    // // web31.eth.getAccountByRegion(region).then(function (result) {

    //     if (result != null) {
    //         console.log("regionTask: ", region)
    //         // console.log("regionVehiclesAll: ",regionVehiclesAll);
    //         let resultVehicles = Object.keys(result);
    //         console.log("resultVehicles: ",resultVehicles);
    //         let resultVehiclesTime = Object.values(result);
    //         console.log("resultVehiclesTime: ",resultVehiclesTime);
    //         for (let j = 0; j < resultVehicles.length; j++) {
    //             if (resultVehiclesTime[j] > (startTime - 60000) && resultVehiclesTime[j] < Date.now()) {
    //                 regionVehicles.push(resultVehicles[j]);
    //             }
    //         }
    //         console.log("getAccountByRegion: ",result);
    //     }
    //     else{
    //         console.log("getAccountByRegion_Wrong!!!!!: ",region);
    //     }
    // })
    // trans_tx(pa_id, ve_id);
    trans_tx(pa_id, pa_id);

    console.log("done!");
} else {
    console.error("ArguemntError");
}


function getOff(passengerId, vehicleId) {
    console.log("开始支付订单");
    web3.eth.sendTransaction({
    	from: passengerId,
    	to: vehicleId,
    	value: VALUE,
        gas: GAS_OFFER,
    	position:POSITION,
    	txtime:278000
    })
    .then(function(receipt){
    trafficContract1.methods.confirmPay(vehicleId).send({ from: passengerId, gas: GAS_OFFER, position: POSITION1, txtime: 278000 }).then(function (result) {
        console.log("乘客支付了订单");
        console.warn(`${(new Date()).getTime()}@passenger@${passengerId}@PassengerPaysAndGetsOff`)
    })
    }, function (error1) {
        console.log(`NOT done!!!!`);
    });
}



// eth.sendTransaction({from:eth.accounts[0],to:eth.accounts[2],value:web3.toWei(1,"ether"),position: POSITION,txtime:6})


function sleep(delay) {
	var start = new Date().getTime();
	while (new Date().getTime() < start + delay);
}

async function trans_tx(from_add ,to_add) {
	//移动账户在目标链发送普通交易,余额不足,未成功
    // let i = 0
	// web31.eth.sendTransaction(
	// 	{ from: to_add, to: minerW12, position: POSITION1, txtime: 278000},
	// 	function (err, res) {
	// 		if (err) {
	// 			console.log(`!!mobileAccounts[${i}]--insufficient funds for this transaction--w12!!`)
	// 		}else{
    //             return
    //         }
	// 	}
	// )
	// sleep(200)
	//2. 第一次移动:移动账户在目标链w12发起资产转移请求交易Tx_request
    // sleep(2000)
    transfContract1.methods.IN_transf1(to_add, from_add)
    .send(
        { from: accountManagerW11, gas: GAS_OFFER, position: POSITION1, txtime: 278000 }
        )
    .then(function (result) {
        console.log("IN_transf1");
        web31.eth.sendTransaction(
            { 
                from: to_add, to: accountManagerW11, position: POSITION1, txtype: 1, txtime: Date.now()
            },
            function (err, res) {
                if (err) {
                    console.error("Error:", err);
                } else {
                    // sleep(2000)
                    console.log("res:",res);
                    hashRequests = web31.utils.asciiToHex(res);
                    console.log(`hash_request: ${hashRequests}`);
                }
            }
        )
    })


    transfContract1.events.IN_Event1(function (error, event) {
        if (error !== null) {
            console.log("IN_Event1: ", error);
        }
        if (event.returnValues.passengerId.slice(0, 42) == from_add.toLowerCase()
        && event.returnValues.vehicleId.slice(0, 42) == to_add.toLowerCase()
        ) {
            let passengerId = event.returnValues.passengerId;
            // let passengerGeohash = web3.utils.hexToAscii(event.returnValues.passengerGeohash).slice(0, 11);
            // vehicleCurrentTime = Date.now();
    
            transfContract.methods.OUT_transf2(to_add, from_add)
            .send({ from: accountManagerW11, gas: GAS_OFFER, position: POSITION, txtime: 278000 })
            .then(function (result) {
    
                // let hash_req = hashRequests
                const macc_outbal = VALUE
                console.log("get_outchain_info--outchain_balance:", macc_outbal)
            
                // web3.eth.sendTransaction({ from: from_add, to: accountManagerW11, value: macc_outbal, position: POSITION, txtype: 2, txtime: Date.now(), exdata: hash_req }
                web3.eth.sendTransaction({ from: from_add, to: accountManagerW11, value: macc_outbal, position: POSITION, txtype: 2, txtime: Date.now()}
                , function (err, res) {
                    if (err) {
                        console.log("Error:", err);
                    } else {
                        sleep(2000);
                        console.log("Result:", res);
                        hash_out = web3.utils.asciiToHex(res);
                        // send_inchain_tx(web31, to_add, macc_outbal, hash_out, POSITION1, web3, POSITION);
                    }
                });
            })
        }
    })

    
    transfContract.events.OUT_Event2(function (error, event) {
        if (error !== null) {
            console.log("OUT_Event2: ", error);
        }
        if (event.returnValues.passengerId.slice(0, 42) == from_add.toLowerCase()
        && event.returnValues.vehicleId.slice(0, 42) == to_add.toLowerCase()
        ) {
            // let passengerId = event.returnValues.passengerId;
    
            transfContract1.methods.IN_transf3(to_add, from_add)
            .send({ from: accountManagerW11, gas: GAS_OFFER, position: POSITION1, txtime: 278000 })
            .then(function (result) {
                // web31.eth.sendTransaction({ from: accountManagerW11, to: ve_id, value: VALUE, position: inpos, txtype: 3, txtime: Date.now(), exdata: txouthash }
                web31.eth.sendTransaction({ from: accountManagerW11, to: to_add, value: VALUE, position: POSITION1, txtype: 3, txtime: Date.now() }
                , function (err, res) {
                    if (err) {
                        console.log("Error:", err);
                    } else {
                        sleep(2000)
                        console.log("send_inchain--Result:", res);
                        hash_in = web31.utils.asciiToHex(res);
                        console.log("send_inchain--hash_in:", hash_in);
                        // sleep(2000)
                        console.log("send_inchain--balance:", VALUE)
                        // send_result_tx(outweb3, ve_id, true, hash_in, outpos);
                    }
                });
            })
        }
    })

    transfContract1.events.IN_Event3(function (error, event) {
        if (error !== null) {
            console.log("IN_Event3: ", error);
        }
        if (event.returnValues.passengerId.slice(0, 42) == from_add.toLowerCase()
        && event.returnValues.vehicleId.slice(0, 42) == to_add.toLowerCase()
        ) {
            // let passengerId = event.returnValues.passengerId;
    
            transfContract.methods.OUT_transf4(to_add, from_add)
            .send({ from: accountManagerW11, gas: GAS_OFFER, position: POSITION, txtime: 278000 })
            .then(function (result) {
                // outweb3.eth.sendTransaction({ from: accountManagerW11, to: from_add, position: outpos, txtype: 4, txtime: Date.now(), exdata: txinhash }
                web3.eth.sendTransaction({ from: accountManagerW11, to: from_add, position: POSITION, txtype: 4, txtime: Date.now()}
                , function (err, res) {
                    if (err) {
                        console.log("Error:", err);
                    } else {
                        sleep(2000)
                        console.log("send_result--Tx_result:", res);
                        // endtime = new Date().getTime();
                        // console.log("during--", endtime - starttime)
                    }
                });
            })
        }
    })


    transfContract.events.OUT_Event4(function (error, event) {
        if (error) {
                console.log("Error:", error);
        } else {
                sleep(2000)
                console.log("send_result--Tx_result:", 'end');
                // endtime = new Date().getTime();
                // console.log("during--", endtime - starttime)
        }
    });
}

//4. ama在目标链发送资产转入交易Tx_in
function send_inchain_tx(inweb3, acc, inbal, txouthash, inpos, outweb3, outpos) {
	inweb3.eth.sendTransaction({ from: accountManagerW11, to: acc, value: inbal, position: inpos, txtype: 3, txtime: Date.now(), exdata: txouthash }
    , function (err, res) {
		if (err) {
			console.log("Error:", err);
		} else {
			sleep(2000)
			console.log("send_inchain--Result:", res);
			hash_in = inweb3.utils.asciiToHex(res);
			console.log("send_inchain--hash_in:", hash_in);
			sleep(2000)
			var macc1_inbal = inweb3.eth.getBalance(acc)
			console.log("send_inchain--balance:", macc1_inbal)
			send_result_tx(outweb3, acc, true, hash_in, outpos);
		}
	});

}


//5. ama在来源链发送Tx_result交易
function send_result_tx(outweb3, acc, result, txinhash, outpos) {
	if (result) {
		outweb3.eth.sendTransaction({ from: accountManagerW11, to: acc, position: outpos, txtype: 4, txtime: Date.now(), exdata: txinhash }
            , function (err, res) {
			if (err) {
				console.log("Error:", err);
			} else {
				sleep(2000)
				console.log("send_result--Tx_result:", res);
				// endtime = new Date().getTime();
				// console.log("during--", endtime - starttime)
			}
		});
	}
}