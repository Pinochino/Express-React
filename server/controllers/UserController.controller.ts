import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import cookieParser from "cookie-parser";

const prisma = new PrismaClient();
class UserController {



    // [GET] /user/list
    async getAllUsers(req: Request, res: Response): Promise<void> {
        try {
            const data = await prisma.user.findMany();
            if (data) {
             res.status(200).json({ message: 'success', data });
            } 
        } catch (error) {
             res.status(500).json({ message: 'fail', error });
        
        }
    }

    // [GET] /user/:id
    async getUserById(req: Request, res: Response) {

    }

    // [POST] /register
    async create(req: Request, res: Response) {
    }

    async update(req: Request, res: Response) {
    }

    async deleteUserById(req: Request, res: Response) {
    }

}
export default UserController;
