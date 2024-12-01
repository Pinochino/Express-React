import { Request, Response } from 'express';
import { PrismaClient, User } from '@prisma/client';
import cookieParser from 'cookie-parser';
import { encode } from 'utils/crypto';
import UserRequest from 'dto/request/UserRequest';
import UserResponse from 'dto/response/UserResponse';
import { classToClassFromExist, plainToClass } from 'class-transformer';

const prisma = new PrismaClient();
class UserController {
  private sendSucessMessage(res: Response, message: String, data: any) {
    res.status(200).json({ message, data });
  }

  private sendErrorMessage(res: Response, error: any) {
    res.status(500).json({ message: 'fail', error });
  }

  // [GET] /user/list
  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const data = await prisma.user.findMany();
      if (data) {
        this.sendSucessMessage(res, 'success', data);
      }
    } catch (error) {
      this.sendErrorMessage(res, error);
    }
  }

  // [GET] /user/:id
  async getUserById(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    try {
      const data = await prisma.user.findUnique({
        where: { id }
      });
      if (data) {
        res.cookie('username', data.username);
        res.cookie('email', data.email);
        this.sendSucessMessage(res, 'success', data);
      }
    } catch (error) {
      this.sendErrorMessage(res, error);
    }
  }

  // [POST] /register
  async create(req: Request, res: Response): Promise<void> {
    try {
      const userRequest = new UserRequest(req.body);
      const encodedPassword = String(encode(userRequest.password));
      const newUser = await prisma.user.create({
        data: {
          username: userRequest.username,
          email: userRequest.email,
          password: encodedPassword,
          avatar: userRequest.avatar
        }
      });
      this.sendSucessMessage(res, 'success', newUser);
    } catch (error) {
      this.sendErrorMessage(res, error);
    }
  }

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
      this.sendSucessMessage(res, 'success', newUser);
    } catch (error) {
      this.sendErrorMessage(res, error);
    }
  }

  async deleteUserById(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    try {
      const data = await prisma.user.delete({
        where: { id }
      });
      this.sendSucessMessage(res, 'delete success use id: ', data.id);
    } catch (error) {
      this.sendErrorMessage(res, error);
    }
  }

  async convertToResponse(user: any): Promise<UserResponse> {
    const userResponse = new UserResponse(user);
    return classToClassFromExist(userResponse, user);
  }
}
export default UserController;
