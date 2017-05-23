/*
pragma solidity ^0.4.11;

contract greeter {

    address public owner;
    address public vendeur;
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

    function withdraw() {
        vendeur.transfer(montant);
    }

}
*/

var Web3 = require('web3');

var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

function insere(wallet, pass) {

    /* à récupérer autrement - contrat compilé à disposition */
    const contractCompiled = '6060604052604051602080610432833981016040528080519060200190919050505b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550346002819055505b505b610376806100bc6000396000f30060606040523615610081576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806318394a561461008a5780633ccfd60b146100b05780636c7f1696146100c25780637563c660146101145780638da5cb5b1461013a5780639a2caedc1461018c578063cea2266a146101de575b6100885b5b565b005b341561009257fe5b61009a610230565b6040518082815260200191505060405180910390f35b34156100b857fe5b6100c061023b565b005b34156100ca57fe5b6100d26102a2565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561011c57fe5b6101246102cd565b6040518082815260200191505060405180910390f35b341561014257fe5b61014a6102d3565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561019457fe5b61019c6102f9565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34156101e657fe5b6101ee61031f565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b600060025490505b90565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc6002549081150290604051809050600060405180830381858888f19350505050151561029f57fe5b5b565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690505b90565b60025481565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690505b905600a165627a7a7230582026ba5fe4abc50b58865a72ddc3ba76b582e129b9ac60367bb33112c76b6d4def0029';

    web3.personal.unlockAccount(web3.eth.accounts[0] /*l'acheteur*/ , "my-password");

    /* requiert 2 wallets...*/

    var dealContract = web3.eth.contract([{"constant":true,"inputs":[],"name":"getMontant","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"withdraw","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getVendeur","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"montant","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"vendeur","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getAcheteur","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"inputs":[{"name":"_vendeur","type":"address"}],"payable":true,"type":"constructor"},{"payable":true,"type":"fallback"}]);

    var deal2 = dealContract.new(
        web3.eth.accounts[1] /*le vendeur*/ , {
            from: web3.eth.accounts[0] /*l'acheteur*/ ,
            data: '0x' + contractCompiled,
            gas: '4700000',
            value: '10'
        },
        function(e, contract) {
            //console.log(e, contract);
            if (typeof contract.address !== 'undefined') {
                console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
                console.log('l\'acheteur du contrat (et owner du smart-contrat) : ' + deal2.getAcheteur());
                console.log('le vendeur du contrat : ' + deal2.getVendeur());
                console.log('montant : ' + deal2.getMontant());
                // console.log('withdraw... ' + deal2.withdraw({from:web3.eth.accounts[0],gas:400000}));

                console.log("SOLDE acheteur du contrat " + web3.eth.getBalance(web3.eth.accounts[0]));
                console.log("SOLDE vendeur du contrat " + web3.eth.getBalance(web3.eth.accounts[1]));

                /* on surveille les blocs. A chaque nouveau bloc on affiche le solde du vendeur
                  doit être tôt ou tard incrémenté de 10 (cf value: '10')
                */
                var filter = web3.eth.filter('latest');
                filter.watch(function(error, result) {
                  var block = web3.eth.getBlock(result, true);
                  console.log('block #' + block.number);
                  // console.dir(block.transactions);
                  console.log("SOLDE vendeur du contrat " + web3.eth.getBalance(web3.eth.accounts[1]));
                });

                /* appel du transfer */
                deal2.withdraw({from:web3.eth.accounts[0],gas:400000});
            }
        });

}

insere('xxx', 'xxx');
