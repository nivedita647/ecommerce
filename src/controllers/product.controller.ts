import {Request, Response} from 'express'
import { productService } from '../services/product.service';

export const productController = {
    async getAll(req:Request, res:Response){
        try{
            const products = await productService.getAll()
            res.status(200).json(products)
        }catch(error){
            console.log(error);
            res.status(500).json({errorMessage: error})
        }
    },

    // async createProduct(req:Request, res:Response){
    //     try{
    //         const product = await productService.createProduct(req.body);
    //         res.status(201).json(product);
    //     }catch(error){
    //         console.log(error);
            
    //         res.status(500).json({errorMessage: error})
    //     }
    // },

    async getProductBySellerProductId(req:Request, res:Response){
        try{
            const product = await productService.getProductBySellerProductId(Number(req.params.id))
            res.status(200).json(product);
        }catch(error){
            console.log(error);
            res.status(500).json({errorMessage: error})
        }
    }
}