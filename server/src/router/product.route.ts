import ProductController from "@/controllers/product.controller";
import { Router } from "express";
import express from "express";

const productRouter: Router = express.Router();
const productController = new ProductController();

productRouter.get('/list', productController.getAllProducts);
productRouter.get('/product/:id', productController.getProductyId);
productRouter.get('/brand/:brand', productController.getProductByBrand);
productRouter.post('/create', productController.create);
productRouter.put('/update/:id', productController.update);
productRouter.delete('/delete/:id', productController.deleteProductById);

export default productRouter;