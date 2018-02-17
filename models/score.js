var mongoose = require('mongoose');

var Score = mongoose.model('Score', {
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    score: {
        type: Number,
        required: true,
        trim: true,
        minlength: 1
    }
});

module.exports = {Score};