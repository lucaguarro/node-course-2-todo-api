const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}) removes a document. Works like Todo.find() except you cannot pass in an
// empty argument and expect all docs to be removed. You need to pass in {} to remove everything.

/*Todo.remove({}).then((result) => {
    console.log(result);
});*/


//removes a doc and returns it. Good for when you need to query by more than just an id.
/*Todo.findOneAndRemove({_id: '5938ce49f2567f34ced4792f'}).then((todo) => { 
    console.log(todo);
});*/

Todo.findByIdAndRemove('595b0a8beea18c1930a9e233').then((todo) => { //finds doc by id, removes it, and returns it
    console.log(todo);
});