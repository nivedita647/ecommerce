import { User } from "../models/user.model";
import bcrypt from 'bcrypt';

export const loginRepository = {
    
    async login(userEmail:string, userPwd:string){
        const user = await User.findOne({where:{email: userEmail}});
        if(user){
            const result = bcrypt.compare(userPwd, user.password)
            return result;
        }
        else{
            return (false)
        }
    },

    async createToken(email:string){
        const user = await User.findOne({attributes:['role'],where:{email}})
        const role = user?.dataValues.role;
        return role;
    }
}