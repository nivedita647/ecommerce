import { loginRepository } from "../repositories/login.repository";
import jwt from 'jsonwebtoken';

export const loginService = {
    async login(userEmail: string, userPwd: string) {
        return await loginRepository.login(userEmail, userPwd);
    },

    async createToken(email: string) {
        const role = await loginRepository.createToken(email);
        let token = jwt.sign(
            {
                email: email,
                role: role
            },
            process.env.AUTH_SECRETKEY as string,
            (
                {
                    expiresIn: 86400
                }
            )
        );
        return token;
    }
}