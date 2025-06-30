import { categoryService } from "../services/category.service";
import { Request,Response } from "express";
import { errorHelper } from "../helpers/error.helper";

export const categoryController = {
    async getAll(req:Request, res:Response){
        try{
            const categories = await categoryService.getAll();
            res.status(200).json({message:errorHelper.getHelper(categories.length), data:categories});
        }catch(error){
            console.log(error);
            res.status(500).json({errorMessage:error})
        }
    },

    async create(req:Request, res:Response){
        try{
            const category = await categoryService.create(req.body,req.file!.filename);
            res.status(201).json({message:errorHelper.createHelper(category), data:category})
        }catch(error){
            console.log(error);
            res.status(500).json(error)
        }
    },

    async getCategoryByName(req:Request, res:Response){
        try{
            const category = await categoryService.getCategoryByName(req.body.name);
            res.status(200).json({message:errorHelper.getHelper(category.length), data:category});
        }catch(error){
            console.log(error);
            res.status(500).json({errorMessage:error})
        }
    }
}