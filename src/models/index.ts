import { User } from './user.model';
import { Address } from './address.model';
import { Seller } from './seller.model';
import { Category } from './category.model';
import { Product } from './product.model';
import { Seller_product } from './seller_product.model';
import { Order_item } from './order_item.model';
import { Payment } from './payment.model';
import { Admin } from './admin.model';
import { Order } from './order.model';
import { Order_product_mapping } from './order_product_mapping';
import { Cart } from './cart.model';
import { Cart_product_mapping } from './cart_product_mapping.model';
import { Role } from './role.model';
import { Permission } from './permission.model';
import { Role_permission_mapping } from './role_permission_mapping.model';

const SequelizeSimpleCache = require('sequelize-simple-cache');
import { sequelize } from '../config/dbConnection';

export const models = [User, Address, Seller, Category, Product, Seller_product, Order_item, Order, Payment, Admin, Order_product_mapping, Cart, Cart_product_mapping, Role, Permission, Role_permission_mapping];

// export * from '../models/user.model'; // optional: re-export for convenience

const cache = new SequelizeSimpleCache({
    CategoryCached: { ttl: 5 * 60 * 60 }
});
export const CategoryCached = cache.init(Category);