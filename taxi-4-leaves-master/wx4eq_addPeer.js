admin.addPeer("enode://1c4125ab5bc3d09c21f10c18997d677d48e99e81c51ad9664814d8faa947b8db458a70e824b2dd5037d8e1adb4c3bb4f3f0eb5c125a22afed3df5f161ee5a4eb@127.0.0.1:30309?discport=0")

sleep(10000)

eth.setBranchBlock({from:eth.accounts[0],branchid:"wx4eq",settime:20})

var MAP_NAME = "wx4eq";

sleep(10000)

// 账户解锁
for (var i = 0; i < 48; i++) {
    personal.unlockAccount(eth.accounts[i],"123",30000)
}

function sleep(delay) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
}
