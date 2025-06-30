import { Request, Response } from 'express'
import { seller_productService } from '../services/seller_product.service';
import { categoryRepository } from '../repositories/category.repository';
import { errorHelper } from '../helpers/error.helper';

export const seller_productController = {
    async getAll(req: Request, res: Response) {
        try {
            const seller_products = await seller_productService.getAll()
            res.status(200).json({ message: errorHelper.getHelper(seller_products.length), data: seller_products })
        } catch (error) {
            console.log(error);
            res.status(500).json({ errorMessage: error })
        }
    },

    async createSeller_product(req: Request, res: Response) {
        try {
            const seller_product = await seller_productService.createSeller_product(req.body, req.files);
            res.status(201).json({ message: errorHelper.createHelper(seller_product), data: seller_product });
        } catch (error) {
            console.log(error);

            res.status(500).json({ errorMessage: error })
        }
    },

    async getSeller_productBySellerId(req: Request, res: Response) {
        try {
            const seller_product = await seller_productService.getSeller_productBySellerId(Number(req.params.id));
            res.status(200).json({ message: errorHelper.getHelper(seller_product.length), data: seller_product });
        } catch (error) {
            console.log(error);
            res.status(500).json({ errorMessage: error })
        }
    },

    async getSeller_productByCategory(req: Request, res: Response) {
        try {
            const products = await seller_productService.getSeller_productByCatgeory(Number(req.params.id));
            res.status(200).json({ message: errorHelper.getHelper(products.length), data: products });
        } catch (error) {
            console.log(error);
            res.status(500).json({ errorMessage: error });
        }
    },

    async get(req: Request, res: Response) {
        try {
            if (!req.query.category) {
                const products = await seller_productService.get(String(req.query.name), NaN, Number(req.query.max), Number(req.query.min), String(req.query.sort), Number(req.query.page));
                if (products.length === 0) {
                    res.status(200).json('no product found')
                }
                else {
                    res.status(200).json(products);
                }
            }
            else {
                const cat = await categoryRepository.getId(String(req.query.category));
                if (cat === null) {
                    res.status(200).json('no such category exists');
                }
                else {
                    const products = await seller_productService.get(String(req.query.name), Number(cat.id), Number(req.query.max), Number(req.query.min), String(req.query.sort), Number(req.query.page));
                    res.status(200).json(products);
                }
            }
        } catch (error) {
            console.log(error);
            res.status(500).json(error)
        }
    },
    async globalSearch(req: Request, res: Response) {
        try {
            const products = await seller_productService.globalSearch(String(req.query.name), Number(req.query.max), Number(req.query.min), String(req.query.sort), String(req.query.orderBy), Number(req.query.pagenum), Number(req.query.records));
            if (products.length === 0) {
                res.status(200).json('no product found')
            }
            else {
                res.status(200).json(products);
            }
        } catch (error) {
            console.log(error);
            res.status(500).json(error)
        }
    },
    async update(req: Request, res: Response) {
        try {
            const seller_product = await seller_productService.update(Number(req.params.id), req.body);
            res.status(200).json({ message: errorHelper.updateHelper(seller_product[0]) });
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    },

    async delete(req: Request, res: Response) {
        try {
            const prod = await seller_productService.delete(Number(req.params.id));
            res.status(200).json({ message: errorHelper.deleteHelper(prod) });
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    }
}