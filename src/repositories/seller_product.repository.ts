import { Op } from 'sequelize';
import { Seller_product } from '../models/seller_product.model';
import { sequelize } from '../config/dbConnection';
import { Category } from '../models/category.model';

export const seller_productRepository = {

    async getAll() {
        const data = await Seller_product.findAll();
        return data
    },

    async getById(id: number) {
        return await Seller_product.findOne({ where: { id: id } })
    },

    async createSeller_product(data: Seller_product) {
        return await Seller_product.create(data);
    },

    async getSeller_productBySellerId(id: number) {
        return await Seller_product.findAll({ where: { seller_id: id } })
    },

    async getSeller_productByCategory(id: number) {
        return await Seller_product.findAll({ where: { category_id: id } })
    },

    async getStock(id: number) {
        const product = await Seller_product.findByPk(id);
        if (product) {
            return product.quantity;
        }
        else {
            return (-1)
        }
    },

    async get(name: string, category: number, max: number, min: number, orderBy: string, page: number) {

        if (name != 'un') {
            if (category != 0) {
                return await Seller_product.findAll({
                    where: {
                        [Op.and]: [
                            { name: name },
                            { category_id: category },
                            {
                                discounted_price: {
                                    [Op.gte]: min,
                                    [Op.lte]: max
                                }
                            }
                        ]
                    },
                    order: sequelize.col(`${orderBy}`),
                    offset: (page * 5) - 5,
                    limit: 5
                });
            }
            else {
                return await Seller_product.findAll({
                    where: {
                        [Op.and]: [
                            { name: name },
                            {
                                discounted_price: {
                                    [Op.gte]: min,
                                    [Op.lte]: max
                                }
                            }
                        ]
                    },
                    order: sequelize.col(`${orderBy}`),
                    offset: (page * 5) - 5,
                    limit: 5
                });
            }
        }
        else {
            if (category != 0) {
                return await Seller_product.findAll({
                    where: {
                        [Op.and]: [
                            { category_id: category },
                            {
                                discounted_price: {
                                    [Op.gte]: min,
                                    [Op.lte]: max
                                }
                            }
                        ]
                    },
                    order: sequelize.col(`${orderBy}`),
                    offset: (page * 5) - 5,
                    limit: 5
                });
            }
            else {
                return await Seller_product.findAll({
                    where: {
                        [Op.and]: [
                            {
                                discounted_price: {
                                    [Op.gte]: min,
                                    [Op.lte]: max
                                }
                            }
                        ]
                    },
                    order: sequelize.col(`${orderBy}`),
                    offset: (page * 5) - 5,
                    limit: 5
                });
            }
        }

        // return await Seller_product.findAll({
        //     where:{
        //         [Op.and] : [
        //             {category_id:category},
        //             {discounted_price:{
        //                 [Op.gte]:min,
        //                 [Op.lte]:max
        //             }}
        //         ]
        //     },
        //     // order:[`${orderBy}`,'ASC']
        //     order: sequelize.col(`${orderBy}`)
        // });
    },
    async globalSearch(name: string, max: number, min: number, sort: string, orderBy: string, pagenum: number, records: number,) {

        // return await Seller_product.findAll({
        //     order: [[`${sort}`, `${orderBy}`]],
        //     offset: (pagenum * records) - records,
        //     limit: records,

        //     include: [{
        //         model: Category,
        //         required: false,
        //     }],

        //     where: {
        //         [Op.or]: [
        //             {
        //                 name: {
        //                     [Op.iLike]: `%${name}%`
        //                 }
        //             },
        //             {
        //                 description: {
        //                     [Op.iLike]: `%${name}%`
        //                 }
        //             },
        //             {
        //                 '$category.name$': {
        //                     [Op.iLike]: `%${name}%`
        //                 }
        //             }
        //         ],

        //         [Op.and]: [
        //             {
        //                 discounted_price: {
        //                     [Op.gte]: min,
        //                     [Op.lte]: max
        //                 }
        //             }
        //         ]
        //     },

        // });

        let products: Array<Array<Seller_product>> = [];
        const byName = await Seller_product.findAll({
            order: [[`${sort}`, `${orderBy}`]],
            where: {
                name: {
                    [Op.iLike]: `%${name}%`
                },
                [Op.and]: [
                    {
                        discounted_price: {
                            [Op.gte]: min,
                            [Op.lte]: max
                        }
                    }
                ]
            },
        });
        products.push(byName);
        const byCat = await Seller_product.findAll({
            order: [[`${sort}`, `${orderBy}`]],
            include: [
                {
                    model: Category,
                    required: false
                }],
            where: {
                [Op.or]: [
                    {
                        '$category.name$': {
                            [Op.iLike]: `%${name}%`
                        }
                    }
                ],
                [Op.and]: [
                    {
                        discounted_price: {
                            [Op.gte]: min,
                            [Op.lte]: max
                        }
                    }
                ]
            },

        });
        products.push(byCat);

        const byDes = await Seller_product.findAll({
            order: [[`${sort}`, `${orderBy}`]],
            where: {
                description: {
                    [Op.iLike]: `%${name}%`
                },
                [Op.and]: [
                    {
                        discounted_price: {
                            [Op.gte]: min,
                            [Op.lte]: max
                        }
                    }
                ]
            },
        });
        products.push(byDes);
        return products;

    },
    async decreaseStock(id: number) {
        const quantity = await seller_productRepository.getStock(id);
        if (quantity > 0) {
            const result = await sequelize.query(`update public.seller_products set quantity = quantity-1 where id=${id}`);
            console.log(result);
        }
    },

    async increaseStock(id: number) {
        const result = await sequelize.query(`update public.seller_products set quantity = quantity+1 where id=${id}`)
    },

    async update(id: number, data: Seller_product) {
        return await Seller_product.update(data, { where: { id: id } })
    },

    async delete(id: number) {
        return await Seller_product.destroy({ where: { id: id } });
    }
}