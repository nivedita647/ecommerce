import { cartService } from "../services/cart.service";
import { Request, Response } from "express";
import { errorHelper } from "../helpers/error.helper";

export const cartController = {
    async addItem(req: Request, res: Response) {
        try {
            const result = await cartService.addItem(Number(req.params.id), req.body.id);
            res.status(201).json({ message: errorHelper.cartHelper(result) });
        } catch (error) {
            console.log(error);
            res.status(500).json(error)
        }
    },

    async removeItem(req: Request, res: Response) {
        try {
            const result = await cartService.removeItem(Number(req.params.id), req.body.id);
            res.status(200).json({ message: errorHelper.deleteHelper(result) })
        } catch (error) {
            console.log(error);
            res.status(500).json(error)
        }
    },

    async placeOrder(req:Request,res:Response){
        try{
            const result = await cartService.placeOrder(Number(req.params.id),req.body.id);
            if(result){
                res.status(200).json(`order created with order id : ${result}`)
            }
        }catch(error){
            console.log(error);
            res.status(500).json(error)
        }
    }
}