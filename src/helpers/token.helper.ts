import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config()

interface Decoded {
    email: string,
    role: string
}

export const decodeToken = {
    async decoder(req: Request, res: Response) {
        const token = req.cookies.token;
        if (token) {
            const decoded = jwt.verify(token, process.env.AUTH_SECRETKEY as string) as Decoded;
            return decoded.email;
        }
        else {
            res.status(401).json('please login first');
        }
    }
}