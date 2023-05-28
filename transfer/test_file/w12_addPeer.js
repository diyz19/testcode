admin.addPeer("enode://b8aeec032371e737c7c5408494b565d73c4c8a015a0e8f63cc89e13ab69da229199f50a0fe17ff87bc3d04c974549da1da26c96e0c2f2e17dcb0d085e679f1be@127.0.0.1:30309?discport=0")

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
