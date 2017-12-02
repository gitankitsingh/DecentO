var mywallet = require("./wallet.js");

function register_new_user(email,password)
{
    if(password.length > 6)
    {
       var my_keychain = mywallet.create_keychain(password);
       console.log(my_keychain.address);
       return my_keychain.address;
    }
    else
    {
        console.log("Please enter a passowrd longer than 6 characters");
        
    }
}

var email = "ankitsiam@gmail.com";
var password = "testpassword";

register_new_user(email,password);