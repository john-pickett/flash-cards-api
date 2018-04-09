const mongoose = require('mongoose');

// {title: 'dancing-women', answer: 'bailan', sentence: 'Las mujeres _____'},

const Deck = mongoose.model('Deck', {
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    cards: [],
    scores: []
});

module.exports = { Deck };
