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

// const LOCATION = "wx4ernfyb2x"
// const GAS_OFFER = 50_0000_0000
const GAS_OFFER = 800_0000


async function initVehicle() {
    const task = [];
    initUnit();
}

initVehicle();
// deleteVehicle();
// getVehicleIdList();


async function initUnit() {
    let vehicleMessage = {};
    let vehicleCurrentTime = Date.now();
    // //event
    let passengerMessage = {};

 
    trafficContract.events.search_Event(function (error, event) {
        if (error !== null) {
            console.log("search_Event: ", error);
        }
        //whether to pick up the passenger
        let p_lenth = MAP_NAME.lenth;
        let region = MAP_NAME;
        let regionVehicles = [];
        if (event.returnValues.passengerGeohash.slice(0, p_lenth) == MAP_NAME.toLowerCase()) {
            regionTask(region, regionVehicles); 
            getVehicleByRegion(event.returnValues.passengerId, event.returnValues.passengerGeohash, regionVehicles);
        }
    })
}

async function getVehicleByRegion(passengerId, positionGeohash, regionVehicles) {
    let getVehicleTime1 = Date.now()

    console.log("positionGeohash: ", positionGeohash);
    trafficContract.methods.getVehicleByRegion(
        web3.utils.asciiToHex(positionGeohash),
        regionVehicles
    ).then(async function (result1) {
        trafficContract.methods.return_VeID(passengerId, positionGeohash,result1[0],result1[1]);
    }, function (error1) {
        console.log(`乘客${passengerId}请求没有调度到车`);
        console.warn(`${(new Date()).getTime()}@passenger@${passengerId}@NoCarAvailable`)
        let error1Message = `乘客${passengerId}请求没有调度到车`;
    });
}

async function regionTask(region, regionVehicles) {
    await web3.eth.getAccountByRegion(region).then(function (result) {
        if (result != null) {
            console.log("regionTask: ", region)
            // console.log("regionVehiclesAll: ",regionVehiclesAll);
            let resultVehicles = Object.keys(result);
            console.log("resultVehicles: ",resultVehicles);
            let resultVehiclesTime = Object.values(result);
            console.log("resultVehiclesTime: ",resultVehiclesTime);
            for (let j = 0; j < resultVehicles.length; j++) {
                if (resultVehiclesTime[j] > (startTime - 60000) && resultVehiclesTime[j] < Date.now()) {
                    regionVehicles.push(resultVehicles[j]);
                }
            }
            console.log("getAccountByRegion: ",result);
        }
        else{
            console.log("getAccountByRegion_Wrong!!!!!: ",region);
        }
    })
}