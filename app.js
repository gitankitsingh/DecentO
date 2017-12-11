// external or 3rd party dependencies 
var express = require('express');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var path = require('path');

// dependencies for cookies & session
var expressValidator = require('express-validator');
var session = require('express-session');
var passport = require('passport');
var localStrategy = require('passport-local');
var flash = require('connect-flash');

// Internal Depencies
const mywallet = require('./wallet.js');
const myroutes = require('./routes.js');

// -------- Project code Begins  -------- 
var app = module.exports = express();

// Set View engine to render ejs & html 
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.engine('html',ejs.renderFile);

// set static folder 
app.use(express.static(path.join(__dirname,'client')));

// body parser middleware 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//express session middleware
app.use(session({
    secret : '|___(my)__(f***ing)__(secret)___|',
    saveUninitialized : true,
    resave : false,
    cookie:{}
}));

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

// express validator middleware
app.use(expressValidator({
    errorFormatter : function(param,msg,value){
        var namespace = param.split('.'),
        root = namespace.shift(),
        formParam = root;
        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param : formParam,
            msg : msg,
            value : value
        }
    }
}));

app.use(flash());

app.use(function(req,res,next){
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
    });

require('./routes.js')(app);

app.set('port',(process.env.PORT || 3000));
app.listen(app.get('port'),function(){
    console.log('Server is Succesfully listening on port 3000');
});
