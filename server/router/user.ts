import UserController from "controllers/UserController.controller";
import { Router } from "express";
import express from 'express';


const router: Router = express.Router();
const userController = new UserController;

router.get('/list',  userController.getAllUsers);
router.get('/user/:id',  userController.getUserById);
router.post('/register',  userController.create);
router.post('/login',  userController.login);
router.put('/update/:id',  userController.update);
router.delete('/delete/:id',  userController.deleteUserById);




export default router;

