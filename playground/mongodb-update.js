//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log("you is connected");
    
    var collTodos = db.collection('Users');

    //For Todos
    /*collTodos.findOneAndUpdate({
        _id: new ObjectID("5940abe21ca2a712e430c612")
    }, {
        $set: {
            completed: false
        }
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log(result);
    });*/

    collTodos.findOneAndUpdate({
        _id: new ObjectID("5940a5f8bbd8293d70b88c1c")
    }, {
        $set: {
            name: "Kobe Carl"
        },
        $inc: {
            age: 1
        }
    },{
        returnOriginal: false
    }).then((result) => {
        console.log(result);
    });
});