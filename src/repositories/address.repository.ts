import { Address } from "../models/address.model";
import { DataType } from 'sequelize-typescript';
import { User } from "../models/user.model";

export const addressRepository = {

    async getAll(){
        const data =  await Address.findAll();
        return data
    },

    async createAddress(data:Address){
        return await Address.create(data);
    },

    async getAddressByUserId(id: number){
        return await Address.findAll({where:{user_id_fk: id}})
    },

    async findById(id:number){
        return await Address.findOne({ where: { id: id }, include: { model: User } })
    }
}