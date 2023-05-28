# cd /home/zc/20230203-treechain_expermiment/2childs/geth_w11_1
cd ../geth_w11


geth-tree --identity "MyEth" --rpc --rpcport "8511" --rpccorsdomain "*" --datadir gethdata --port "30311" --nodiscover --rpcapi "eth,net,personal,web3,miner" --networkid "w11" init genesisgtrie.json
geth-tree --identity "MyEth" --rpc --rpcport "8511" --rpccorsdomain "*" --datadir gethdata --port "30311" --nodiscover --rpcapi "eth,net,personal,web3,miner" --ws --wsaddr='localhost' --wsport "8546" --wsorigins='*' --wsapi 'personal,net,eth,web3,admin' --networkid "w11" --allow-insecure-unlock --dev.period 1 --preload "../test_file/w11_addPeer.js" console

#geth_w2_2
#/home/zc/go/src/github.com/ethereum/go-ethereum/build/bin/geth --identity "MyEth" --rpc --rpcport "8543" --rpccorsdomain "*" --datadir gethdata --port "30303" --nodiscover --rpcapi "eth,net,personal,web3,miner" --networkid "w2" init genesisgtrie.json
#/home/zc/go/src/github.com/ethereum/go-ethereum/build/bin/geth --identity "MyEth" --rpc --rpcport "8543" --rpccorsdomain "*" --datadir gethdata --port "30303" --nodiscover --rpcapi "eth,net,personal,web3,miner" --networkid "w2" --syncmode "full" --allow-insecure-unlock --dev.period 1 console
#/home/zc/go/src/github.com/ethereum/go-ethereum/build/bin/geth --identity "MyEth" --rpc --rpcport "8543" --rpccorsdomain "*" --datadir gethdata --port "30303" --nodiscover --rpcapi "eth,net,personal,web3,miner" --networkid "w2" --allow-insecure-unlock --dev.period 1 --preload "/home/zc/go/src/github.com/ethereum/go-ethereum/zc_test/crosschain_transfer_test/w2_addPeer.js" console


#功能测试
#/home/zc/go/src/github.com/ethereum/go-ethereum/build/bin/geth-2023-merge-success --identity "MyEth" --rpc --rpcport "8542" --rpccorsdomain "*" --datadir gethdata --port "30302" --nodiscover --rpcapi "eth,net,personal,web3,miner" --networkid "w2" init genesisgtrie.json
#/home/zc/go/src/github.com/ethereum/go-ethereum/build/bin/geth-2023-merge-success --identity "MyEth" --rpc --rpcport "8542" --rpccorsdomain "*" --datadir gethdata --port "30302" --nodiscover --rpcapi "eth,net,personal,web3,miner" --networkid "w2" --allow-insecure-unlock --dev.period 1 --preload "/home/zc/branch_test/crosschain_transfer_test/w2_addPeer.js" console

#restart
#/home/zc/go/src/github.com/ethereum/go-ethereum/build/bin/geth --identity "MyEth" --rpc --rpcport "8511" --rpccorsdomain "*" --datadir gethdata --port "30311" --nodiscover --rpcapi "eth,net,personal,web3,miner" --networkid "w11" --allow-insecure-unlock --dev.period 1 console
