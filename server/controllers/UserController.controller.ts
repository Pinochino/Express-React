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

  private sendSuccess(res: Response, message: string, data: any): void{
    res.status(200).json({message,  data});
  }

  private sendError(res: Response, error: any): void{
    const errorMessage = error instanceof Error ? error.message : String(error);
    res.status(500).json({ message: errorMessage });
  }

  // [GET] /users/list
  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const data = await prisma.user.findMany();
      if (data) {
        this.sendSuccess(res, 'success', data);
      }
      throw new ResourceNotFoundException();
    } catch (error) {
      this.sendError(res, error)
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
        this.sendSuccess(res, 'success', data)
      }
      throw new ResourceNotFoundException();
    } catch (error) {
      this.sendError(res, error);
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
     this.sendSuccess(res, 'success', newUser);
      return;
    } catch (error) {
      this.sendError(res, error)
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
      this.sendSuccess(res, 'success', newUser);
      return;
    } catch (error) {
     this.sendError(res, error)
    }
  }

  // [DELETE] /users/delete/:id
  async deleteUserById(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    try {
      const data = await prisma.user.delete({
        where: { id }
      });
      this.sendSuccess(res, `delete success user by id: ${id}`, data)
      return;
    } catch (error) {
      this.sendError(res, error)
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
      this.sendSuccess(res, 'login success', null);
        return;
      }
      this.sendSuccess(res, 'login fail', null);
      return;
    } catch (error) {
      this.sendError(res, error)
    }
  }

  async convertToResponse(user: any): Promise<UserResponse> {
    const userResponse = new UserResponse(user);
    return classToClassFromExist(userResponse, user);
  }
}
export default UserController;
