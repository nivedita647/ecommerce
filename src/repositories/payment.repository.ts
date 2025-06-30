import { sequelize } from "../config/dbConnection";
import { Payment } from "../models/payment.model";
interface dataInter{
    amt:number
}

export const paymentRepository = {
    async create(id:number, amount:dataInter, address:number){
        const t = await sequelize.transaction();
        try{
            const payment = {
                order_amt:amount.amt,
                shipping_cost: 1234,
                mode_of_payment: 'upi',
                payment_status:'completed',
                order_id:id,
                address_id:address
            }
            const pymnt = await Payment.create(payment as Payment,{transaction:t});
            await t.commit();
            return pymnt;
        }catch(error){
            await t.rollback();
        }
        
    },

    async findByOrder(id:number){
        return await Payment.findOne({ where: { order_id: id } });
    }
}