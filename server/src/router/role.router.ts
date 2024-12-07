import RoleController from "@/controllers/role.controller";
import { Router } from "express";
import express from "express";

const roleRouter: Router = express.Router();
const roleController = new RoleController();

roleRouter.get('/list', roleController.getAllRoles);
roleRouter.post('/create', roleController.createRole);


export default roleRouter;