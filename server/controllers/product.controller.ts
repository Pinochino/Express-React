import { PrismaClient } from '@prisma/client';
import ProductRequest from 'dto/request/ProductRequest';
import { Request, Response } from 'express';

const prisma = new PrismaClient();
class ProductController {

  // [GET] /products/list
  async getAllProducts(req: Request, res: Response): Promise<void> {
    try {
      const products = await prisma.product.findMany();
      if (products) {
        res.status(200).json({ message: 'success', products });
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
      const productId = String(req.params.id);
      const product = await prisma.product.findUnique({
        where: {
          id: productId
        }
      });
      if (product) {
        res.status(200).json({ message: 'success', product });
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
      const productRequest = new ProductRequest(req.body)
      const product = await prisma.product.create({
        data: {
            name: productRequest.name,
            inventory: productRequest.inventory,
            price: productRequest.price,
            brand: productRequest.brand,
            description: productRequest.description
        }
      })
      if (product) {
        res.status(200).json({ message: 'success', product });
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
        const productId = req.params.id;
        const productRequest = new ProductRequest(req.body);
        const updatedProduct = await prisma.product.update({
            where: {
                id: productId
            },
            data: {
                name: productRequest.name,
                inventory: productRequest.inventory,
                price: productRequest.price,
                brand: productRequest.brand,
                description: productRequest.description
            }
        })
        if (updatedProduct) {
            res.status(200).json({message: `Update success id: ${productId}`, updatedProduct});
            return;
        }
        res.status(400).json({message: `Fail to update`})
        return;
    } catch (error) {
        res.status(500).json(error);
    }
  }

  // [PUT] /products/update/:id
  async deleteProductById(req: Request, res: Response): Promise<void> {
    try {
        const productId = req.params.id;
        const isDeleted = await prisma.product.delete({
            where: {
                id: productId
            }
        })
        if (isDeleted) {
            res.status(200).json({message: `Delete success product id" ${productId}`})
            return;
        }
        res.status(400).json({message: `Fail delete id" ${productId}`})
        return;
    } catch (error) {
        res.status(500).json(error);
    }
  }

  async convertToResponse(productRequest: ProductRequest) {}
}
export default ProductController;
