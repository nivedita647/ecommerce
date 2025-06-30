import { User } from "../models/user.model";
import { userRepository } from "../repositories/user.repository";
import bcrypt from "bcrypt"
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});

export const userService = {

    async getAll() {
        return userRepository.getAll();
    },

    async createUser(data: User, filename: string) {
        let hashedPwd = await bcrypt.hash(data.password, 10);
        data.password = hashedPwd;
        interface photo{
            url:string
        }
        const result:photo = await cloudinary.uploader.upload(`public/uploads/${filename}`)
        data.profile_photo = result.url;
        return userRepository.createUser(data as User);
    },

    async updateUser(data:User,id:number){
        return await userRepository.updateUser(data,id);
    },

    async deleteUser(id:number){
        return await userRepository.deleteUser(id);
    }
}