var express = require('express');
var app = express();

var cookieParser = require('cookie-parser');
app.use(cookieParser());

app.get('/', function(req, res){
   res.cookie('name', 'express'); //Sets name = express
   res.cookie('login', true).send('cookie set login');
});

app.get('/clear_cookie', function(req, res){
    res.clearCookie('name');
    res.send('cookie name cleared');
 });

app.listen(3000);