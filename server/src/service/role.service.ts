import RoleResponse from "@/dto/response/RoleResponse";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const getRoles = async () => {
    try {
        const roles = await prisma.role.findMany();
       return roles;
    } catch (error) {
        throw new Error(`Not find role: ${error}`);
    }
} 

export const createRole = async (roleResponse: RoleResponse) => {
    try {
        const role = await prisma.role.create({
            data: {
                name: roleResponse.name
            }
        })
        return role;
    } catch (error) {
        throw new Error(`Error: ${error}`)
    }
}