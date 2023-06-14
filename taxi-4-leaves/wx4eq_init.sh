cd ./geth_wx4eq

#init
geth-tree --identity "MyEth" --rpc --rpcport "8083" --rpccorsdomain "*" --datadir gethdata --port "30316" --nodiscover --rpcapi "eth,net,personal,web3,miner,admin" --networkid "wx4eq" init ../genesisgtrie.json

geth-tree --targetgaslimit 0x1fffffffffffff --identity "MyEth" --rpc --rpcport "8083" --rpccorsdomain "*" --datadir gethdata --port "30316" --nodiscover --rpcapi "eth,net,personal,web3,miner,admin" --ws --wsaddr='localhost' --wsport "8548" --wsorigins='*' --wsapi 'personal,net,eth,web3,admin' --networkid "wx4eq" --allow-insecure-unlock --dev.period 1 --preload "../wx4eq_addPeer.js" console
