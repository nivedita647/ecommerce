import {Request, Response} from 'express'
import { addressService } from '../services/address.service';
import { errorHelper } from '../helpers/error.helper';

export const addressController = {
    async getAll(req:Request, res:Response){
        try{
            const addresses = await addressService.getAll()
            res.status(200).json({message:errorHelper.getHelper(addresses.length), data:addresses})
        }catch(error){
            console.log(error);
            
            res.status(500).json({errorMessage: error})
        }
    },

    async createAddress(req:Request, res:Response){
        try{
            const address = await addressService.createAddress(req.body);
            res.status(201).json({message:errorHelper.createHelper(address), data:address});
        }catch(error){
            console.log(error);
            
            res.status(500).json({errorMessage: error})
        }
    },

    async getAddressByUserId(req:Request, res:Response){
        try{
            const address = await addressService.getAddressByUserId(Number(req.params.id))
            res.status(200).json({message:errorHelper.getHelper(address.length), data:address});
        }catch(error){
            console.log(error);
            res.status(500).json({errorMessage: error})
        }
    }
}