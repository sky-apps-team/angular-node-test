var express = require('express')
var pass = require('./passwd.json')

var app = express();

var bodyParser = require('body-parser')

app.use(express.static('public'));

app.set('port', 3000);
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', function (req, res){
    res.render('index');
});

app.get('/user', function(req, res){
    res.status(200).send({ name: 'toto' })
});


module.exports = app;

