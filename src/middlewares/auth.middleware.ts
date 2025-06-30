import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config()

export const auth = {
    async auth(req:Request, res:Response, next:NextFunction){
        const token = req.cookies.token;
        if(token){
            jwt.verify(token,process.env.AUTH_SECRETKEY as string, async(error:any,decoded:string|jwt.JwtPayload|undefined)=>{
                if(error){
                    res.clearCookie('token');
                    res.status(401).json('unauthorised');
                    return;
                }
                else{
                    next();
                }
            })
        }
        else{
            res.status(401).json('please login first');
        }
    }
}