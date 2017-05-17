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
    const contractCompiled = '606060405260405160208061031e833981016040528080519060200190919050505b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550346002819055505b505b610262806100bc6000396000f30060606040526000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806318394a56146100675780636c7f16961461008d5780637563c660146100df5780639a2caedc14610105578063cea2266a14610157575bfe5b341561006f57fe5b6100776101a9565b6040518082815260200191505060405180910390f35b341561009557fe5b61009d6101b4565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34156100e757fe5b6100ef6101df565b6040518082815260200191505060405180910390f35b341561010d57fe5b6101156101e5565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561015f57fe5b61016761020b565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b600060025490505b90565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690505b90565b60025481565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690505b905600a165627a7a72305820942724be7aded8a04ab8d39ceb2bc1bda9e3e18804ece6f1ad52c61602a1d1f10029';


    web3.personal.unlockAccount(web3.eth.accounts[0] /*l'acheteur*/ , "my-password");


    /* requiert 2 wallets...*/

    var dealContract = web3.eth.contract([{"constant":true,"inputs":[],"name":"getMontant","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getVendeur","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"montant","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"vendeur","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getAcheteur","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"inputs":[{"name":"_vendeur","type":"address"}],"payable":true,"type":"constructor"}]);

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
