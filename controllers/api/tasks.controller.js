const Task = require('../../db/models/task.model');
const User = require('../../db/models/user.model');

class Controller {
    async editTask(req, res) {
        try {
            const id = req.params.id;
            const { title, desc } = req.body;
            const userId = req.user.id;

            if(!(title || desc)) return res.status(400).json({ message: "title or desc not exist" });

            const task = await Task.findOne({ _id: id, userId: userId });

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
            const { title, desc } = req.body;
            const userId = req.user.id;

            if(!(title || desc )) return res.status(400).json({ message: "title or desc id not exist" });

            const newTask = new Task({
                title: title,
                desc: desc,
                userId: userId
            });

            await newTask.save();
            res.status(201).json(newTask);
        } catch {
            return res.status(500).json({
                message: "Server error!"
            });
        }
    }

    async getAllTasks(req, res) {
        const userId = req.user.id;
        let tasks
        try {
            tasks = await Task.find({ userId: userId });
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
            const userId = req.user.id;
            const task = await Task.findOne({
                _id: taskId,
                userId: userId
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
            const userId = req.user.id;
            const taskExist = await Task.findOne({ _id: taskId, userId: userId });

            if (taskExist !== null) {
                await Task.deleteOne({ _id: taskId, userId: userId });

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