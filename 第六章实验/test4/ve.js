const PORT = process.argv[2];
const MAP_NAME = process.argv[3];
const POSITION = MAP_NAME === "all" ? "wx4e111111111" : `${MAP_NAME}111111111111`.slice(0, 14);

const fs = require('fs');
const Web3 = require('web3');
let web3 = new Web3(new Web3.providers.WebsocketProvider("ws://127.0.0.1:" + PORT));

//Map contract
let mapContractAddress = '0x23b98f92ceac005e570b6768da377b3abd11012e';
let mapContractAbi = JSON.parse(fs.readFileSync('./mapContractAbi.json', 'utf-8'));
let mapContract = new web3.eth.Contract(mapContractAbi, mapContractAddress);

//Traffic contract
let trafficContractAddress = '0xfa6b8f0b92b323c28557faf69da028e33856f6ca';
let trafficContractAbi = JSON.parse(fs.readFileSync('./trafficContractAbi.json', 'utf-8'));
let trafficContract = new web3.eth.Contract(trafficContractAbi, trafficContractAddress);

// let vehicleIdList = JSON.parse(fs.readFileSync('./partVehicle.json', 'utf-8'));
// let vehiclePositionList = JSON.parse(fs.readFileSync('./vPosTime.json', 'utf-8'));
let vehiclesInfo = JSON.parse(fs.readFileSync("./vehicles_info_" + MAP_NAME + ".json", "utf-8"));

let vehicleResultFile = "./vehicle_result_" + MAP_NAME + ".json";
let vehicleAstarErr1File = "./vehicle_err1_" + MAP_NAME + ".json";
let vehicleAstarErr2File = "./vehicle_err2_" + MAP_NAME + ".json";

// let runTime = 29 * 60 * 1000;  // 系统运行时间
let startTime = Date.now();
let allVehicleMessage = [];
let onlineVehicleNum = 0;//每初始化一辆车此数+1
let countNum = 0;//每完成一件订单，countNum加1

let astarErr1Messages = [];
let astarErr2Messages = [];

// const LOCATION = "wx4ernfyb2x"
// const GAS_OFFER = 50_0000_0000
// const GAS_OFFER = 1
const GAS_OFFER = 500_0000
const VALUE = 100_0000_0000_0000
const accountManagerW11 = "0x196424dd2bf7c978228ebd7a17b38b993d650696"
// 892_8260_0000_0000
// 49999992826000000000
async function initVehicle() {
    const task = [];
    for (let accountAddr in vehiclesInfo) {
        console.log("accountAddr" + accountAddr);
        console.warn(`${(new Date()).getTime()}@vehicle@${accountAddr}@StartProcessing`);
        initUnit(accountAddr, vehiclesInfo[accountAddr].initPos);
    }
    // for (let i = 0; i < vehicleIdList.length; i++) {
    //     // task.push(initUnit(vehicleIdList[i], vehiclePositionList[i]));
    //     // setTimeout(() => {
    //     console.warn(`${(new Date()).getTime()}@vehicle@${vehicleIdList[i]}@StartProcessing`)
    //     // console.log(`${vehicleIdList[i]}: ${vehiclePositionList[i].position}`)
    //     // console.log(`${vehicleIdList[i]}: ${LOCATION}`)
    //     initUnit(vehicleIdList[i], vehiclePositionList[i].position);
    //     // initUnit(vehicleIdList[i], LOCATION);
    //     // }, vehiclePositionList[i].time)
    // }
    Promise.all(task).then((res) => {
        console.log("车辆正在上传位置")
    })
}

initVehicle();
// deleteVehicle();
// getVehicleIdList();


async function initUnit(vehicleId, vehiclePosition) {
    let vehicleMessage = {};
    let vehicleCurrentTime = Date.now();
    // //event
    // console.log("get_message")
    trafficContract.events.Myevent(function (error, event) {
        if (error !== null) {
            console.log("Myevent_error: ", error);
        }
        //whether to pick up the passenger
        console.log("get_message");
        console.log("event.returnValues.vehicleId",event.returnValues.vehicleId);
        if (event.returnValues.vehicleId.slice(0, 42) == vehicleId.toLowerCase()) {
            // console.log(event);

            let passengerId = event.returnValues.passengerId;
            let passengerGeohash = web3.utils.hexToAscii(event.returnValues.passengerGeohash).slice(0, 11);
            console.log(vehicleId, "接到了乘客", passengerId, "的订单, 乘客位置: ", passengerGeohash);
            console.warn(`${(new Date()).getTime()}@vehicle@${vehicleId}@PickUp@${passengerId}`)
            vehicleCurrentTime = Date.now();

            vehicleMessage.passengerId = passengerId;
            vehicleMessage.passengerGeohash = passengerGeohash;
            vehicleMessage.vehicleId = vehicleId;
            vehicleMessage.vehicleStartPosition = vehiclePosition;

            pickUp(vehicleId, vehiclePosition, passengerId, passengerGeohash, vehicleMessage);
        }
    })
    //监听乘客付款事件
    trafficContract.events.payEvent(function (error, event) {
        if (error != null) {
            console.log("payEvent_error: ", error);
        }
        if (event.returnValues.vehicleId.slice(0, 42) == vehicleId.toLowerCase()) {
            console.log("payEvent: " + vehicleId + "乘客已付款");
            console.warn(`${(new Date()).getTime()}@vehicle@${vehicleId}@PassengerPaid`)
            // trafficContract.methods.initVehicle(vehicleId, web3.utils.asciiToHex(vehicleMessage.endGeohash)).send({from: vehicleId, gas: 500000,position: vehicleMessage.endGeohash, txtime: (vehicleCurrentTime + vehicleMessage.emptyAstarTime + vehicleMessage.loadAstarTime)}).then(function(result){
            //     console.log("置状态为空车");
            trafficContract.methods.setVehicleStatusEmpty(vehicleId).send(
                // { from: vehicleId, gas: GAS_OFFER, position: POSITION, txtime: Date.now() },
                { from: accountManagerW11, gas: GAS_OFFER, position: POSITION, txtime: Date.now() },
                function (err, _trans_hash) {
                    if (!err) {
                        console.warn(`${(new Date()).getTime()}@vehicle@${vehicleId}@CarReleased`)
                        console.log(vehicleId + "已重置为空车状态")
                    } else {
                        console.info(err)
                    }
                }
            )
            vehiclePosition = vehicleMessage.endGeohash;
            countNum++;
            allVehicleMessage.push(vehicleMessage);
            console.log("收到转账,VALUE:",VALUE);
            web3.eth.sendTransaction({
            	from: accountManagerW11,
                // from: vehicleId,
            	to: vehicleId,
            	// value: VALUE,
                gas: GAS_OFFER,
                position:POSITION,
                // position:vehicleMessage.vehicleStartPosition,
            	txtime:(vehicleCurrentTime + vehicleMessage.emptyAstarTime + vehicleMessage.loadAstarTime)
            }).then(function(receipt){
                console.log(`done!!!!`);
            }, function (error1) {
                console.log(`NOT done!!!!`);
            });
            vehicleMessage = {};
            if (Date.now() >= startTime + 10000) {
                console.log(`共执行了${countNum}个订单`);

                let jsonstr = JSON.stringify(allVehicleMessage);
                let astarErr1Json = JSON.stringify(astarErr1Messages);
                let astarErr2Json = JSON.stringify(astarErr2Messages);
                fs.writeFileSync(vehicleResultFile, jsonstr, { flag: 'w', encoding: 'utf-8', mode: '0666' }, function (_err) { console.info("Failed to write to files.") });
                fs.writeFileSync(vehicleAstarErr1File, astarErr1Json, { flag: 'w', encoding: 'utf-8', mode: '0666' }, function (_err) { console.info("Failed to write to files.") });
                fs.writeFileSync(vehicleAstarErr2File, astarErr2Json, { flag: 'w', encoding: 'utf-8', mode: '0666' }, function (_err) { console.info("Failed to write to files.") });
            }
            // })
        }
    })

    //监听乘客上车事件
    trafficContract.events.boardEvent(function (error, event) {
        if (error != null) {
            console.log("boardEvent_error: ", error);
        }
        if (event.returnValues.vehicleId.slice(0, 42) == vehicleId.toLowerCase()) {
            console.log("boardEvent: " + vehicleId + "乘客已上车");
            console.log("执行了调度算法,车辆到达乘客所在位置")
            manageToEnd(vehicleId, vehicleMessage.passengerId, vehicleMessage.passengerGeohash, vehicleMessage);
        }
    })

    await trafficContract.methods.initVehicle(vehicleId, web3.utils.asciiToHex(vehiclePosition))
    .send(
        { from: vehicleId.toString(), gas: GAS_OFFER, position: vehiclePosition.toString(), txtime: Date.now() }
        // { from: accountManagerW11, gas: GAS_OFFER, position: vehiclePosition.toString(), txtime: Date.now() }
    )
    .then(function (err, result) {
        onlineVehicleNum++;
        // if (Date.now() >= startTime) {
        // 	console.log(`共加入了${onlineVehicleNum}辆车`);
        // }
        web3.eth.sendTransaction({
            from: accountManagerW11,
            to: vehicleId.toString(),
            value: 107_1740_0000_0000,
            position:POSITION,
            txtime: Date.now()
        });
        console.log("车加入",vehicleId);
        console.log(`${vehiclePosition}第${onlineVehicleNum}辆车加入`);
    });
}

async function deleteVehicle() {
    const task = [];
    for (let accountAddr of vehiclesInfo) {
        task.push(deleteUnit(accountAddr));
    }
    // for (let i = 0; i < vehicleIdList.length; i++) {
    //     task.push(deleteUnit(vehicleIdList[i]));
    // }
    Promise.all(task).then((res) => {
        console.log("所有车辆都注销了")
    })
}
async function deleteUnit(vehicleId) {
    // return await trafficContract.methods.deleteVehicle(vehicleId).send({ from: vehicleId, gas: GAS_OFFER, position: POSITION, txtime: Date.now() });
    return await trafficContract.methods.deleteVehicle(vehicleId).send({ from: accountManagerW11, gas: GAS_OFFER, position: POSITION, txtime: Date.now() });
}
// deleteVehicle();
// deleteUnit("0x4c454053ce95853afc4591c3a3ad20852428c619");

function getVehicleStatus(vehicleId) {
    // trafficContract.methods.getVehicleStatus(vehicleId).call({ from: vehicleId, gas: GAS_OFFER }).then(function (result) {
    trafficContract.methods.getVehicleStatus(vehicleId).call({ from: accountManagerW11, gas: GAS_OFFER }).then(function (result) {
        console.log("getVehicleStatus: ", result)
    })
}
// getVehicleStatus("0x04264684c97eeaaec075051ae660557db07e826c");
// "0x4c454053ce95853afc4591c3a3ad20852428c619", "0x344d60bccf77f085d3a3419d53f5fae1ec660c59", "0x6eda21bfaba44045e80235eec31b9f2ee673808a"

function getVehicleId(vehicleId) {
    
    trafficContract.methods.getVehicleId(vehicleId).call({ from: accountManagerW11, gas: GAS_OFFER }).then(function (result) {
    // trafficContract.methods.getVehicleId(vehicleId).call({ from: vehicleId, gas: GAS_OFFER }).then(function (result) {
        console.log("getVehicleId: ", result)
    })
}
// getVehicleId("0xff0c4b9260bc5a2137aaa30f78457e8f7da64b80");

function getVehicleIdList() {
    trafficContract.methods.getVehicleIdList().call().then(function (result) {
        console.log("getVehicleIdList: ", result)
    })
}
// getVehicleIdList();




//确认接乘客
async function pickUp(vehicleId, vehiclePosition, passengerId, passengerGeohash, vehicleMessage) {
    if (vehiclePosition == passengerGeohash) {
        // store route
        // trafficContract.methods.storeRoutes(0, vehicleId, passengerId, []).send({ from: vehicleId, gas: GAS_OFFER, position: vehiclePosition, txtime: Date.now() }).then(function (result) {
        trafficContract.methods.storeRoutes(0, vehicleId, passengerId, []).send({ from: accountManagerW11, gas: GAS_OFFER, position: vehiclePosition, txtime: Date.now() }).then(function (result) {
            console.log("存储路径成功");
            console.warn(`${(new Date()).getTime()}@vehicle@${vehicleId}@DirectlyStoreRouteToStartingPointSuccess`)
        }, function (error) {
            console.log("存储路径失败:", error);
        });
        vehicleMessage.emptyAstarTime = 0;
        vehicleMessage.emptyRoute = [];
        vehicleMessage.emptyRouteTime = 0;
        vehicleMessage.emptyCountFrag = 0;//经过的路口数量
    } else {
        let astarTime1 = Date.now();
        mapContract.methods.astar(web3.utils.asciiToHex(vehiclePosition), web3.utils.asciiToHex(passengerGeohash)).call(
            // { from: vehicleId, gas: GAS_OFFER }
            { from: accountManagerW11, gas: GAS_OFFER }
        ).then(function (result) {
            console.warn(`${(new Date()).getTime()}@vehicle@${vehicleId}@FinishedAStarToStartingPoint`)
            let astarTime2 = Date.now() - astarTime1;
            let countFrag = 0;
            for (let i = 0; i < result[0].length; i++) {
                if (result[0][i].toString() != "0x0000000000000000000000000000000000000000000000000000000000000000") {
                    countFrag++;
                }
            }
            let astarOriginRoute = result[0];
            let routeLength = Number(result[1]);

            trafficContract.methods.storeRoutes(routeLength, vehicleId, passengerId, astarOriginRoute).send(
                // { from: vehicleId, gas: GAS_OFFER, position: vehiclePosition, txtime: Date.now() }
                { from: accountManagerW11, gas: GAS_OFFER, position:POSITION, txtime: Date.now() }
            ).then(function (result) {
                console.log("存储接客路径成功");
                console.warn(`${(new Date()).getTime()}@vehicle@${vehicleId}@StoreRouteToStartingPointThroughAStarSuccess`)
            });

            let astarRoute = [];
            for (let i = 0; i < result[0].length; i++) {
                if (result[0][i].toString() != "0x0000000000000000000000000000000000000000000000000000000000000000") {
                    let temp = web3.utils.hexToAscii(result[0][i]).slice(0, 11)
                    astarRoute.push(temp)
                }
            }
            astarRoute.reverse();

            vehicleMessage.emptyAstarTime = astarTime2;//获取导航结果的时间
            vehicleMessage.emptyRoute = astarRoute;//导航结果
            vehicleMessage.emptyRouteTime = Math.floor(routeLength / 6000000);//按此导航结果开车的行驶时间,emptyRouteTime单位：毫秒
            vehicleMessage.emptyCountFrag = countFrag;//经过的路口数量

        }, function (err) {
            console.error(`astarErr:  ${vehicleId}去接乘客${passengerId}时导航超时, 起点：${vehiclePosition}终点：${passengerGeohash}`)
            let astarErr1 = `astarErr:  ${vehicleId}去接乘客${passengerId}时导航超时, 起点：${vehiclePosition}终点：${passengerGeohash}`;
            astarErr1Messages.push(astarErr1);
        })
    }
}

async function manageToEnd(vehicleId, passengerId, passengerGeohash, vehicleMessage) {

    //车辆接到乘客后通过合约获得其目的地
    console.info("Debug:", passengerId, vehicleId)
    // trafficContract.methods.getPassengerEnd(passengerId).call({ from: vehicleId, gas: GAS_OFFER }).then(function (result) {
    trafficContract.methods.getPassengerEnd(passengerId).call({ from: accountManagerW11, gas: GAS_OFFER }).then(function (result) {

        let endGeohash = web3.utils.hexToAscii(result).slice(0, 11);
        console.log("目的地坐标:", endGeohash);
        console.warn(`${(new Date()).getTime()}@vehicle@${vehicleId}@DestinationReady`)

        let astarTime1 = Date.now()
        mapContract.methods.astar(web3.utils.asciiToHex(passengerGeohash), web3.utils.asciiToHex(endGeohash)).call({ from: accountManagerW11, gas: GAS_OFFER }).then(function (result) {
        // mapContract.methods.astar(web3.utils.asciiToHex(passengerGeohash), web3.utils.asciiToHex(endGeohash)).call({ from: vehicleId, gas: GAS_OFFER }).then(function (result) {
            console.warn(`${(new Date()).getTime()}@vehicle@${vehicleId}@FinishedAStarToDestination`)
            let astarTime2 = Date.now() - astarTime1;
            let countFrag = 0;
            for (let i = 0; i < result[0].length; i++) {
                if (result[0][i].toString() != "0x0000000000000000000000000000000000000000000000000000000000000000") {
                    countFrag++;
                }
            }
            let astarOriginRoute = result[0];
            let routeLength = Number(result[1]);
            trafficContract.methods.storeRoutes(routeLength, vehicleId, passengerId, astarOriginRoute).send(
                // { from: vehicleId, gas: GAS_OFFER, position: POSITION, txtime: Date.now() }
                { from: accountManagerW11, gas: GAS_OFFER, position: POSITION, txtime: Date.now() }
            ).then(function (result) {
                console.log("存储送客路径成功");
                console.warn(`${(new Date()).getTime()}@vehicle@${vehicleId}@StoreRouteToDestinationSuccess`)
            });
            let astarRoute = []
            for (let i = 0; i < result[0].length; i++) {
                if (result[0][i].toString() != "0x0000000000000000000000000000000000000000000000000000000000000000") {
                    let temp = web3.utils.hexToAscii(result[0][i]).slice(0, 11)
                    astarRoute.push(temp)
                }
            }
            astarRoute.reverse();

            vehicleMessage.endGeohash = endGeohash;
            vehicleMessage.loadAstarTime = astarTime2;//获取导航结果的时间
            vehicleMessage.loadRoute = astarRoute;//导航结果
            vehicleMessage.loadRouteTime = Math.floor(routeLength / 6000000);//按此导航结果开车的行驶时间,emptyRouteTime单位：毫秒
            vehicleMessage.loadCountFrag = countFrag;//经过的路口数量

            console.log("执行了调度算法,车辆将乘客送到了终点");
        }, function (err) {
            console.error(`astarErr:  ${vehicleId}送乘客${passengerId}去终点时导航超时, 起点：${passengerGeohash}终点：${endGeohash}`);
            let astarErr2 = `astarErr:  ${vehicleId}送乘客${passengerId}去终点时导航超时, 起点：${passengerGeohash}终点：${endGeohash}`;
            astarErr2Messages.push(astarErr2);
        })
    })
}
