admin.addPeer("enode://06e4fb29abf840db0bd15c512451519b1a873acce2e333aa440a3bfcb08923e22334782edb3c29eaf10d0a89f5304fcc438c93e77fc6013ad19097506c29ff28@127.0.0.1:30309?discport=0")

sleep(10000)

eth.setBranchBlock({from:eth.accounts[0],branchid:"wx4ep",settime:20})

var MAP_NAME = "wx4ep";

sleep(10000)

// 账户解锁
for (var i = 0; i < 48; i++) {
    personal.unlockAccount(eth.accounts[i],"123",30000)
}

function sleep(delay) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
}
