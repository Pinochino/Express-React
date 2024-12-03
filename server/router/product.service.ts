import ProductController from "controllers/product.controller";
import { Router } from "express";
import express from "express";

const productRouter: Router = express.Router();
const productController = new ProductController();

productRouter.get('/list', productController.getAllProducts);

export default productRouter;