import { Seller } from '../models/seller.model';

export const sellerRepository = {
    async getAll(){
        return await Seller.findAll();
    },

    async getSeller(id:number){
        return await Seller.findByPk(id)
    },

    async getById(id:number){
        return await Seller.findOne({where:{user_id:id}})
    },

    async createSeller(data: Seller){
        return await Seller.create(data)
    },

    async getCertificate(id:number){
        const seller = await Seller.findOne({where:{id:id}});
        const cert = seller?.gstin_certificate;
        return cert;
    },

    async updateSellerStatus(id:number, status:string){
        return await Seller.update({status:status},{where:{id: id}})
    },

    async updateSeller(id:number, data:Seller){
        return await Seller.update(data,{where:{id:id}});
    },

    async deleteSeller(id:number){
        return await Seller.destroy({where:{id:id}})
    }
}