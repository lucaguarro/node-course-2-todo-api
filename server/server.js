var express = require('express');
var bodyParser = require('body-parser'); //bodyParser takes our JSON and converts it into an object.

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

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
        res.send({todos})
    }, (e) => {
        res.status(400).send(e);
    })
});

app.listen(3000, () => {
    console.log('Started on port 3000');
});

module.exports = {app};









/*var newTodo2 = new Todo({
    text: '     Edit this video      '
    //If we set the text property to a non-string value that can be cast to a string it will still work
    //text: 23
    //text: true
});*/



