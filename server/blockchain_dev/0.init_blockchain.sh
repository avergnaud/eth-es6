geth --datadir mytestnet account new

read  -n 1 -p "Récupérer le compte, créer le genesis.json avec le bon compte... fait ? " uneVar

geth --datadir mytestnet init mytestnet/genesis.json
