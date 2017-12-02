var keythereum = require("keythereum");

// Creating a new keychain 
function create_keychain(user_pass)
{
  var params = { keyBytes: 32, ivBytes: 16 };
  var dk = keythereum.create(params);
  var password = user_pass;
  var kdf = "pbkdf2";
  
  var options = {
    kdf: "pbkdf2",
    cipher: "aes-128-ctr",
    kdfparams: {
      c: 262144,
      dklen: 32,
      prf: "hmac-sha256"
    }
  };
  
  try
  {
    var keyObject = keythereum.dump(password, dk.privateKey, dk.salt, dk.iv, options);
    keythereum.exportToFile(keyObject);
    return keyObject;
  }
  catch(err)
  {
    console.log("Enter a password");
  }

}


function verify_user(address,password){
  var address = address;
  try
  {
  var mykeyobj = keythereum.importFromFile(address, "./");
  var privateKey = keythereum.recover(password, mykeyobj);
  return true;
  } 
  catch(err)
  {
    console.log("Your Password or Wallet ID is incorrect");
  }

  
};

// var datadir = __dirname;

// // create_keychain("02399564");
// verify_user("2579499d54737ecf615161c13fdba75846661a65","0239564",datadir);

module.exports.create_keychain = create_keychain;
module.exports.verify_user = verify_user;