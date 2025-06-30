import { Request, Response, NextFunction } from "express";
import dotenv from 'dotenv'
import { roleRepository } from "../repositories/role.repository";
import { rolePermissionMappingRepository } from "../repositories/rolePermissionMapping.repository";
import { request } from "../interfaces/middleware.interface";

dotenv.config()

// interface request extends Request{
//     role:string,
//     endpoint:string
// }
export const perms = {
    async auth(req: request, res: Response, next: NextFunction) {
        if (req.decodedrole) {
            const roleid = await roleRepository.getId(req.decodedrole);
            const perms = await rolePermissionMappingRepository.getPerms(Number(roleid?.dataValues.id))
            for (let i = 0; i < perms.length; i++) {
                const temp = perms[i].dataValues.perms.type;
                if (temp === req.endpoint) {
                    console.log('pass3');
                    console.log(temp);
                    next();
                    return;
                }
            }
        }
        res.status(401).json('unauthorized');
        return;

    }
}