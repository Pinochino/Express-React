import RoleResponse from "@/dto/response/RoleResponse";
import { createRole } from "@/service/role.service";
import { Request, Response } from "express";

class RoleController {

    async getAllRoles(req: Request, res:Response){

    }
    async createRole(req: Request, res:Response){
        try {
            const roleRequest = new RoleResponse(req.body)
            const newRole = await createRole(roleRequest);
            if (newRole) {
                res.status(200).json({data: newRole})
                return;
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({data: error})
        }
    }

}
export default RoleController