const dotenv = require('dotenv');
dotenv.config();
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
    console.log("\x1b[1m( Task Manager API )\x1b[0m")
    console.log("\x1b[32mSuccessfully started HTTP server!\x1b[0m\n")
    console.log(`Node.js HTTP server is running: http://127.0.0.1:${config.port}/api/tasks`);
    console.log(`Database connection: ${config.database}`);
    console.log("\n\x1b[36mPress CTRL+C or close terminal window to exit process\x1b[0m")
});