const express = require('express');
const config = require('./config/appConfig');
const app = express();
const tasksRouter = require('./routes/api/tasks');
const pagesRouter = require('./routes/app/pages');
const bodyParser = require('body-parser');
const cors = require('cors');

// Database
require('./db/connection');

app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(cors());
app.set("view engine", "ejs");
app.set("views", "./views");
app.use('/api/tasks', tasksRouter);
app.use('/', pagesRouter);

app.listen(config.port, () => {
    console.log("( Task Manager )")
    console.log(`Node.js HTTP server is running: http://127.0.0.1:${config.port}`);
    console.log(`Database connection: ${config.database}`);
});