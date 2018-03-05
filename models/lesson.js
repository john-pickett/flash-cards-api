var mongoose = require('mongoose');

var Lesson = mongoose.model('Lesson', {
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    cards: [String],
    answers: [String],
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
