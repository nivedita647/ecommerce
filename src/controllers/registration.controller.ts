import { Request,Response } from "express";
const nodemailer = require('nodemailer');
import { emailService } from "../services/sendEmail.service";
import {otpService} from "../services/otpVerification.service"

export const registrationController = {
    
    async verifyEmail(req:Request, res:Response){
        try{
            const otp = await emailService.verifyEmail(req.body.email);
            res.cookie('otp',otp);
            res.cookie('email',req.body.email);
            res.cookie('role',req.params.role);
            res.status(200).json('check email');
        }catch(error){
            res.status(500).json(error);
        }
        
    },

    async verifyOTP(req:Request, res:Response){
        try{
            const result = await otpService.verifyOtp(req.body.otp, req.cookies.otp);
            if(result === true){
                res.cookie('status','verified');
                res.status(200).json('otp verified')
            }
            else{
                res.cookie('status','invalid user');
                res.status(200).json('wrong otp')
            }
            
        }catch(error){
            console.log(error);
            res.status(500).json(error);
        
        }
    }
}