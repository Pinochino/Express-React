import { Request, Response } from "express";

import cookieParser from "cookie-parser";

class UserController {

    index(req: Request, res: Response){
        return res.send('Hello, Worlds!')
    }

    // [GET] /user/list
    async getAllUsers(req: Request, res: Response) {

    }

    // [GET] /user/:id
    async getUserById(req: Request, res: Response) {
  
    }

    // [POST] /register
    async create(req: Request, res: Response) {
    }

}
export default UserController;
