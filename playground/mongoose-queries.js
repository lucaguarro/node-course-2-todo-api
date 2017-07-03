const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var id = '59583575e9c3b428089401bb';

// if(!ObjectID.isValid(id)){ //validating IDs
//     console.log('ID not valid');
// }

/*Todo.find({
    _id: id //Allows us to query by ID. We pass it a string as the value. Mongoose takes this string and converts it to an object id to run the query.
}).then((todos) => { //get allo of our todos that match the id
    console.log('Todos', todos); //todos is an array of documents
});

Todo.findOne({ //very similar to .find but returns only one entry at most
    _id: id
}).then((todo) => {
    console.log('Todo', todo); //todo is not an array
});*/

// Todo.findById(id).then((todo) => {
//     if (!todo){return console.log('ID not found')} //for valid ids that do not exist in the database
//     console.log('Todo by ID', todo)
// }).catch((e) => console.log(e));

User.findById(id).then((user) => {
    if(!user){return console.log("ID ain't found")}
    console.log(JSON.stringify(user,2,undefined));
}).catch((e) => console.log(e));