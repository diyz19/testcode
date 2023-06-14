cd ./geth_wx4er

#init
geth-tree --identity "MyEth" --rpc --rpcport "8084" --rpccorsdomain "*" --datadir gethdata --port "30317" --nodiscover --rpcapi "eth,net,personal,web3,miner,admin" --networkid "wx4er" init ../genesisgtrie.json

geth-tree --targetgaslimit 0x1fffffffffffff --identity "MyEth" --rpc --rpcport "8084" --rpccorsdomain "*" --datadir gethdata --port "30317" --nodiscover --rpcapi "eth,net,personal,web3,miner,admin" --ws --wsaddr='localhost' --wsport "8549" --wsorigins='*' --wsapi 'personal,net,eth,web3,admin' --networkid "wx4er" --allow-insecure-unlock --dev.period 1 --preload "../wx4er_addPeer.js" console
