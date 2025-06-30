import { Table, Model, PrimaryKey, AutoIncrement, Column, DataType, CreatedAt, UpdatedAt, DeletedAt, HasMany, HasOne, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Seller } from "./seller.model";
import { Product } from "./product.model";
import { Category } from "./category.model";
import { Cart_product_mapping } from "./cart_product_mapping.model";

@Table({ tableName: 'seller_products', timestamps: true, paranoid: true })
export class Seller_product extends Model<Seller_product> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id!: Number;

    @Column({ type: DataType.STRING, allowNull: false })
    name!: string;

    @Column({ type: DataType.STRING })
    description!: string;

    @Column({ type: DataType.STRING })
    details!: string;

    @Column({ type: DataType.ARRAY(DataType.STRING) })
    images!: Array<string>;

    @Column({type: DataType.INTEGER})
    quantity!:number;

    @ForeignKey(()=>Seller)
    @Column({ type: DataType.INTEGER })
    seller_id!:number;

    @BelongsTo(()=>Seller)
    seller!:Seller

    @Column({type: DataType.INTEGER})
    actual_price!:number;

    @Column({type: DataType.INTEGER})
    discounted_price!:number;

    @ForeignKey(()=>Category)
    @Column({type: DataType.INTEGER})
    category_id!:number

    @CreatedAt
    @Column({})
    createdAt!: Date;

    @UpdatedAt
    @Column({})
    updatedAt!: Date;

    @DeletedAt
    @Column({})
    deletedAt!: Date;

    @HasMany(()=>Product)
    product!:Product

    @BelongsTo(()=>Category)
    category!:Category

    @HasMany(()=>Cart_product_mapping)
    cart_product_mapping!:Cart_product_mapping
}

// {
//       "name": "new",
//       "description": "user",
//       "details": "url",
//       "images": "new@user",
//       "quantity": "hashedpwd",
//       "seller_id": "1234567890",
//       "actual_price": "male",
//       "discounted_price": "2001-07-12",
//       "category_id":1
// }