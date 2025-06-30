import { Request,Response } from "express";
import { orderItemService } from "../services/orderItem.service";

export const orderItemController = {
    // async create(req:Request, res:Response){
    //     try{
    //         const item = await orderItemService.create(Number(req.params.id),req.body);
    //         res.status(201).json(item);
    //     }catch(error){
    //         console.log(error);
    //         res.status(500).json(error);
    //     }
    // }
}