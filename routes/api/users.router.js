const express = require('express');
const router = express.Router();
const usersController = require('../../controllers/api/users.controller');
const { authenticate } = require('../../middlewares');

// create user
router.post('/', usersController.createUser);

// get users
router.get('/', authenticate, usersController.getUsers);

// get user by id
router.get('/:id', usersController.getUserById);

// update user data
router.put('/:id', usersController.updateUser);

// delete user
router.delete('/:id', usersController.deleteUser);

module.exports = router;