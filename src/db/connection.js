const mongoose = require('mongoose');
const { database } = require('../config/appConfig');

mongoose.connect(database, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
