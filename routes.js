module.exports = function(app){
    
    var index = require('./routes/index');
    var login = require('./routes/login');
    var registration = require('./routes/registration'); 
    var transferFunds = require('./routes/transferFunds'); 
    var logout = require('./routes/logout');
    var wallet = require('./routes/wallet');
    var askLoan = require('./routes/askLoan');
    var lendLoan = require('./routes/lendLoan');
    var confirmLoan = require('./routes/confirmLoan');
    var croudFunding = require('./routes/croudFunding');
    
    app.use('/',index);
    app.use('/login',login);
    app.use('/register',registration);
    app.use('/transferFunds',transferFunds);
    app.use('/logout',logout);
    app.use('/wallet',wallet);
    app.use('/askLoan',askLoan);
    app.use('/lendLoan',lendLoan);
    app.use('/confirmLoan',confirmLoan);
    app.use('/croudFunding',croudFunding);
   
    
};
