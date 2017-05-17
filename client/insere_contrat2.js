/*
pragma solidity ^0.4.0;

contract greeter {

    address owner;
    address vendeur;

    function greeter(address _vendeur) public {
        owner = msg.sender;
        vendeur = _vendeur;
    }

    function getVendeur() constant returns (address) {
        return vendeur;
    }

    function getAcheteur() constant returns (address) {
        return owner;
    }
}
*/

var Web3 = require('web3');


var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

function insere(wallet, pass) {

    /* à récupérer autrement - contrat compilé à disposition */
    const contractCompiled = '6060604052341561000c57fe5b604051602080610229833981016040528080519060200190919050505b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b505b61016c806100bd6000396000f30060606040526000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680636c7f169614610046578063cea2266a14610098575bfe5b341561004e57fe5b6100566100ea565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34156100a057fe5b6100a8610115565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690505b90565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690505b905600a165627a7a7230582084d19b117bbc3b1b2f34f738fa08b42c13aee2a211bc920a15a31df5947332590029';


    web3.personal.unlockAccount(web3.eth.accounts[0]/*l'acheteur*/, "my-password");


    /* requiert 2 wallets...*/

    var dealContract = web3.eth.contract([{"constant":true,"inputs":[],"name":"getVendeur","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getAcheteur","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"inputs":[{"name":"_vendeur","type":"address"}],"payable":false,"type":"constructor"}]);

    var deal2 = dealContract.new(
        web3.eth.accounts[1]/*le vendeur*/, {
            from: web3.eth.accounts[0]/*l'acheteur*/,
            data: '0x' + contractCompiled,
            gas: '4700000'
        },
        function(e, contract) {
            console.log(e, contract);
            if (typeof contract.address !== 'undefined') {
                console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
                console.log('l\'acheteur du contrat (et owner du smart-contrat) : ' +deal2.getAcheteur());
                console.log('le vendeur du contrat : ' + deal2.getVendeur());
            }
        });

}

insere('xxx', 'xxx');
