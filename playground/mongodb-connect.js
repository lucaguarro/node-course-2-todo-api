//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

//object destructuring allows you to pull out parts of an object using a variable
// var user = {name: 'luca', age: 23};
// var {name} = user;
// console.log(name);

/*MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     completed: false
    // }, (err, result) => {
    //     if (err) {
    //         return console.log('Unable to insert todo', err);
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });

    // db.collection('Users').insertOne({
    //     name: 'Luca',
    //     age: 23,
    //     location: 'Redondo Beach, CA'
    // }, (err, result) => {
    //     if (err){
    //         return console.log("Unable to insert User");
    //     }
    //     console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 2));
    // });

    db.close();

});*/
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log("fuck off");
    }
    console.log("Haha we good man");
    var coll = db.collection("Todos");
    coll.insertOne({
        name: 'Mr. Sir Charles Bland',
        age: 23,
        location: "Manhattan Beach, CA"
    }, (err, result) => {
        if(err){
            return console.log("fail");
        }
        console.log(JSON.stringify(result.ops[0], undefined, 2));
    });
});