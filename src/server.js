const express = require('express');
const config = require('./config/appConfig');
const app = express();
const tasksRouter = require('./routes/api/tasks');
const bodyParser = require('body-parser');
const cors = require('cors');

// Database
require('./db/connection');

app.use(bodyParser.json());
app.use(cors());
app.use('/api/tasks', tasksRouter);

app.listen(config.port, () => {
    console.log("( Task Manager API )")
    console.log(`Node.js HTTP server is running: http://127.0.0.1:${config.port}`);
    console.log(`Database connection: ${config.database}`);
});