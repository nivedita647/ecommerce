import { orderService } from "../services/order.service";
import { Request, Response } from "express";
import { errorHelper } from "../helpers/error.helper";

export const orderController = {
    async create(req: Request, res: Response) {
        try {
            const order = await orderService.create(req.body, Number(req.params.id));
            res.status(201).json({ message: errorHelper.createHelper(order), data: order });
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    },

    async addItem(req: Request, res: Response) {
        try {
            const item = await orderService.addItem(Number(req.params.id), req.body.id);
            if (item == true) {
                res.status(200).json("added");
            }
            else {
                res.status(200).json("sorry item out of stock");
            }
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    },

    async checkout(req: Request, res: Response) {
        try {
            //req.params.id is userId
            const item = await orderService.checkout(Number(req.params.id), req.body.address, req.body.orderId);
            if (item) {
                res.status(200).json({ message: errorHelper.orderHelper(item) });
            }
            else {
                res.status(200).json({ message: 'could not complete process'});
            }
        } catch (error) {
            console.log(error);             
            
            res.status(500).json(error);
        }
    },
}