import { sellerRepository } from '../repositories/seller.repository';
import { Seller } from '../models/seller.model';
import { AnalyzeResponse } from 'cloudinary';
import { userRepository } from '../repositories/user.repository';
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});

export const sellerService = {

    async getAll() {
        return await sellerRepository.getAll();
    },

    async createSeller(data: Seller, filename: string) {
        interface cert {
            url: string
        }
        const result: cert = await cloudinary.uploader.upload(`public/uploads/${filename}`)
        data.gstin_certificate = result.url;
        return await sellerRepository.createSeller(data as Seller);
    },

    async getCertificate(id: number) {
        return await sellerRepository.getCertificate(id);
    },

    async updateSellerStatus(id: number, status: string) {
        return await sellerRepository.updateSellerStatus(id, status);
    },

    async updateSeller(id: number, data: Seller) {
        return await sellerRepository.updateSeller(id, data);
    },

    async deleteSeller(id: number) {
        const seller = await sellerRepository.getSeller(id);
        const result = await userRepository.deleteUser(Number(seller!.user_id))
        return await sellerRepository.deleteSeller(id);
    }
}