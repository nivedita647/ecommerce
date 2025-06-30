import { Product } from '../models/product.model';
import { productRepository } from '../repositories/product.repository';

export const productService = {

    async getAll(){
        return await productRepository.getAll();
    },

    // async createProduct(data:Product){
    //     return await productRepository.createProduct(data);
    // },

    async getProductBySellerProductId(id: number){
        return await productRepository.getProductBySellerProductId(id);
    },
    
    async getByStatus(status:string){
        return await productRepository.getByStatus(status);
    }
}