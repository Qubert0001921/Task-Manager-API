const Task = require('../../db/models/task');

class Controller {
    async editTask(req, res) {
        try {
            const id = req.params.id;
            const title = req.body.title;
            const desc = req.body.desc

            const task = await Task.findOne({ _id: id });

            if(task !== null) {
                task.title = title;
                task.desc = desc;

                await task.save()

                res.status(201).json(task);
            } else {
                res.status(400).json({
                    message: "Can't update task because it's not exist"
                });
            }
            
        } catch {
            return res.status(500).json({
                message: "Server error!"
            });
        }
    }

    async createNewTask(req, res) {      
        try {
            const title = req.body.title;
            const desc = req.body.desc;
            const taskExist = await Task.findOne({
                title: title
            });
    
            if(taskExist === null) {
                const newTask = new Task({
                    title: title,
                    desc: desc
                });
    
                newTask.save();
                res.status(201).json(newTask);
            } else {
                res.status(400).json({
                    message: `Can't create task '${title}', because it's exist`
                });
            }
        } catch {
            return res.status(500).json({
                message: "Server error!"
            });
        }
    }

    async getAllTasks(req, res) {
        let tasks
        try {
            tasks = await Task.find({});
        } catch {
            return res.status(500).json({
                message: "Server error!"
            });
        }

        res.status(200).json(tasks);
    }

    async getOneTask(req, res) {
        try {
            const taskId = req.params.id;
            const task = await Task.findOne({
                _id: taskId
            });

            if(task !== null) {
                res.status(200).json(task);
            } else {
                res.status(400).json({
                    message: `Can't find task!`
                });
            }

        } catch {
            return res.status(500).json({
                message: "Server error!"
            });
        }
    }

    async deleteOneTask(req, res) {
        try {
            const taskId = req.params.id;
            const taskExist = await Task.findOne({ _id: taskId });

            if (taskExist !== null) {
                await Task.deleteOne({ _id: taskId });

                res.sendStatus(204);
            } else {
                res.status(400).json({
                    message: "Can't delete task because it's not exist"
                });
            }
            
        } catch {
            return res.status(500).json({
                message: "Server error!"
            });
        }
    }
}

module.exports = new Controller();