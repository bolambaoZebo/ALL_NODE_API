const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 10,
        max: 20
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    },
    phone: {
        type: String,
        required: true,
        min: 8,
        max: 16
    },
    location: {
        type: String,
        required: true,
        max: 30
    },
    email: {
        type: String,
        default: ""
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);