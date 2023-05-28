admin.addPeer("enode://86c5657b8a285fb0635713f2fba71630ce8b87d31488bff88ff385b5253de8e630acd4ca75dfa905e0761679554a89373e2d24141c1fb7f6a67274409a0d1b0e@127.0.0.1:30309?discport=0")

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
