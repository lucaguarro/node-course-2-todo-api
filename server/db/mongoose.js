var mongoose = require('mongoose');

//mongoose maintains connection with database overtime whereas the mongodb client uses a callback
//which is the only place you have access to the db
mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost:27017/TodoApp'); //We cannot use a localhost database once we get our app on heroku

//We want to use a different database when we run in our development env locally, test env locally, and our production env
/*let db = {
  localhost: 'mongodb://localhost:27017/TodoApp',
  mlab: 'mongodb://spongebuddy58:heroku9417@ds145952.mlab.com:45952/todoapp'
};
mongoose.connect( process.env.PORT ? db.mlab : db.localhost);
*/
mongoose.connect( process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp');

// if we save something down here, mongoose.connect will not have time to make a request to connect
// behind the scenes mongoose will be waiting for the connection before it makes the query

module.exports = {
    mongoose
};

//mongodb://spongebuddy58:heroku9417@ds145952.mlab.com:45952/todoapp