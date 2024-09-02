const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Create a new user
router.post('/users', userController.createUser);

// Get all users
router.get('/users', userController.getUsers);

module.exports = router;
