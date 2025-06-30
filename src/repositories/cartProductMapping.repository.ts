import { Op } from "sequelize";
import { Cart } from "../models/cart.model";
import { Cart_product_mapping } from "../models/cart_product_mapping.model";

export const cartProductMappingRepository = {
    async addItem(cart_id:number,seller_product_id:number){
        const item = {
            cart_id:cart_id,
            seller_product_id: seller_product_id
        }
        return await Cart_product_mapping.create(item as Cart_product_mapping)
    },

    async removeItem(cart_id:number,seller_product_id:number){
        return await Cart_product_mapping.destroy({
            where:{
                [Op.and]:{
                    cart_id:cart_id,
                    seller_product_id:seller_product_id
                }
            }
        })
    },

    async clearCart(id:number){
        return await Cart_product_mapping.destroy({where:{cart_id:id}})
    }
}