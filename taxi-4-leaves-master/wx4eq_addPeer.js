admin.addPeer("enode://9d5c30ad1dfe45a9dbcb225a152a3765ffdff1a9b009484411d2eec11d1aa0a7b231e4e1865151f83f6a2d68b7cce58a8254b2f4f9194314395d0f7e050e321b@127.0.0.1:30309?discport=0")

sleep(10000)

eth.setBranchBlock({from:eth.accounts[0],branchid:"wx4eq",settime:20})

var MAP_NAME = "wx4eq";

sleep(10000)

// 账户解锁
for (var i = 0; i < 192; i++) {
    personal.unlockAccount(eth.accounts[i],"123",30000)
}

function sleep(delay) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
}
