import { Request, Response } from "express";

import cookieParser from "cookie-parser";
import connectDb from "../dbSetup";

class UserController {

    // [GET] /user/list
    async getAllUsers(req: Request, res: Response) {
        try {
            const sql = `SELECT * FROM USER`;
            const [data] = await (await connectDb()).query(sql);
            if (data) {
                return res.status(200).json({ message: 'success', data })
            }
            return res.status(400).json({ message: 'No users found' });
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }

    // [GET] /user/:id
    async getUserById(req: Request, res: Response) {
        try {
            const userId = req.params.id;
            const sql = `SELECT USERNAME, EMAIL, AVATAR FROM USER WHERE USER_ID = ?`;
            const [data] = (await connectDb()).query(sql, [userId]);
            if (data.length > 0) {
                const user = data[0];
                res.cookie('username', user.USERNAME)
                res.cookie('email', user.EMAIL);
                return res.status(200).json({ message: 'success', data })
            }
            return res.status(400).json({ error });
        } catch (error) {
            
        }
    }

    // [POST] /register
    async create(req: Request, res: Response) {
        const { username, email, password, avatarUrl, confirmPassword, } = req.body;
        const sql = `UPDATE USER SET USERNAME = ?, EMAIL = ?, PASSWORD = ? `
    }

}
module.exports = UserController;
