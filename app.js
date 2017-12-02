var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var app = express();
var login = require('./login.js');
var mywallet = require('./wallet.js');

app.get('/', function(req, res){
 //  res.sendFile(__dirname + '/index.html');
    res.render('index')
});

app.get('/Register', function(req, res){
    res.render('register', { title: 'register' })
});

app.get('/login', function(req, res){
    res.render('login');
});


//    res.render('wallet')
//});

app.set('view engine', 'pug');
app.set('views', './views');

// for parsing application/json
app.use(bodyParser.json()); 

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 
//form-urlencoded

app.post('/', function(req, res){
    console.log(req.body);
 
    if(login.user_login(req.body.address,req.body.password) == true)
    {
     res.render('wallet', { title: 'register' });
    }
    else
    {
        res.send("Please enter correct credentials & try again");
    }
});

app.get('/Register', function(res, res){
    res.send();
});

// for parsing multipart/form-data
app.use(upload.array()); 
app.use(express.static('public'));

app.post('/', function(req, res){
   console.log(req.body);
   res.send(req.body);
});
app.listen(3000);
