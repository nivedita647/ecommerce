import { Order_product_mapping } from "../models/order_product_mapping";

export const orderProductMapping = {
    async create(product_id:number,order_id:number){
        const item = {
            product_id: product_id,
            order_id: order_id
        }
        return await Order_product_mapping.create(item as unknown as Order_product_mapping)
    }
}