admin.addPeer("enode://4f6d8fd947c183dfa075da08e386b6d022f07d023e197e0e017c751faf8c8e3ef60e9e0558c8c23f9d27bb2f0ed0127d511a1128eb377dcffe7b3562a1c83f79@127.0.0.1:30309?discport=0")

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
