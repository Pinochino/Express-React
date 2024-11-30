import UserController from "controllers/UserController.controller";
import { Router } from "express";
import express from 'express';


const router: Router = express.Router();
const userController = new UserController;

router.get('/index', userController.index);


export default router;

