var mywallet = require('./wallet.js');
var Web3 = require('web3');

// var myobj = mywallet.create_keychain("myfirstpass");

var mykey = mywallet.create_keychain("mypass");
console.log("Address : " + mykey.address);
console.log("Password : " + "mypass")