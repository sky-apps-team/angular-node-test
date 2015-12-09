var express = require('express');
var pass = require('./passwd.json');
var auth = require('./auth.js');



var app = express();
var bodyParser = require('body-parser')

app.use(express.static('public'));

app.set('port', 3000);
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', function (req, res){
    res.render('index');
});

app.get('/api/login', function(req, res){
    var flag = false;
    var username = req.param('u');
    var password = req.param('p');

    if (username && password) {
        flag = auth(username, password);
    }
    res.status(200).send({ auth: flag})
});



module.exports = app;

