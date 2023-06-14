cd ./geth_wx4e || exit

geth-tree --identity "MyEth" --rpc --rpcport "8080" --rpccorsdomain "*" --datadir gethdata --port "30309" --nodiscover --rpcapi "eth,net,personal,web3,miner,admin" --networkid "wx4e" init ../genesisgtrie.json

geth-tree --identity "MyEth" --rpc --rpcport "8080" --rpccorsdomain "*" --datadir gethdata --port "30309" --nodiscover --rpcapi "eth,net,personal,web3,miner,admin" --ws --wsaddr='localhost' --wsport "8545" --wsorigins='*' --wsapi 'personal,net,eth,web3,admin' --networkid "wx4e" --syncmode "branch" --allow-insecure-unlock --dev.period 1 --preload "../wx4e_setBranchBlock.js" console
