import {Request, Response} from 'express'
import { sellerService } from '../services/seller.service';
import { errorHelper } from '../helpers/error.helper';

export const sellerController = {
    async getAll(req:Request, res:Response){
        try{
            const sellers = await sellerService.getAll()
            res.status(200).json({message:errorHelper.getHelper(sellers.length), data:sellers})
        }catch(error){
            console.log(error);
            res.status(500).json({errorMessage: error})
        }
    },

    async createSeller(req:Request, res:Response){
        try{
            const seller = await sellerService.createSeller(req.body,req.file!.filename);
            res.status(201).json({message:errorHelper.createHelper(seller), data:seller});
        }catch(error){
            console.log(error);
            res.status(500).json({errorMessage: error})
        }
    },

    async getCertificate(req:Request, res:Response){
        try{
            const cert = await sellerService.getCertificate(Number(req.params.id));
            if(cert!=undefined){
                var len = 0;
            }
            else{
                var len = 1;
            }
            res.status(200).json({message:errorHelper.getHelper(len), data:cert});
        }catch(error){
            console.log(error);
            res.status(500).json({errorMessage: error})
        }
    },

    async updateSellerStatus(req:Request, res:Response){
        try{
            const seller = await sellerService.updateSellerStatus(Number(req.params.id), req.body.status);
            res.status(200).json({message:errorHelper.updateHelper(seller[0]), data:seller});
        }catch(error){
            console.log(error);
            res.status(500).json({errorMessage: error})
        }
    },

    async updateSeller(req:Request, res:Response){
        try{
            const seller = await sellerService.updateSeller(Number(req.params.id),req.body);
            res.status(200).json({message:errorHelper.updateHelper(seller[0])});
        }catch(error){
            console.log(error);
            res.status(500).json(error)
        }
    },

    async deleteSeller(req:Request, res:Response){
        try{
            const seller = await sellerService.deleteSeller(Number(req.params.id));
            res.status(200).json({message:errorHelper.deleteHelper(seller)});
        }catch(error){
            console.log(error);
            res.status(500).json(error)
        }
    },
}