import { AfterCreate } from "sequelize-typescript"
import { Order_item } from "../models/order_item.model"
import { sequelize } from "../config/dbConnection"

export const orderItemService = {
    // async create(id:number, data:Order_item){
    //     Order_item.addHook('afterCreate',(orderItem,options)=>{
    //         const amt = 
    //         const payment = sequelize.query(`insert into payments values()`)
    //     })
    // }
}