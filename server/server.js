var express = require('express');
var bodyParser = require('body-parser'); //bodyParser takes our JSON and converts it into an object.
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
const port = process.env.PORT || 3000; //if a port is not found, will use localhost 3000

//app.use is called every time a request is sent to the server
//we give express the bodyParson.json() middleware
app.use(bodyParser.json());

//The url for APIs is very important. For resource creation, the following url is standard. /todos is for creating a new todo
//Later on when we want to read todos we would do GET /todos to get all todos or GET /todos/123ioasdj to get one by its ID
app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });
    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/todos', (req, res) => { //our get request to get all todos. Will make it so that you can get individual todos as well.
    Todo.find().then((todos) => {
        res.send({todos}); //data sent
    }, (e) => {
        res.status(400).send(e);
    });
});

// GET /todos/1234324
app.get('/todos/:id', (req, res) => { //to make a dynamic array we add a parameter noted by ": + name" = ":id". We still get the request and response objects.
    //req.params  //Now we actually use the request object to access params which is an object that has key-value pairs where the key is the URL parameter
                //like id and the value is what was actually put there 
    var id = req.params.id;

    //validate id using isValid
        //404 if not valid - send back empty body
    if(!ObjectID.isValid(id)){ //validating IDs
       return res.status(404).send();
    }
    //findById
    Todo.findById(id).then((todo) => { //success
        if(!todo){ //if no todo - send back 404 with empty body
            return res.status(404).send();
        }
        res.send({todo}); //if todo - send it back
    }).catch((e) => { //error
        res.status(400).send(); //400 request was not valid - and send empty body back
    });
            
});

app.delete('/todos/:id', (req, res) => {
    // get the id
    var id = req.params.id;
    // validate the id -> not valid? return a 404
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    // remove todo by id
    Todo.findByIdAndRemove(id).then((todo) => {
        if(!todo){
            return res.status(404).send(); // if no doc, send 404
        }
        res.send(todo); // if doc, send doc back with a 200
    }).catch((e) => { // error
        res.status(400).send(); // 400 with empty body
    });          
});

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = {app};









/*var newTodo2 = new Todo({
    text: '     Edit this video      '
    //If we set the text property to a non-string value that can be cast to a string it will still work
    //text: 23
    //text: true
});*/



