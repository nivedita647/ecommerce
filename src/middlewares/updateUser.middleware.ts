import { Request, Response, NextFunction } from "express";
import { userRepository } from "../repositories/user.repository";
import { request } from "../interfaces/middleware.interface";

// interface request extends Request {
//     useremail: string,
//     endpoint: string,
//     role: string
// }

export const updateUser = {
    async update(req: request, res: Response, next: NextFunction) {
        const user = await userRepository.getId(req.useremail);
        if (user?.role === 'customer') {
            if (req.query.id === String(user?.id)) {
                req.endpoint = 'update_user';
                console.log('pass2');
                
                next();
            }
            else {
                res.status(401).json("cannot edit other user's data")
            }
        }
        else if (user?.role === 'admin') {
            req.endpoint = 'update_user';
            console.log('pass2');

            next();
        }
        else {
            res.status(401).json('pls login as admin or customer')
        }
    }
}