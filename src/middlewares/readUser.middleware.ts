import { Request, Response, NextFunction } from "express";
import { request } from "../interfaces/middleware.interface";

export const readUser = {
    async read(req: request, res: Response, next: NextFunction) {
        if (req.decodedrole === 'admin' || req.decodedrole === 'customer' || req.decodedrole === 'seller') {
            req.endpoint = 'read_user';
            console.log('pass2');
            
            next();
        }
        else{
            res.status(401).json('pls login')
        }
    }
}