admin.addPeer("enode://54a035c33c3b4ee1078d0c4fadb76bc993ae5e9de10f16465b39741abf0de7723734bf32cd31bfbcaf2fe6dad6641e951777b711942546daac174986ade8d482@127.0.0.1:30309?discport=0")

sleep(10000)

eth.setBranchBlock({from:eth.accounts[0],branchid:"w12",settime:20})
miner.setEtherbase(eth.accounts[2])

sleep(10000)

//账户解锁
for (var i = 0; i < 14; i++) {
    personal.unlockAccount(eth.accounts[i],"123",30000)
}

function sleep(delay) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
}
