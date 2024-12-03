import ProductRequest from "dto/request/ProductRequest";
import { Request, Response } from "express";

class ProductController {

    // [GET] /products/list
    async getAllProducts(req: Request, res: Response): Promise<void> {
        res.send("Hello Wold");
    }

    // [GET] /products/product/:id
    async getProductyId(req: Request, res: Response): Promise<void> {

    }

    // [POST] /products/create
    async create(req: Request, res: Response) {

    }

    // [PUT] /products/update/:id
    async update(req: Request, res: Response) {

    }

    // [PUT] /products/update/:id
    async deleteProductById(req: Request, res: Response) {

    }

    async  convertToResponse(productRequest: ProductRequest) {

    
    }


}
export default ProductController;