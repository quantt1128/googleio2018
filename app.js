var express = require('express');
var chalk = require('chalk');
var app = express();

app.use(express.static('public'));
app.use(express.static('images'));

app.get('/', function (req, res) {
    res.send("Hello from my library app");
});

app.get('/hello', function (req, res) {
    res.send("Hello world!");
});

app.get('/get', function (req, res) {
    res.send("Hello world!");
});

app.post('/get', function (req, res) {
    res.send("Hello world!");
});

app.get('/news/:id', function (req, res) {
    res.send('The id you specified is ' + req.params.id);
    
});

app.get('/things/:id([0-9]{5})', function (req, res) {
    res.send('id: ' + req.params.id);
});

//Other routes here

/*
 * use router component
 * */

var things = require('./things.js');

//both app.js and things.js should be in same directory
//app.use('/things', things);

//Middleware function to log request protocol
app.use('/things', function (req, res, next) {
    console.log("A request for things received at " + Date.now());
    next();
});

// Route handler that sends the response
app.get('/things', function (req, res) {
    app.use('*', things);
});


/*
 * Middleware call
 */
//First middleware before response is sent
//run for all router not define middleware
app.use(function (req, res, next) {
    console.log("Start");
    next();
});

//Route handler
app.get('/order-middleware', function (req, res, next) {
    res.send("Middle");
    next();
});

app.use('/order-middleware', function (req, res) {
    console.log('End');
});

/*
 * middleware from third party
 * */
var bodyParser = require('body-parser');

//To parse URL encoded data
app.use(bodyParser.urlencoded({ extended: false }))

//To parse json data
app.use(bodyParser.json());

//template engine


app.set('view engine', 'pug');
app.set('views', './views');

app.get('/first_template', function (req, res){
    res.render('first_view', {
        name: req.route,
        url: req.url
    });
});

app.get('/components', (req, res) => {
    res.render('content');
});
app.get('*', function (req, res) {
    res.send('Sorry, this is an invalid URL.');
});
app.listen(3000);