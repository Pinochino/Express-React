import UserController from "controllers/UserController.controller";
import { Router } from "express";
import express from 'express';


const router: Router = express.Router();
const userController = new UserController;

router.get('/list',  userController.getAllUsers);
router.get('/user/:id',  userController.getUserById);
router.get('/user/create',  userController.create);
router.get('/user/update/:id',  userController.update);
router.get('/user/delete/:id',  userController.deleteUserById);




export default router;

