admin.addPeer("enode://69d9bbf552dacf62cf50d22bb6a7fc049d1fd82335adbf1738ccab1ed316937f03d805a23275226f08b4b932b0e49234ed12eccb9cb560c9ae9f6ebb2c6b72a6@127.0.0.1:30309?discport=0")

// sleep(10000)

eth.setBranchBlock({from:eth.accounts[0],branchid:"wx4er",settime:20})

var MAP_NAME = "wx4er";

// sleep(10000)

// 账户解锁
for (var i = 0; i < 96; i++) {
    personal.unlockAccount(eth.accounts[i],"123",30000)
}

function sleep(delay) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
}
