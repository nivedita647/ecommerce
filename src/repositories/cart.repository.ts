import { sequelize } from "../config/dbConnection";
import { Cart } from "../models/cart.model";

export const cartRepository = {
    async create(id:number){
        const cart = {
            user_id:id
        }
        return await Cart.create(cart as Cart);
    },

    async getByUser(id:number){
        const user = await Cart.findOne({where:{user_id:id}})
        return user?.dataValues.id
    }
}