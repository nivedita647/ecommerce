import { Request, Response } from "express";
import { adminService } from "../services/admin.service";

export const adminController = {
    async adminLogin(req: Request, res: Response) {
        try {
            const result = await adminService.login(req.body.username, req.body.password);
            if (result === true) {
                const token = await adminService.createToken(req.body.username);
                res.clearCookie('otp')
                res.clearCookie('email')
                res.clearCookie('role');
                res.cookie('token', token)
                res.status(200).json('successfully logged in');
            }
            else {
                res.status(401).json('bad credentials')
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ errorMessage: error })
        }
    },

    async generateStats(req:Request,res:Response){
        try{
            const prods = await adminService.generateStats();
            res.status(200).json('stats generated');
        }catch(error){
            console.log(error);
            res.status(500).json({ errorMessage: error })
        }
    }
}