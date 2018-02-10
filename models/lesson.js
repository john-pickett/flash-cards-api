var mongoose = require('mongoose');

var Lesson = mongoose.model('Lesson', {
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    answers: [String],
    guesses: [String]
});

module.exports = {Lesson};
