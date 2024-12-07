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
    try {
        console.log(userRequest.roles);
        // Ensure roles exist in the request
        if (!userRequest.roles || userRequest.roles.length === 0) {
            throw new Error("No roles found in request");
        }

        let roleNames: string[] = [];

        // Extract role names from the request
        userRequest.roles.forEach(role => {
            if (role.name) {
                roleNames.push(role.name);  // Add the role name to the array
            }
        });

     
        // If roles are not found, create them
           // Fetch existing roles from the database
           let roles = await prisma.role.findMany({
            where: {
                name: {
                    in: roleNames
                }
            }
        });

        // If roles are not found, create them
        if (roles.length === 0) {
            console.log('No roles found, creating new roles');
            // Remove skipDuplicates to ensure new roles are created
            const newRoles = await prisma.role.createMany({
                data: roleNames.map(name => ({ name })), // Map roleNames to an array of objects
            });
            console.log('New roles created:', newRoles);

            // Fetch roles again after creation
            roles = await prisma.role.findMany({
                where: {
                    name: {
                        in: roleNames
                    }
                }
            });
        } else {
            console.log('Found existing roles:', roles);
        }


        // Encode password
        const encoded = await encodedPassword(userRequest.password);

        console.log('Roles to connect to user:', roles);

        // Create the new user and connect the roles
        const newUser = await prisma.user.create({
            data: {
                username: userRequest.username,
                email: userRequest.email,
                password: encoded,
                roles: {
                    connect: roles.map(role => ({ id: role.id })) // Connect found or created roles
                }
            }
        });
        return newUser;
    } catch (error) {
        console.error('Error creating user:', error);
        throw new Error(`Error: ${error}`);
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
                roles: true
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

// export const updateUser = async (id: string, userRequest: UserRequest) => {
//     try {
//         const encoded = userRequest.password ? await encodedPassword(userRequest.password) : undefined;
//         const newUser = await prisma.user.upsert({
//             where: { id },
//             update: {
//                 ...userRequest,
//                 password: encoded
//             },
//             create: {
//                 ...userRequest,
//                 password: String(encoded)
//             }
//         });
//         return newUser;
//     } catch (error) {
//         throw new Error(`Can't update user ${error}`);
//     }
// };

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
                email: user.email,
            }
            const secret = process.env.JWT_SECRET || '7cbc616d-c9e9-4397-96b7-d1f9c236b991';
            const access_token = jwt.sign(payload, 
                secret, 
                {
                    expiresIn: process.env.JWT_EXPIRED
                }
            );
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
