# cd /home/zc/20230203-treechain_expermiment/2childs/geth_w1
cd ../geth_w1

#正常版本
geth-tree --identity "MyEth" --rpc --rpcport "8549" --rpccorsdomain "*" --datadir gethdata --port "30309" --nodiscover --rpcapi "eth,net,personal,web3,miner,admin" --networkid "w1" init genesisgtrie.json
##无log
# /home/zc/go/src/github.com/ethereum/go-ethereum/build/bin/geth --identity "MyEth" --rpc --rpcport "8549" --rpccorsdomain "*" --datadir gethdata --port "30309" --nodiscover --rpcapi "eth,net,personal,web3,miner" --networkid "w1" --syncmode "branch" --allow-insecure-unlock --dev.period 1 --preload "/home/zc/20230203-treechain_expermiment/2childs/test_file/w1_setbranch.js" console
##有log
geth-tree --identity "MyEth" --rpc --rpcport "8549" --rpccorsdomain "*" --datadir gethdata --port "30309" --nodiscover --rpcapi "eth,net,personal,web3,miner,admin" --networkid "w1" --syncmode "branch" --allow-insecure-unlock --dev.period 1 --preload "../test_file/w1_setbranch.js" console >> ../result/log_w1

#restart-无log
#/home/zc/go/src/github.com/ethereum/go-ethereum/build/bin/geth --identity "MyEth" --rpc --rpcport "8541" --rpccorsdomain "*" --datadir gethdata --port "30301" --nodiscover --rpcapi "eth,net,personal,web3,miner" --networkid "w" --syncmode "branch" --allow-insecure-unlock --dev.period 1 console 

##restart-有log
#/home/zc/go/src/github.com/ethereum/go-ethereum/build/bin/geth --identity "MyEth" --rpc --rpcport "8541" --rpccorsdomain "*" --datadir gethdata --port "30301" --nodiscover --rpcapi "eth,net,personal,web3,miner" --networkid "w" --syncmode "branch" --allow-insecure-unlock --dev.period 1 console >> /home/zc/branch_test/crosschain_transfer_test/log3

# restart--log等级
#/home/zc/go/src/github.com/ethereum/go-ethereum/build/bin/geth --identity "MyEth" --rpc --rpcport "8541" --rpccorsdomain "*" --datadir gethdata --port "30301" --nodiscover --rpcapi "eth,net,personal,web3,miner" --networkid "w" --syncmode "branch" --allow-insecure-unlock --dev.period 1 --verbosity 4 --preload "/home/zc/branch_test/crosschain_transfer_test/w_setbranch.js" console 

#功能测试-w
#/home/zc/go/src/github.com/ethereum/go-ethereum/build/bin/geth-2023-merge-success --identity "MyEth" --rpc --rpcport "8541" --rpccorsdomain "*" --datadir gethdata --port "30301" --nodiscover --rpcapi "eth,net,personal,web3,miner" --networkid "w" init genesisgtrie.json
#/home/zc/go/src/github.com/ethereum/go-ethereum/build/bin/geth-2023-merge-success --identity "MyEth" --rpc --rpcport "8541" --rpccorsdomain "*" --datadir gethdata --port "30301" --nodiscover --rpcapi "eth,net,personal,web3,miner" --networkid "w" --syncmode "branch" --allow-insecure-unlock --dev.period 1 --preload "/home/zc/go/src/github.com/ethereum/go-ethereum/zc_test/crosschain_transfer_test/w_setbranch.js" console 
