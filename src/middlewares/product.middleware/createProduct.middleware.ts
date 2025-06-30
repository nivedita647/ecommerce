import { Request, Response, NextFunction } from "express";
import { request } from "../../interfaces/middleware.interface";
import { userRepository } from "../../repositories/user.repository";
import { sellerRepository } from "../../repositories/seller.repository";

export const createProduct = {
    async create(req: request, res: Response, next: NextFunction) {
        const user = await userRepository.getId(req.useremail);
        const seller = await sellerRepository.getById(Number(user?.id))
        if (user?.role === 'seller') {
            if (req.body.seller_id === String(seller?.id)) {
                req.endpoint = 'create_seller_product';
                console.log('pass2');
                next();
            }
            else {
                res.status(401).json("cannot edit other user's data")
            }
        }
        else if (user?.role === 'admin') {
            req.endpoint = 'create_seller_product';
            console.log('pass2');
            next();
        }
        else {
            res.status(401).json('pls login as admin or seller')
        }
    }
}