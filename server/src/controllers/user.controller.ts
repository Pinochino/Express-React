import { Request, Response } from 'express';
import Redis from 'ioredis';
import {  createUser, deleteUserById, getUserById, getUsers, login } from '@/service/user.service';
import UserRequest from '@/dto/request/UserRequest';

// const redis = new Redis();
class UserController {


  // [GET] /users/list
  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await getUsers();
      if (users) {
        res.status(200).json({ message: 'success',  users });
      }
    } catch (error) {
      res.status(500).json({ message: error })
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
        res.status(200).json({ message: 'success', data })
      }

    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  // [POST] /register
  async create(req: Request, res: Response): Promise<void> {
    try {
      const userRequest = new UserRequest(req.body);
      console.log(userRequest);
      const newUser = await createUser(userRequest);
      if (newUser) {
        res.status(200).json({ message: 'created successfully', data: newUser })
        return;
      }
      res.status(400).json({ message: 'fail'})
      return;
    } catch (error) {
      console.log(error);
      res.status(500).json(error)
    }
  }

  // [PUT] /users/update/:id
  // async update(req: Request, res: Response): Promise<void> {
  //   try {
  //     const userId = req.params.id;
  //     const userRequest = new UserRequest(req.body);
  //     const updatedUser = await updateUser(userId, userRequest);
  //     res.status(200).json({ message: 'update success', updatedUser })
  //     return;
  //   } catch (error) {
  //     res.status(500).json({ message: error })
  //   }
  // }

  // [DELETE] /users/delete/:id
  async deleteUserById(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.id;
      const data = await deleteUserById(userId);
      if (data) {
        res.status(200).json({ message: `delete success user` })
        return;
      }
    } catch (error) {
      res.status(500).json({ message: error })
    }
  }

  // [POST] /users/login
  async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    try {
      const result = await login(email, password);

      if (result.success) {
        res.status(200).json({ message: 'Login success', user: {
          username:  result.data.username,
          email: result.data.email
        } });
      } else {
        res.status(400).json({ message: 'Login failed' });
      }
      return;
    } catch (error) {
      res.status(500).json(error)
    }
  }

}
export default UserController;
