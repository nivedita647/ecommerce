import { Admin } from "../models/admin.model";
import bcrypt from 'bcrypt'

export const adminRepository = {
    async login(username:string, userPwd:string){
            const user = await Admin.findOne({where:{username: username}});
            if(user){
                const result = await bcrypt.compare(userPwd, user.password)
                return result;
            }
            else{
                return (false)
            }
        },
    
        async createToken(username:string){
            const role = "admin";
            return role;
        }
}