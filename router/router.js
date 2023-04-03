const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth-Controller');

router.post('/register', authController.register);

module.exports = router;
