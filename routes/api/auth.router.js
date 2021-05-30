const express = require('express');
const router = express.Router();
const authController = require('../../controllers/api/auth.controller');

// login user
router.post('/login', authController.login);

// refresh access token
router.post('/refresh-token', authController.refresh);

//logout
router.delete('/logout', authController.logout);

module.exports = router;