import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
dotenv.config();

export const otpService = {
    async verifyOtp(userOtp: string, hashedOtp: string) {
        const result = await bcrypt.compare(userOtp, hashedOtp);
        return result;
    }
}