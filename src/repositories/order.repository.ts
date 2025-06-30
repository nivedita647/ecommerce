import { Order } from "../models/order.model";

export const orderRepository = {
    async create(data:Order){
        return await Order.create(data);
    },

    async createOrder(user_id:number,address_id:number){
        const order = {
            user_id:user_id,
            address_id:address_id,
            status:'pending'
        }
        return await Order.create(order as Order)
    },

    async checkout(id:number){
        return await Order.update({status:'completed'},{where:{id:id}})
    },

    async getById(id:number){
        return await Order.findAll({where:{id:id}})
    }
}