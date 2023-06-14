admin.addPeer("enode://09dbe22708c8a44abd3857eb1572de402a7237e137276f4ce6f6636ab645fa2b9f8a7b71d6f6bb3c533a75446a4f72e240bcd2097defcfa213d1b93880a84ef0@127.0.0.1:30309?discport=0")

sleep(10000)

eth.setBranchBlock({from:eth.accounts[0],branchid:"wx4en",settime:20})

var MAP_NAME = "wx4en";

sleep(10000)

// 账户解锁
for (var i = 0; i < 120; i++) {
    personal.unlockAccount(eth.accounts[i],"123",30000)
}

function sleep(delay) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
}
