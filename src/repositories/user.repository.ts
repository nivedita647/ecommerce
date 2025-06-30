import { ValidationError } from "sequelize";
import {User} from "../models/user.model"

export const userRepository = {
    async getAll(){
        return await User.findAll();
    },

    async getId(email:string){
        return await User.findOne({where:{email:email}})
    },

    async createUser(data: User){
        // return await User.create(data)
        try{
            return await User.create(data)
        }catch(error){
            const er = error as ValidationError;
            var msgs:Array<string> = [];
            for(const ele of er.errors){
                msgs.push(ele.message);
            }
            return msgs;
            // console.log(er.errors[0].message);
        }
        
    },

    async updateUser(data:User,id:number){
        return await User.update(data,{where:{id:id}})
    },

    async deleteUser(id:number){
        return await User.destroy({where:{id:id}})
    }
}