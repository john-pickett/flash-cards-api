var mongoose = require('mongoose');

var Lesson = mongoose.model('Lesson', {
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    answers: [String],
    guesses: [String],
    length: {
        type: Number,
        required: true,
        trim: true,
        minlength: 1
    },
    timer: {
        type: Number,
        required: true,
        trim: true,
        minlength: 1
    }
});

module.exports = {Lesson};
