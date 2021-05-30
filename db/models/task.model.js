const mongoose = require('mongoose');

const Task = mongoose.model('Task', {
    title: String,
    desc: String,
    userId: String
});

module.exports = Task;