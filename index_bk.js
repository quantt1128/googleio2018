var express = require('express');
var app = express();

var str = 'hello world';

function start() {
    console.log(str);
}

start();
// app.get('/hello', (req, res) => {
//     res.send('hello');
// });