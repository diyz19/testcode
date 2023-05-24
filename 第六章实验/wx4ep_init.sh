cd ./geth_wx4ep

#init
geth-tree --identity "MyEth" --rpc --rpcport "8082" --rpccorsdomain "*" --datadir gethdata --port "30315" --nodiscover --rpcapi "eth,net,personal,web3,miner,admin" --networkid "wx4ep" init ../genesisgtrie.json

geth-tree --targetgaslimit 0x1fffffffffffff --identity "MyEth" --rpc --rpcport "8082" --rpccorsdomain "*" --datadir gethdata --port "30315" --nodiscover --rpcapi "eth,net,personal,web3,miner,admin" --ws --wsaddr='localhost' --wsport "8547" --wsorigins='*' --wsapi 'personal,net,eth,web3,admin' --networkid "wx4ep" --allow-insecure-unlock --dev.period 1 --preload "../wx4ep_addPeer.js" console
