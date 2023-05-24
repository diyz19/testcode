admin.addPeer("enode://ce53aefe0dc8ed2d0346907bf5c24ca0d5f020ee578e2f58d4d06667d57c09f0ede87b9d2021101fccf3776817ff48c41de56895d824a7531c08d1e4c65c7ff2@127.0.0.1:30309?discport=0")

sleep(10000)

eth.setBranchBlock({from:eth.accounts[0],branchid:"wx4er",settime:20})

var MAP_NAME = "wx4er";

sleep(10000)

// 账户解锁
for (var i = 0; i < 12; i++) {
    personal.unlockAccount(eth.accounts[i],"123",30000)
}

function sleep(delay) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
}
