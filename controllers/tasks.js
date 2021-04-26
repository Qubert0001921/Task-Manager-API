const Task = require('../db/models/task');

class Controller {
    saveNote(req, res) {
        const newTask = new Task({
            title: "SIema",
            desc: "panie"
        });
        newTask.save();
    }
}

module.exports = new Controller();