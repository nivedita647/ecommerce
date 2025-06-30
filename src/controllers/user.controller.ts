import { userService } from "../services/user.service";
import {Request, Response} from 'express'
import { errorHelper } from "../helpers/error.helper";
import { User } from "../models/user.model";

export const userController = {
    async getAll(req:Request, res:Response){
        try{
            const users = await userService.getAll();
            res.status(200).json({message:errorHelper.getHelper(users.length),data:users});
        }catch(error){
            console.log(error);
            res.status(500).json(error);
        }
    },

    async createUser(req:Request, res:Response){
        try{
            const user = await userService.createUser(req.body,req.file!.filename);
            if(typeof user === typeof User){
                res.status(201).json({message:errorHelper.createHelper(user as User), data:user});
            }
            else{
                res.status(400).json({errorMessages:user});
            }
        }catch(error){
            console.log(error);
        }
    },

    async updateUser(req:Request, res:Response){
        try{
            const user = await userService.updateUser(req.body,Number(req.params.id));
            res.status(200).json({message: errorHelper.updateHelper(user[0])});
        }catch(error){
            console.log(error);
            res.status(500).json(error)
        }
    },

    async deleteUser(req:Request, res:Response){
        try{
            const user = await userService.deleteUser(Number(req.params.id));
            res.status(200).json({message:errorHelper.deleteHelper(user)});
        }catch(error){
            console.log(error);
            res.status(500).json(error)
        }
    }
}