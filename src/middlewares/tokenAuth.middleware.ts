import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { request } from "../interfaces/middleware.interface";

import dotenv from 'dotenv'
dotenv.config()

interface Decoded {
    email: string,
    role: string
}

// interface request extends Request{
//     useremail:string,
//     role:string,
// }

export const tokenAuth = {
    async auth(req: request, res: Response, next: NextFunction) {
        const token = req.cookies.token;
        if (token) {
            const decoded = jwt.verify(token, process.env.AUTH_SECRETKEY as string) as Decoded;
            if (decoded.role === 'admin' || decoded.role === 'customer' || decoded.role === 'seller') {
                req.useremail = decoded.email;
                req.decodedrole = decoded.role;
                console.log('pass1');
                next();
            }
            else {
                res.clearCookie('token');
                res.status(401).json('unauthorised');
                return;
            }
        }
        else {
            res.status(401).json('please login first');
        }
    }
}