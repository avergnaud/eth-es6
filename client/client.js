/*
/home/ubuntu/hackaton/blockchain_dev>geth --datadir mytestnet --networkid 15 --rpc --rpcapi 'db,eth,net,web3,personal,web3,miner'
*/

var Web3 = require('web3');


var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));



var coinbase = web3.eth.coinbase;
console.log('coinbase : ' + coinbase);

console.log();

web3.eth.getBalance(web3.eth.accounts[0], function(err, balance) {console.log('accounts[0].balance : ' + balance.toNumber())})

console.log();

web3.eth.getBlock('pending', function(error, result){
    if(!error)
        console.log('pending block : ' + result)
    else
        console.error('pending block : ' + error);
})

console.log();

web3.eth.getBlock(47, function(error, result){
    if(!error)
        console.log('47 block : ' + result)
    else
        console.error('47 block : ' + error);
})
