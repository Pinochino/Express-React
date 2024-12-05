import { PrismaClient } from "@prisma/client";
import { classToClassFromExist } from "class-transformer";
import ProductRequest from "dto/request/ProductRequest";
import ProductResponse from "dto/response/ProductResponse";
import { Request  } from "express"

const prisma = new PrismaClient();

export const getAllProduct = async () => {
    try {
        const products = await prisma.product.findMany();
        if (products) {
            return products;
        }
    } catch (error) {
        throw new ResourceNotFoundException(`Error fetching producs with error: ${error}`)
    }
}

export const getProductById = async (req: Request) => {
    try {
        const productId = String(req.params.id);
        const product = await prisma.product.findUnique({
            where: {
                id: productId
            }
        });
        return product;
    } catch (error) {
        throw new ResourceNotFoundException(`Error fetching producs with error: ${error}`)
    }
}

export const createProduct = async (req: Request) => {
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
        return product
    } catch (error) {
        throw new Error(`Error: ${error}`);
    }
}

export const updateProduct = async (req: Request) => {
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
        return updatedProduct;
    } catch (error) {
        throw new Error(`Error: ${error}`);
    }
}

export const deleteProductById = async (req: Request) => {
    try {
        const productId = req.params.id;
        const isDeleted = await prisma.product.delete({
            where: {
                id: productId
            }
        })
        return isDeleted;
    } catch (error) {
        throw new Error(`Error: ${error}`);
    }
}

export const getProductByBrand = async (req: Request) => {
    try {
        const brand = String(req.params.brand);
        const products = await prisma.product.findMany({
            where: {
                brand: brand
            }
        })
        return products;
    } catch (error) {
        throw new Error(`Error: ${error}`);
    }
}

export const convertToResponse = (product: any) => {
    const productResponse = new ProductResponse(product);
    return classToClassFromExist(productResponse, product);
}
