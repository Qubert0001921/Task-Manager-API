const express = require('express');
const router = express.Router();
const tasksController = require('../../controllers/api/tasks.controller');
const { authenticate } = require('../../middlewares');

// Create task
router.post('/', authenticate, tasksController.createNewTask);

// Edit task
router.put('/:id', authenticate, tasksController.editTask);

// Delete one task by id
router.delete('/:id', authenticate, tasksController.deleteOneTask);

// Get one task by id
router.get('/:id', authenticate, tasksController.getOneTask);

// Get tasks
router.get('/', authenticate, tasksController.getAllTasks);

module.exports = router;