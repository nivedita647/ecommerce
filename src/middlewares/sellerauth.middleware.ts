import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config()

interface Decoded {
    email: string,
    role: string
}

export const sellerauth = {
    async auth(req: Request, res: Response, next: NextFunction) {
        const token = req.cookies.token;
        if (token) {
            const decoded = jwt.verify(token, process.env.AUTH_SECRETKEY as string) as Decoded;
            if (decoded.role === 'seller') {
                next();
            }
            else{
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