const mongoose = require('mongoose');

const RefreshToken = mongoose.model('RefreshToken', {
    token: String
});

module.exports = RefreshToken;