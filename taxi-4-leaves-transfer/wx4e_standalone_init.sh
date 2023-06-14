cd ./geth_wx4e_sdl

#init
geth1 --identity "MyEth" --rpc --rpcport "8085" --rpccorsdomain "*" --datadir gethdata --port "30318" --nodiscover --rpcapi "eth,net,personal,web3,miner,admin" --networkid "wx4e" init ../genesisgtrie.json

geth1 --targetgaslimit 0x1fffffffffffff --identity "MyEth" --rpc --rpcport "8085" --rpccorsdomain "*" --datadir gethdata --port "30318" --nodiscover --rpcapi "eth,net,personal,web3,miner,admin" --ws --wsaddr='localhost' --wsport "8550" --wsorigins='*' --wsapi 'personal,net,eth,web3,admin' --networkid "wx4e" --allow-insecure-unlock --dev.period 1 --preload "../unlockAccounts.js" console
