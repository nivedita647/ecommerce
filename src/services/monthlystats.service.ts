// import { adminController } from "../controllers/admin.controller";
// import { Request,Response } from "express";
// import { adminService } from "./admin.service";
// const cron = require("node-cron");
// const nodemailer = require("nodemailer");

// let path:Promise<string>;
// cron.schedule("40 12 18 6 *", function () { 
//     console.log("hiii");
//             //(min 9am 1st eachmonth dayofweek)
//     path = adminService.generateStats()
//     sendMail();
// });

// function sendMail() {
//     let mailTransporter = nodemailer.createTransport({
//         service: "gmail",
//         auth: {
//             user: process.env.EMAIL,
//             pass: process.env.PASSWORD,
//         },
//     });

//     let mailOptions = {
//         from: process.env.EMAIL,
//         to: "nivedita.thakur@esparkbizmail.com",
//         subject: "Monthly Statistics",
//         attachments: [{
//             filename: "stats.pdf",
//             path: path,
//         }],
//         html: `
//             <div style="font-family: 'Segoe UI'; max-width: 600px; margin: auto; background-color: #87aad0; padding: 30px; border: 1px solid #e0e0e0; border-radius: 12px; box-shadow: 0 4px 8px rgba(0,0,0,0.05);">
                
//                 <h1 style="color: #191a1c; text-align: center; font-size: 28px; margin-bottom: 20px;">Your monthly stats are here</h1>
//                 <p style="font-size: 16px; line-height: 1.6; text-align: center; color: #333333; margin-bottom: 25px;">
//                     Thank you for working with us! Your monthly stats is attached in this email.
//                 </p>
//                 <p style="font-size: 16px; line-height: 1.6; text-align: center; color: #333333;">
//                     Thank You For Choosing our application.
//                 </p>
//             </div>
//         `,
//     };


//     // Sending Email
//     mailTransporter.sendMail(mailOptions, async (error: any) => {
//         if (error) {
//             console.log(error.message);
//             return;
//         } else {
//             console.log('successful');
//         }
//     });
// }
import { adminController } from "../controllers/admin.controller";
import { Request,Response } from "express";
import { adminService } from "./admin.service";
const cron = require("node-cron");
const nodemailer = require("nodemailer");



export const monthlystatsService = {

    async sendMail() {
        const path = await adminService.generateStats()
        // console.log("path:",path);
        let mailTransporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            },
        });

        let mailOptions = {
            from: process.env.EMAIL,
            to: "nivedita.thakur@esparkbizmail.com",
            subject: "Monthly Statistics",
            attachments: [{
                filename: "stats.pdf",
                path: path,
            }],
            html: `
                <div style="font-family: 'Segoe UI'; max-width: 600px; margin: auto; background-color: #87aad0; padding: 30px; border: 1px solid #e0e0e0; border-radius: 12px; box-shadow: 0 4px 8px rgba(0,0,0,0.05);">
                    
                    <h1 style="color: #191a1c; text-align: center; font-size: 28px; margin-bottom: 20px;">Your monthly stats are here</h1>
                    <p style="font-size: 16px; line-height: 1.6; text-align: center; color: #333333; margin-bottom: 25px;">
                        Thank you for working with us! Your monthly stats is attached in this email.
                    </p>
                    <p style="font-size: 16px; line-height: 1.6; text-align: center; color: #333333;">
                        Thank You For Choosing our application.
                    </p>
                </div>
            `,
        };
        mailTransporter.sendMail(mailOptions, async (error: any) => {
            if (error) {
                console.log(error.message);
                return;
            } else {
                console.log('successful');
            }
        });

    },

    async cronSchedule(){
        cron.schedule("* 9 1 * *", function () {        //9am 1st of every month
            console.log("hiii");
            monthlystatsService.sendMail();
            //(min 9am 1st eachmonth dayofweek)
            // path = adminService.generateStats()
            // sendMail();
            
        });
    }
}