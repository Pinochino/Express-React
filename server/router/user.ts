const express = require('express');
const UserController = require('../controller/UserController.controller.js');

const router = express.Router();
const userController = new UserController();

router.get('/list', userController.getAllUsers);


module.exports = router;

