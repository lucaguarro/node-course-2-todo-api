var mongoose = require('mongoose');

var Todo = mongoose.model('Todo', {
    text: {
        type: String,
        //We can add validators:
        //text property must be added when adding new todo
        required: true,
        //the minimum length of the text must be 1 AFTER trim
        minlength: 1,
        //cuts off all whitespaces at the beginning and end of the text
        trim: true
    },
    completed: {
        type: Boolean,
        //a todo that isn't given a completed value automatically has it set to false
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    }
});

module.exports = {Todo};