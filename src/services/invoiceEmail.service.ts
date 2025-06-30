const nodemailer = require('nodemailer');
import dotenv from "dotenv";
dotenv.config();

export const invoiceEmailService = {

    async sendEmail(email: string, path: string) {
        try {
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
                subject: "Order Invoice",
                attachments: [{
                    filename: "invoice.pdf",
                    path: path,
                }],
                html: `
                    <div style="font-family: 'Segoe UI'; max-width: 600px; margin: auto; background-color: #87aad0; padding: 30px; border: 1px solid #e0e0e0; border-radius: 12px; box-shadow: 0 4px 8px rgba(0,0,0,0.05);">
                        
                        <h1 style="color: #191a1c; text-align: center; font-size: 28px; margin-bottom: 20px;">Order Completed</h1>
                        <p style="font-size: 16px; line-height: 1.6; text-align: center; color: #333333; margin-bottom: 25px;">
                            Thank you for ordering from us! Your order invoice is attached in this email.
                        </p>
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

        }
        catch (error) {
            console.log(error);

        }


    }
}