cd ./geth_wx4en

#init
geth-tree --identity "MyEth" --rpc --rpcport "8081" --rpccorsdomain "*" --datadir gethdata --port "30314" --nodiscover --rpcapi "eth,net,personal,web3,miner,admin" --networkid "wx4en" init ../genesisgtrie.json

geth-tree --targetgaslimit 0x1fffffffffffff --identity "MyEth" --rpc --rpcport "8081" --rpccorsdomain "*" --datadir gethdata --port "30314" --nodiscover --rpcapi "eth,net,personal,web3,miner,admin" --ws --wsaddr='localhost' --wsport "8546" --wsorigins='*' --wsapi 'personal,net,eth,web3,admin' --networkid "wx4en" --allow-insecure-unlock --dev.period 1 --preload "../wx4en_addPeer.js" console
