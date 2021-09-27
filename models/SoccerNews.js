const mongoose = require('mongoose');

const SoccerSchema = mongoose.Schema({
    en: {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        }

    },
    zh: {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        }
    },
    imageUrl:{
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now().toString()
    }
});

module.exports = mongoose.model('SoccerNewsPost', SoccerSchema);