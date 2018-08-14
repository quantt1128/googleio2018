var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var app = express();
// connect to mongo db
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/express', {useNewUrlParser: true});

var personSchema = mongoose.Schema({
    name: String,
    age: Number,
    nationality: String
});
var Person = mongoose.model("Person", personSchema);
// router: add new document to db
app.get('/person', function(req, res){
    res.render('person');
});


app.set('view engine', 'pug');
app.set('views', './views');

// for parsing application/json
app.use(bodyParser.json()); 

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: false })); 
//form-urlencoded

// for parsing multipart/form-data
app.use(upload.array()); 
app.use(express.static('public'));


// router: post, create new document
app.post('/person', function(req, res){
    var personInfo = req.body; //Get the parsed information
    console.log(req.body);
    if(!personInfo.name || !personInfo.age || !personInfo.nationality){
        res.render('show_message', {
            message: "Sorry, you provided wrong info", type: "error"});
    } else {
        var newPerson = new Person({
            name: personInfo.name,
            age: personInfo.age,
            nationality: personInfo.nationality
        });
            
        newPerson.save(function(err, Person){
            if(err)
                res.render('show_message', {message: "Database error", type: "error"});
            else
                res.render('show_message', {
                message: "New person added", type: "success", person: personInfo});
        });
    }
 
});

// show all people in express db
app.get('/people', function(req, res){
    Person.find(function(err, response){
        res.header("Content-Type",'application/json');
        res.send(JSON.stringify(response, null, 4));
    });
});


app.get('/people/:id', function(req, res){
    Person.findById(req.params.id, function(err, response){
        res.header("Content-Type",'application/json');
        res.send(JSON.stringify(response, null, 4));
     });
});

app.put('/people/update/:id', function(req, res){
    Person.findByIdAndUpdate(req.params.id, req.body, function(err, response){
        if(err) res.json({message: "Error in updating person with id " + req.params.id});
        res.json(response);
     });
});


app.delete('/people/delete/:id', function(req, res){
    Person.findByIdAndRemove(req.params.id, function(err, response){
       if(err) res.json({message: "Error in deleting record id " + req.params.id});
       else res.json({message: "Person with id " + req.params.id + " removed."});
    });
 });

// app.get('/', function(req, res){
//    res.render('form');
// });
app.listen(3000);