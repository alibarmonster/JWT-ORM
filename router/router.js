const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth-Controller');
const userController = require('../controllers/user-Controller');

router.post('/register', authController.register);
router.post('/login', authController.login);

router.get('/users', userController.getAllUser);
router.get('/users/:id', userController.getUsersById);
router.put('/users/:id', userController.updateUsersById);
module.exports = router;
