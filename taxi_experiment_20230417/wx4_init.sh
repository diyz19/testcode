# cd /home/zc/20230203-treechain_expermiment/2childs/geth_w11_1
cd ./geth_wx4

#init
geth-tree --identity "MyEth" --rpc --rpcport "8081" --rpccorsdomain "*" --datadir gethdata --port "30314" --nodiscover --rpcapi "eth,net,personal,web3,miner" --networkid "wx4" init genesisgtrie.json
geth-tree --identity "MyEth" --rpc --rpcport "8081" --rpccorsdomain "*" --datadir gethdata --port "30314" --nodiscover --rpcapi "eth,net,personal,web3,miner,admin" --ws --wsaddr='localhost' --wsport "8546" --wsorigins='*' --wsapi 'personal,net,eth,web3,admin' --networkid "wx4" --allow-insecure-unlock --dev.period 1 --preload "../unlockAccounts.js" console
