import { Permission } from "../models/permission.model";
import { Role_permission_mapping } from "../models/role_permission_mapping.model";

export const rolePermissionMappingRepository = {
    async getPerms(role: number) {
        return await Role_permission_mapping.findAll({
            include: {
                model: Permission,
            },
            where:{
                role_id:role
            }
        })
    }
}