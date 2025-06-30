import { Product } from '../models/product.model';

export const productRepository = {

    async getAll(){
        const data =  await Product.findAll();
        return data
    },

    async createProduct(name:string, id:number){
        const prod = {
            name:name,
            seller_product_id:id
        }
        return await Product.create(prod as unknown as Product);
    },

    async getProductBySellerProductId(id: number){
        return await Product.findAll({where:{seller_product_id: id}})
    },

    async getByStatus(status:string){
        return await Product.findAll({where:{status:status}})
    },

    async update(id:number,name:string){
        return await Product.update({name:name},{where:{seller_product_id:id}})
    },

    async delete(id:number){
        return await Product.destroy({where:{seller_product_id:id}})
    }
}