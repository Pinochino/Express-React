import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { convertToResponse, createProduct, deleteProductById, getAllProduct, getProductByBrand, getProductById, updateProduct } from 'service/product.service';

const prisma = new PrismaClient();
class ProductController {

  // [GET] /products/list
  async getAllProducts(req: Request, res: Response): Promise<void> {
    try {
      const products = await getAllProduct();
      const productResponse = await convertToResponse(products);

      if (productResponse) {
        res.status(200).json({ message: 'success', productResponse });
        return;
      }
      res.status(400).json({ message: 'Not found data' });
      return;
    } catch (error) {
      res.status(500).json(error);
    }
  }

  // [GET] /products/product/:id
  async getProductyId(req: Request, res: Response): Promise<void> {
    try {
      const product = await getProductById(req);
      const productResponse = await convertToResponse(product);
      if (productResponse) {
        res.status(200).json({ message: 'success', productResponse });
        return;
      }
      res.status(400).json({ message: 'Not found data' });
      return;
    } catch (error) {
      res.status(500).json(error);
    }
  }

  // [POST] /products/create
  async create(req: Request, res: Response): Promise<void> {
    try {
     const product = await createProduct(req);
     const productResponse = await convertToResponse(product);
      if (productResponse) {
        res.status(200).json({ message: 'success', productResponse });
        return;
      }
      res.status(400).json({ message: 'Fail to create' });
      return;
    } catch (error) {
      res.status(500).json(error);
    }
  }

  // [PUT] /products/update/:id
  async update(req: Request, res: Response): Promise<void> {
    try {
       const updatedProduct = await updateProduct(req);
       const productResponse = await convertToResponse(updatedProduct);
        if (productResponse) {
            res.status(200).json({message: `update success`, productResponse});
            return;
        }
        res.status(400).json({message: `fail to update`})
        return;
    } catch (error) {
        res.status(500).json(error);
    }
  }

  // [DELETE] /products/delete/:id
  async deleteProductById(req: Request, res: Response): Promise<void> {
    try {
       const isDeleted = await deleteProductById(req);
        if (isDeleted) {
            res.status(200).json({message: `Delete success product id`})
            return;
        }
        res.status(400).json({message: `Fail delete id`})
        return;
    } catch (error) {
        res.status(500).json(error);
    }
  }


  // [GET] /products/brand/:brand
  async getProductByBrand(req: Request, res: Response){
    try {
      const products = await getProductByBrand(req);
      if(products) {
        res.status(200).json({message: `success`, products});
        return;
      }
      res.status(400).json({message: `fail`});
      return;
    } catch (error) {
      res.status(500).json(error);
    }
  }

}
export default ProductController;
