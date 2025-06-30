import { Category } from "../models/category.model";
import { categoryRepository } from "../repositories/category.repository";
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});

export const categoryService = {
    async getAll(){
        return await categoryRepository.getAll();
    },

    async create(data:Category,filename:string){
        interface photo{
            url:string
        }
        const result:photo = await cloudinary.uploader.upload(`public/uploads/${filename}`)
        data.photo = result.url;
        return await categoryRepository.create(data);
    },

    async getCategoryByName(name:string){
        return await categoryRepository.getCategoryByName(name)
    },

    async getId(name:string){
        return await categoryRepository.getId(name);
    }
}