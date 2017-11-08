const mongoose = require('mongoose');
const validator = require('validator');

/*What our user doc will look like
    email: 'luman@example.com',
    password: 'myPass123' //but we will secure this with the bcrypt algorithm
    tokens: [{ //array of objects in which each object is a login token
        access: 'auth', //authentication token type
        token: 'asdfljasdfksdfsdfasdfsdf' //also really strong cryptographically secure string. This is the string we will pass back and forth.
                                        //a user will send this along with their http request
    }]

*/


var User = mongoose.model('User', {
     email: {
         type: String,
         required: true,
         trim: true,
         minlength: 1,
         unique: true, //verifies that the email does not have the same value as any other document in the collection
         validate: {
             validator: validator.isEmail, //using npm module validator
             message: '{VALUE} is not a valid email'
         }
     },
     password: {
         type: String,
         require: true,
         minlength: 6
     },
     tokens: [{
         access: {
            type: String,
            required: true
         },
         token: {
            type: String,
            required: true
         }
     }] 
});

module.exports = {User};