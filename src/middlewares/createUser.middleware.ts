import { Request, Response, NextFunction } from "express";
import { request } from "../interfaces/middleware.interface";
// interface request extends Request {
//     endpoint: string,
//     role: string
// }

export const createUser = {
    async create(req: request, res: Response, next: NextFunction) {
        if (req.decodedrole === 'admin') {
            req.endpoint = 'create_user';
            console.log('pass2');
            next();
        }
        else if (req.decodedrole === req.body.role) {
            if (req.decodedrole === 'customer') {
                req.endpoint = 'create_user';
                console.log('pass2');
                next();
            }
            else if (req.decodedrole === 'seller') {
                req.endpoint = 'create_seller';
                console.log('pass2');
                next();
            }
        }
        else {
            res.status(401).json('pls login correctly')
        }
    }
}