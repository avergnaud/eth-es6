/*
pragma solidity ^0.4.11;

contract greeter {

    address owner;
    address vendeur;
    uint public montant;

    function greeter(address _vendeur) payable {
        owner = msg.sender;
        vendeur = _vendeur;
        montant = msg.value;
    }

function() payable {
  }

    function getVendeur() constant returns (address) {
        return vendeur;
    }

    function getAcheteur() constant returns (address) {
        return owner;
    }

    function getMontant() constant returns (uint) {
        return montant;
    }

}
*/

var Web3 = require('web3');


var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

function insere(wallet, pass) {

    /* à récupérer autrement - contrat compilé à disposition */
    const contractCompiled = '60606040526040516020806102a8833981016040528080519060200190919050505b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550346002819055505b505b6101ec806100bc6000396000f30060606040523615610060576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806318394a56146100695780636c7f16961461008f5780637563c660146100e1578063cea2266a14610107575b6100675b5b565b005b341561007157fe5b610079610159565b6040518082815260200191505060405180910390f35b341561009757fe5b61009f610164565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34156100e957fe5b6100f161018f565b6040518082815260200191505060405180910390f35b341561010f57fe5b610117610195565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b600060025490505b90565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690505b90565b60025481565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690505b905600a165627a7a723058205522a23723d75f47a5df298b1ff6d0703403bafcce6a5918f1aeb2c65230cd2b0029';


    web3.personal.unlockAccount(web3.eth.accounts[0] /*l'acheteur*/ , "my-password");


    /* requiert 2 wallets...*/

    var dealContract = web3.eth.contract([{"constant":true,"inputs":[],"name":"getMontant","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getVendeur","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"montant","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getAcheteur","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"inputs":[{"name":"_vendeur","type":"address"}],"payable":true,"type":"constructor"},{"payable":true,"type":"fallback"}]);

    var deal2 = dealContract.new(
        web3.eth.accounts[1] /*le vendeur*/ , {
            from: web3.eth.accounts[0] /*l'acheteur*/ ,
            data: '0x' + contractCompiled,
            gas: '4700000',
            value: '10'
        },
        function(e, contract) {
            console.log(e, contract);
            if (typeof contract.address !== 'undefined') {
                console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
                console.log('l\'acheteur du contrat (et owner du smart-contrat) : ' + deal2.getAcheteur());
                console.log('le vendeur du contrat : ' + deal2.getVendeur());
                console.log('montant : ' + deal2.getMontant());
            }
        });

}

insere('xxx', 'xxx');
