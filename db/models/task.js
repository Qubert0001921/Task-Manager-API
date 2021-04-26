const mongoose = require('mongoose');

const Task = mongoose.model('Task', {
    title: String,
    desc: String
});

module.exports = Task;