import { Request, Response } from 'express';
import Redis from 'ioredis';
import { createUser, deleteUserById, getUserById, getUsers, login, updateUser } from '@/service/user.service';
import UserRequest from '@/dto/request/UserRequest';
import { PrismaClient, Role, User } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import RoleInterface, { roles } from '@/interfaces/RoleInterface';
import UserInterface, { users } from '@/interfaces/UserInterface';
import { encodedPassword } from '@/utils/crypto';

// const redis = new Redis();
const prisma = new PrismaClient();
class UserController {
  // [GET] /users/list
  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await getUsers();
      if (users) {
        res.status(200).json({ message: 'success', users });
      }
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  // [GET] /users/user/:id
  async getUserById(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    try {
      const data = await getUserById(id);
      if (data) {
        res.cookie('username', data.username, { httpOnly: true });
        res.cookie('email', data.email, { httpOnly: true });
        res.status(200).json({ message: 'success', data });
      }
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  // [POST] /register
   async create(req: Request, res: Response): Promise<void>  {
    const { username, email, password, avatar, avatarUrl, roles } = req.body;
  
    try {
      // Tạo đối tượng UserRequest từ dữ liệu nhận được từ request
      const userRequest = new UserRequest({
        username,
        email,
        password,
        avatar,
        avatarUrl,
        roles,  // Đảm bảo rằng roles là một mảng các tên vai trò
      });
  
      // Tạo người dùng mới qua UserService
      const result = await createUser(userRequest);
  
      // Trả về kết quả với user và các roles
      res.status(201).json({
        message: "User created successfully",
        user: result.user,
        roles: result.roles,  // Đây là nơi bạn trả về các vai trò
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error });
    }
  };
  
  

  // [PUT] /users/update/:id
  async update(req: Request, res: Response): Promise<void> {
    const userId = req.params.id;
    const { username, email, password, avatar, avatarUrl, roleNames } = req.body;
  
    try {
      // Tạo đối tượng UserRequest từ dữ liệu nhận được từ request
      const userRequest = new UserRequest({
        username,
        email,
        password,
        avatar,
        avatarUrl,
        roles: roleNames,
      });
  
      // Gọi service để cập nhật người dùng
      const result = await updateUser(userId, userRequest);
  
      // Trả về kết quả
      res.status(200).json({
        message: "Update success",
        user: result.updatedUser,
        roles: result.updatedRoles,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error });
    }
  }
  

  // [DELETE] /users/delete/:id
  async deleteUserById(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.id;
      const data = await deleteUserById(userId);
      if (data) {
        res.status(200).json({ message: `delete success user` });
        return;
      }
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  // [POST] /users/login
  async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    try {
      const result = await login(email, password);

      if (result.success) {
        res.status(200).json({
          message: 'Login success',
          user: {
            username: result.data.username,
            email: result.data.email
          }
        });
      } else {
        res.status(400).json({ message: 'Login failed' });
      }
      return;
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
export default UserController;
