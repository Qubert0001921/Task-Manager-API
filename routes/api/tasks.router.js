const express = require('express');
const router = express.Router();
const tasksController = require('../../controllers/api/tasks.controller');

// Create task
router.post('/', tasksController.createNewTask);

// Edit task
router.put('/:id', tasksController.editTask);

// Delete one task by id
router.delete('/:id', tasksController.deleteOneTask);

// Get one task by id
router.get('/:id', tasksController.getOneTask);

// Get tasks
router.get('/', tasksController.getAllTasks);

module.exports = router;