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
    var flag = auth("adMin", "password")

    console.log('username', req.param('u'))
    console.log('password', req.param('p'))
    res.status(200).send({ auth: flag})
});



module.exports = app;

