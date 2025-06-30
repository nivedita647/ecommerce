import { sequelize } from "../config/dbConnection";
import { Order } from "../models/order.model";
import { Product } from "../models/product.model";
import { cartRepository } from "../repositories/cart.repository";
import { cartProductMappingRepository } from "../repositories/cartProductMapping.repository";
import { orderRepository } from "../repositories/order.repository";
import { orderProductMapping } from "../repositories/orderProductMapping.repository";
import { paymentRepository } from "../repositories/payment.repository";
import { paymentService } from "./payment.service";

export const orderService = {
    async create(data: Order, product_id: number) {
        const order = await orderRepository.create(data);
        const mapping = await orderProductMapping.create(product_id, Number(order.id));
        return order;
    },

    async addItem(product_id: number, order_id: number) {
        const product = await Product.findByPk(product_id);
        if (product!.status == 'inStock') {
            const result = await orderProductMapping.create(product_id, order_id);
            return true
        }
        else {
            return false;
        }

    },

    async checkout(id: number, address: number, orderId: number) {
        const t = await sequelize.transaction();
        try {
            interface dataInter {
                amt: number
            }
            // const data = await sequelize.query(`select sum(discounted_price) as amt from seller_products where id in (select seller_product_id from public.products where id in (SELECT product_id from public.order_product_mappings where order_id = ${id}))`);
            const cart_id = await cartRepository.getByUser(id);
            const orderamt = await sequelize.query(`SELECT sum(discounted_price) as amt FROM seller_products where id in (SELECT seller_product_id FROM cart_product_mappings where cart_id = ${cart_id})`)
            const payment = await paymentRepository.create(orderId, orderamt[0][0] as dataInter, address);
            // const prods = await sequelize.query(`update products set status='sold' where id in (select product_id from order_product_mappings where order_id=${id})`);
            // const stock = await sequelize.query(`update public.seller_products set quantity = quantity - 1 where quantity > 0 and id in (SELECT seller_product_id FROM public.products where id in (SELECT product_id FROM public.order_product_mappings where order_id = ${id}))`)
            if (payment) {
                if (payment.payment_status === 'completed') {
                    const invoice = await paymentService.generateInvoice(orderId);
                    const order = await orderRepository.checkout(orderId);
                    const result = await cartProductMappingRepository.clearCart(Number(cart_id));
                    await t.commit();
                    return result;
                }
                else{
                    await t.rollback();
                }
            }
            else{
                await t.rollback();
            }
        } catch (error) {
            console.log(error);
        }
    }
}