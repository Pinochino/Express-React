import { Request, Response } from 'express';
import { PrismaClient, User } from '@prisma/client';
import { compare, encode } from 'utils/crypto';
import UserRequest from 'dto/request/UserRequest';
import UserResponse from 'dto/response/UserResponse';
import { classToClassFromExist } from 'class-transformer';
import Redis from 'ioredis';

const prisma = new PrismaClient();
// const redis = new Redis();
class UserController {


  // [GET] /users/list
  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const data = await prisma.user.findMany();
      if (data) {
        res.status(200).json({message: 'success', data});
      }
    } catch (error) {
      res.status(500).json({message: error})
    }
  }

  // [GET] /users/user/:id
  async getUserById(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    try {
      const data = await prisma.user.findUnique({
        where: { id }
      });
      if (data) {
        res.cookie('username', data.username, { httpOnly: true });
        res.cookie('email', data.email, { httpOnly: true });
        res.status(200).json({message: 'success', data})
      }
  
    } catch (error) {
      res.status(500).json({message: error});
    }
  }

  // [POST] /register
  async create(req: Request, res: Response): Promise<void> {
    try {
      const userRequest = new UserRequest(req.body);
      const encodedPassword = await encode(userRequest.password);
      const newUser = await prisma.user.create({
        data: {
          username: userRequest.username,
          email: userRequest.email,
          password: encodedPassword,
          avatar: userRequest.avatar
        }
      });
      res.status(200).json({message: 'created successfully', newUser})
      return;
    } catch (error) {
      res.status(500).json({message: error})
    }
  }

  // [PUT] /users/update/:id
  async update(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const userRequest = new UserRequest(req.body);
      const encodedPassword = encode(userRequest.password);
      const newUser = await prisma.user.upsert({
        where: { id },
        update: {
          username: userRequest.username,
          email: userRequest.email,
          avatar: userRequest.avatar,
          avatarUrl: userRequest.avatarUrl,
          updatedAt: userRequest.updatedAt
        },
        create: {
          id,
          username: userRequest.username,
          email: userRequest.email,
          password: String(encodedPassword),
          avatar: userRequest.avatar,
          avatarUrl: userRequest.avatarUrl,
          isDeleted: userRequest.isDeleted,
          createdAt: userRequest.createdAt,
          updatedAt: userRequest.updatedAt
        }
      });
       res.status(200).json({message: 'update success', newUser})
      return;
    } catch (error) {
     res.status(500).json({message: error})
    }
  }

  // [DELETE] /users/delete/:id
  async deleteUserById(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    try {
      const data = await prisma.user.delete({
        where: { id }
      });
   res.status(200).json({message: `delete success user id: ${id}`, data})
      return;
    } catch (error) {
      res.status(500).json({message: error})
    }
  }

  // [POST] /users/login
  async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    try {
      const data = await prisma.user.findUnique({
        where: { email }
      });

      if (await compare(password, String(data?.password))) {
      res.status(200).json({message: 'login success'})
        return;
      }
      res.status(400).json({message: 'login fail'})
      return;
    } catch (error) {
    res.status(500).json({message: error})
    }
  }

  async convertToResponse(user: any): Promise<UserResponse> {
    const userResponse = new UserResponse(user);
    return classToClassFromExist(userResponse, user);
  }
}
export default UserController;
