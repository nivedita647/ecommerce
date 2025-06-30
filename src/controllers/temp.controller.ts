import { rolePermissionMappingRepository } from "../repositories/rolePermissionMapping.repository";
import { Request,Response } from "express";

export const tempController = {
    async getPerms(req:Request,res:Response){
        try{
            const perms = await rolePermissionMappingRepository.getPerms(1);
            console.log(perms[0].dataValues.perms.type);
        }catch(error){

        }
    }
}