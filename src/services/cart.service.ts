import { cartProductMappingRepository } from "../repositories/cartProductMapping.repository";
import { seller_productRepository } from "../repositories/seller_product.repository";
import { cartRepository } from "../repositories/cart.repository";
import { orderRepository } from "../repositories/order.repository";
import { sequelize } from "../config/dbConnection";
const cron = require("node-cron");

export const cartService = {
    async addItem(user_id: number, seller_product_id: number) {
        const stock = await seller_productRepository.getStock(seller_product_id);
        if (stock === -1) {
            //product does not exist
            return -1
        }
        else if (stock === 0) {
            return 0
        }
        else {
            const cart_id = await cartRepository.getByUser(user_id);
            if (cart_id) {
                const item = await cartProductMappingRepository.addItem(Number(cart_id), seller_product_id);
                if(item){
                    const result = await seller_productRepository.decreaseStock(seller_product_id);
                    return 1;
                }
                else{
                    //no entry in cartmapping table
                    return -3;
                }
            }
            else {
                //user does not exist
                return -2
            }
        }
    },

    async removeItem(user_id: number, seller_product_id: number) {
        const cart_id = await cartRepository.getByUser(user_id);
        const item = await cartProductMappingRepository.removeItem(Number(cart_id), seller_product_id);
        if(item===1){
            const stock = seller_productRepository.increaseStock(seller_product_id);
        }
        return item
    },

    async placeOrder(user_id:number,address_id:number){
        const order = await orderRepository.createOrder(user_id,address_id);
        return order.id;
    },

    async manageStock(){
        const t = await sequelize.transaction();
        try{
            const today = new Date();
            const items = await sequelize.query(`select * from cart_product_mappings where (${today}-"createdAt")> INTERVAL '48 hours'`);
            interface itemInter{
                cart_id:number,
                seller_product_id:number
            }
    
            for(const item of items[0]){
                const temp = item as itemInter;
                const result = await cartProductMappingRepository.removeItem(temp.cart_id,temp.seller_product_id);
                if(result===1){
                    const quantity = await seller_productRepository.increaseStock(temp.seller_product_id);
                    await t.commit();
                }
                else{
                    await t.rollback();
                }
            }
        }catch(error){
            console.log(error);
            await t.rollback();
        }
        
    },

    async cronManageStock(){
        cron.schedule('00 00 00 * * *', async function (){
            await cartService.manageStock();
        })
    }
}