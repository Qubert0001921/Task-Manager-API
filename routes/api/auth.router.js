const express = require('express');
const router = express.Router();
const authController = require('../../controllers/api/auth.controller');

// login user
router.post('/login', authController.login);

// refresh access token
router.post('/refresh', authController.refresh);

module.exports = router;