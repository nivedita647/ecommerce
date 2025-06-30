import { Request, Response, NextFunction } from "express";
import { userRepository } from "../../repositories/user.repository";
import { request } from "../../interfaces/middleware.interface";
import { sellerRepository } from "../../repositories/seller.repository";
import { productRepository } from "../../repositories/product.repository";
import { seller_productRepository } from "../../repositories/seller_product.repository";

export const deleteProduct = {
    async delete(req: request, res: Response, next: NextFunction) {
        const user = await userRepository.getId(req.useremail);
        const seller = await sellerRepository.getById(Number(user?.id))
        const product = await seller_productRepository.getById(Number(req.params.id));
        if (user?.role === 'seller') {
            if (seller?.id === product?.seller_id) {
                req.endpoint = 'delete_seller_product';
                console.log('pass2');
                next();
            }
            else {
                res.status(401).json("cannot edit other user's data")
            }
        }
        else if (user?.role === 'admin') {
            req.endpoint = 'delete_seller_product';
            console.log('pass2');
            next();
        }
        else {
            res.status(401).json('pls login as admin or seller')
        }
    }
}