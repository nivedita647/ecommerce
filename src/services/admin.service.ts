import { col, fn, Op } from "sequelize";
import { Product } from "../models/product.model";
import { adminRepository } from "../repositories/admin.repository";
import jwt from "jsonwebtoken";
import { productService } from "./product.service";
import { sequelize } from "../config/dbConnection";
import { statspdfService } from "./statspdf.service";

export const adminService = {
    async login(username: string, userPwd: string) {
        return await adminRepository.login(username, userPwd);
    },

    async createToken(username: string) {
        const role = await adminRepository.createToken(username);
        let token = jwt.sign(
            {
                username: username,
                email:'admin',
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
    },
    
    async generateStats() {
        const today = new Date();
        let month = today.getMonth();
        let year = today.getFullYear();
        if(month===0){
            month=12;
            year = year-1;
        }
        
        interface Prods{
            id: number,
            name: string,
            seller_product_id: number,
            status: string
        }

        const allProds = await sequelize.query(`select * from products where status='sold' and extract(month from "createdAt")=${month} and extract(year from "createdAt")=${year}`)
        const temp = allProds[0][0]
        const path =  await statspdfService.generateStats(allProds);
        
        return path;
        // const mn = await sequelize.query(`select extract(month from "createdAt") from products where status = 'sold'`);
    
    }
}