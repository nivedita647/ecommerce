import { loginService } from "../services/login.service";
import { Request,Response } from "express";

export const loginController = {
    async login(req:Request, res:Response){
        try{
            const result = await loginService.login(req.body.email, req.body.password);
            if(result === true){
                const token = await loginService.createToken(req.body.email);
                res.clearCookie('otp')
                res.clearCookie('email')
                res.clearCookie('role');
                res.cookie('token',token)
                res.status(200).json('successfully logged in');
            }
            else{
                res.status(401).json('bad credentials')
            }
        }catch(error){
            console.log(error);
            res.status(500).json({errorMessage:error})
        }
        
    }
}