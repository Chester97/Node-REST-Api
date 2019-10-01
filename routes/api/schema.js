const mongoose = require('mongoose');

const User = mongoose.model('Users', {
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    login: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: false
    }
});

module.exports = User;
