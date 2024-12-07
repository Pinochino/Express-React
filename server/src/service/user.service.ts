import dotenv from 'dotenv';
dotenv.config();
import { PrismaClient } from '@prisma/client';
import { classToClassFromExist } from 'class-transformer';

import { compareEncoded, encodedPassword } from '@/utils/crypto';
import jwt from 'jsonwebtoken';
import UserRequest from '@/dto/request/UserRequest';
import UserResponse from '@/dto/response/UserResponse';

const prisma = new PrismaClient();

export const createUser = async (userRequest: UserRequest) => {
  const { username, email, password, avatar, avatarUrl, roles } = userRequest;

  try {
    let encoded = await encodedPassword(password)
    // Tạo user mới
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: encoded,
        avatar,
        avatarUrl
      }
    });

    // Duyệt qua danh sách roles và tạo các roles
    const userRoles = [];
    for (const roleName of roles) {
      let role = await prisma.role.findUnique({ where: { name: roleName } });

      if (!role) {
        // Tạo role mới nếu chưa tồn tại
        role = await prisma.role.create({
          data: {
            name: roleName,
            userId: newUser.id // Gán userId hợp lệ
          }
        });
      }
      userRoles.push(role);
    }

    // Trả về user cùng với vai trò
    return { user: newUser, roles: userRoles };
  } catch (error) {
    throw new Error(`Error creating user: ${error}`);
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id }
    });

    const result = await convertToUserRes(user);
    return result;
  } catch (error) {
    throw new ResourceNotFoundException(`Error fetching user with error: ${error}`);
  }
};

export const getUsers = async () => {
  try {
    const users = await prisma.user.findMany({
      include: {
        roles: {
          select: {
            id: true, // Chỉ lấy id của role
            name: true // Chỉ lấy name của role
            // Không lấy userId
          }
        }
      }
    });
    const result = await convertToUserRes(users);
    if (result) {
      return result;
    }
  } catch (error) {
    throw new ResourceNotFoundException(`Error fetching user with error: ${error}`);
  }
};

export const updateUser = async (userId: string, userRequest: UserRequest) => {
    const { username, email, password, avatar, avatarUrl, roles } = userRequest;

    try {
      // Mã hóa mật khẩu nếu có thay đổi
      let hashedPassword = password ? await encodedPassword(password) : undefined;
  
      // Cập nhật thông tin user
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
          username,
          email,
          password: hashedPassword || undefined,  // Cập nhật password nếu có thay đổi
          avatar,
          avatarUrl,
          updatedAt: new Date(),
        },
      });
  
      // Cập nhật roles nếu cần
      let updatedRoles = [];
      if (roles && roles.length > 0) {
        const currentRoles = await prisma.role.findMany({
          where: { userId },
        });
  
        const rolesToAdd = roles.filter(
          (roleName: string) => !currentRoles.some((r) => r.name === roleName)
        );
  
        const rolesToRemove = currentRoles.filter(
          (role) => !roles.includes(role.name)
        );
  
        // Thêm các role mới
        for (const roleName of rolesToAdd) {
          const existingRole = await prisma.role.findUnique({
            where: { name: roleName },
          });
  
          if (!existingRole) {
            const newRole = await prisma.role.create({
              data: {
                name: roleName,
                userId,
              },
            });
            updatedRoles.push(newRole);
          } else {
            await prisma.role.update({
              where: { id: existingRole.id },
              data: { userId },
            });
          }
        }
  
        // Xóa các role không còn cần thiết
        for (const role of rolesToRemove) {
          await prisma.role.delete({
            where: { id: role.id },
          });
        }
      }
  
      return { updatedUser, updatedRoles };
    } catch (error) {
      throw new Error(`Error updating user: ${error}`);
    }
};

export const deleteUserById = async (id: string) => {
  try {
    const data = await prisma.user.delete({
      where: { id }
    });
    return data;
  } catch (error) {
    throw new Error(`Can't delete user ${error}`);
  }
};

export const login = async (email: string, password: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email }
    });
    if (!user) {
      throw new Error('User not found');
    }
    const passwordMatch = await compareEncoded(password, user.password);
    if (!passwordMatch) {
      throw new Error('Invalid password');
    }
    // create an access token
    const payload = {
      username: user.username,
      email: user.email
    };
    const secret = process.env.JWT_SECRET || '7cbc616d-c9e9-4397-96b7-d1f9c236b991';
    const access_token = jwt.sign(payload, secret, {
      expiresIn: process.env.JWT_EXPIRED
    });
    return { success: true, data: user };
  } catch (error) {
    throw new Error(`Can't delete user ${error}`);
  }
};

export const convertToUserRes = (product: any) => {
  if (Array.isArray(product)) {
    return product.map((item) => {
      const userResponse = new UserResponse(item);
      return classToClassFromExist(userResponse, item);
    });
  } else {
    const userResponse = new UserResponse(product);
    return classToClassFromExist(userResponse, product);
  }
};
