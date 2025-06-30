import { Address } from '../models/address.model';
import { addressRepository } from '../repositories/address.repository';

export const addressService = {

    async getAll(){
        return await addressRepository.getAll();
    },

    async createAddress(data:Address){
        return await addressRepository.createAddress(data);
    },

    async getAddressByUserId(id: number){
        return await addressRepository.getAddressByUserId(id);
    }
}