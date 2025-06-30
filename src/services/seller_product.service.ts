import { Seller_product } from '../models/seller_product.model';
import { productRepository } from '../repositories/product.repository';
import { seller_productRepository } from '../repositories/seller_product.repository';
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});

export const seller_productService = {

    async getAll() {
        return await seller_productRepository.getAll();
    },

    async getById(id: number) {
        return await seller_productRepository.getById(id);
    },

    async createSeller_product(data: Seller_product, files: any) {
        interface photo {
            url: string
        }
        var images: Array<string> = [];
        for (let i = 0; i < files.length; i++) {
            const result: photo = await cloudinary.uploader.upload(`public/uploads/${files[i].filename}`)
            images[i] = result.url;
        }
        data.images = images;
        const seller_product = await seller_productRepository.createSeller_product(data);
        for (let i = 0; i < seller_product.quantity; i++) {
            const product = await productRepository.createProduct(seller_product.name, Number(seller_product.id));
        }
        return seller_product;
    },

    async getSeller_productBySellerId(id: number) {
        return await seller_productRepository.getSeller_productBySellerId(id);
    },

    async getSeller_productByCatgeory(id: number) {
        return await seller_productRepository.getSeller_productByCategory(id);
    },

    async get(name: string, category: number, max: number, min: number, orderBy: string, page: number) {

        if (name === 'undefined') {
            name = 'un';
        }
        if (!category) {
            category = 0
        }
        if (!max) {
            max = 100000
        }
        if (!min) {
            min = 0
        }
        if (orderBy === 'undefined') {
            orderBy = 'name'
        }
        if (!page) {
            page = 1
        }
        return await seller_productRepository.get(name, category, max, min, orderBy, page)
    },
    async globalSearch(name: string, max: number, min: number, sort: string, orderBy: string, pagenum: number, records: number) {

        if (name === 'undefined') {
            name = '';
        }
        if (!max) {
            max = 100000
        }
        if (!min) {
            min = 0
        }
        if (sort === 'undefined') {
            sort = 'discounted_price'
        }
        if (orderBy === 'undefined') {
            orderBy = 'ASC'
        }
        if (!pagenum) {
            pagenum = 1
        }
        if (!records) {
            records = 5
        }
        return await seller_productRepository.globalSearch(name, max, min, sort, orderBy, pagenum, records)
    },
    async update(id: number, data: Seller_product) {
        const result = await seller_productRepository.update(id, data);
        const updatedSellerProduct = await seller_productRepository.getById(id);
        if (updatedSellerProduct) {
            const product = await productRepository.update(Number(updatedSellerProduct.id), updatedSellerProduct.name);
        }
        return result;
    },

    async delete(id: number) {
        return await seller_productRepository.delete(id);
        // const res1 = await productRepository.delete(id)
        // if(res1){
        //     return await seller_productRepository.delete(id);
        // }
    }
}