//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

//object destructuring allows you to pull out parts of an object using a variable
// var user = {name: 'luca', age: 23};
// var {name} = user;
// console.log(name);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');
    var toDosColl = db.collection("Users");
    //deleteMany
    /*toDosColl.deleteMany({text: 'Eat lunch'}).then((result) => {
        console.log(result);
    });*/
    //deleteOne
    /*toDosColl.deleteOne({text: 'Eat lunch'}).then((result) => {
        console.log(result);
    });*/
    //findOneAndDelete allows you to delete an individual item and also return the value
    // toDosColl.findOneAndDelete({completed: false}).then((result) =>{
    //     console.log(result);
    // });

    /* The Challenge */
    toDosColl.deleteMany({name: 'Mr. Sir Charles Bland'}).then((result) => {
        console.log(result);
    });

    toDosColl.findOneAndDelete({_id: new ObjectID("5940a8961769961b48c5de95")}).then((result) => {
        console.log(result);
    });

    //db.close();
});