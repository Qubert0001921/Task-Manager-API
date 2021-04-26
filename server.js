const express = require('express');
const { port } = require('./config/appConfig');
const app = express();
const tasksRouter = require('./routes/tasks');
require('./db/connection');

app.use(tasksRouter);

app.listen(port, console.log(`Task Manager HTTP server is running: http://127.0.0.1:${port}`));