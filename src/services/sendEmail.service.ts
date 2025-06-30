const nodemailer = require('nodemailer');
import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { jwtDecode } from "jwt-decode";

export const emailService = {

    async verifyEmail(email: string) {
        try {
            let otp: string = "";
            for (let i = 0; i < 6; i++) {
                otp += Math.floor(Math.random() * 9)
            }
            let hashedOtp = await bcrypt.hash(otp, 10);

            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.PASSWORD,
                },
            });

            let mailOptions = {
                from: process.env.EMAIL,
                to: email,
                subject: "OTP Verification",
                html: `
                    <div style="font-family: 'Segoe UI'; max-width: 600px; margin: auto; background-color: #87aad0; padding: 30px; border: 1px solid #e0e0e0; border-radius: 12px; box-shadow: 0 4px 8px rgba(0,0,0,0.05);">
                        <div style="text-align: center; margin-bottom: 25px;">
                            <img src="public/istockphoto-1369134714-612x612.jpg" alt="img" style="max-width: 120px; height: auto; border-radius :10px;"/>
                        </div>
                        <h1 style="color: #191a1c; text-align: center; font-size: 28px; margin-bottom: 20px;">Verify Your Email</h1>
                        <p style="font-size: 16px; line-height: 1.6; text-align: center; color: #333333; margin-bottom: 25px;">
                            Thank you for joining our application! To complete your registration and access all features, please use the verification code below.
                        </p>
                        <div style="background-color: #F7F8FA; border-radius: 8px; padding: 20px; margin: 20px 0; text-align: center;">
                            <p style="font-size: 16px; color: #555555; margin-bottom: 10px;">Your verification code is:</p>
                            <p style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #276EF1; margin: 0;">
                                ${otp}
                            </p>
                        </div>
                        <p style="font-size: 16px; line-height: 1.6; text-align: center; color: #333333;">
                            Thank You For Choosing our application.
                        </p>
                    </div>
                `,
            };

            transporter.sendMail(mailOptions, async (error: any) => {
                if (error) {
                    console.log(error.message);
                    return;
                } else {
                    console.log('successful');
                }
            });

            // let token = jwt.sign(
            //     {
            //         email: email,
            //         otp: hashedOtp,
            //         user_role: 'temp',
            //     },
            //     process.env.EMAIL_AUTH_SECRETKEY as string,
            //     (
            //         {
            //             expiresIn: "1.5 m"
            //         }
            //     )
            // );
            return hashedOtp;
        }
        catch (error) {
            console.log(error);

        }


    }
}