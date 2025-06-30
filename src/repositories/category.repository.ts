import { Category } from "../models/category.model";
import { CategoryCached } from "../models";

export const categoryRepository = {
    async getAll() {
        // return await Category.findAll();
        console.time("first hit")
        const cats1 = await CategoryCached.findAll();
        console.timeEnd("first hit")
        
        console.time("2nd hit")
        const cats2 = await CategoryCached.findAll();
        console.timeEnd("2nd hit")
        return cats1;
    },

    async create(data: Category) {
        return await Category.create(data);
    },

    async getCategoryByName(name: string) {
        return await Category.findAll({ where: { name: name } })
    },

    async getId(name: string) {
        return await Category.findOne({ where: { name: name } });
    }
}