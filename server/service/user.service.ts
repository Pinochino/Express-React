import { PrismaClient } from '@prisma/client';
import { classToClassFromExist } from 'class-transformer';
import UserRequest from 'dto/request/UserRequest';
import UserResponse from 'dto/response/UserResponse';
import { Request } from 'express';
import { compareEncoded, encodedPassword } from 'utils/crypto';

const prisma = new PrismaClient();
export const createUser = async (userRequest: UserRequest) => {
    try {
        const encoded = await encodedPassword(userRequest.password);
        const newUser = await prisma.user.create({
            data: {
                username: userRequest.username,
                email: userRequest.email,
                password: encoded,
                avatar: userRequest.avatar
            }
        });
        return newUser;
    } catch (error) {
        throw new Error(`Can't create user ${error}`);
    }
};

export const getUserById = async (id: string) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id }
        });
        const result = await convertToResponse(user);
        return result;
    } catch (error) {
        throw new ResourceNotFoundException(`Error fetching user with error: ${error}`);
    }
};

export const getUsers = async () => {
    try {
        const users = await prisma.user.findMany();
        const result = await convertToResponse(users);
        if (result) {
            return result;
        }
    } catch (error) {
        throw new ResourceNotFoundException(`Error fetching user with error: ${error}`);
    }
};

export const updateUser = async (id: string, userRequest: UserRequest) => {
    try {
        const encoded = userRequest.password ? await encodedPassword(userRequest.password) : undefined;
        const newUser = await prisma.user.upsert({
            where: { id },
            update: {
                ...userRequest,
                password: encoded
            },
            create: {
                ...userRequest,
                password: String(encoded)
            }
        });
        return newUser;
    } catch (error) {
        throw new Error(`Can't update user ${error}`);
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
        return { success: true };
    } catch (error) {
        throw new Error(`Can't delete user ${error}`);
    }
};

const convertToResponse = (user: any) => {
    const userResponse = new UserResponse(user);
    return classToClassFromExist(userResponse, user);
};
