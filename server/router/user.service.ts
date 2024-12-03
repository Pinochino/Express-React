import UserController from "controllers/user.controller";
import { Router } from "express";
import express from 'express';


const userRouter: Router = express.Router();
const userController = new UserController;

userRouter.get('/list',  userController.getAllUsers);
userRouter.get('/user/:id',  userController.getUserById);
userRouter.post('/register',  userController.create);
userRouter.post('/login',  userController.login);
userRouter.put('/update/:id',  userController.update);
userRouter.delete('/delete/:id',  userController.deleteUserById);




export default userRouter;

