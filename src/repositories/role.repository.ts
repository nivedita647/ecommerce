import { Role } from "../models/role.model";

export const roleRepository = {
    async getId(name:string){
        return await Role.findOne({where:{role_name:name}});
    }
}