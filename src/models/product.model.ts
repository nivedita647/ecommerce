import { Table, Model, PrimaryKey, AutoIncrement, Column, DataType, CreatedAt, UpdatedAt, DeletedAt, HasMany, HasOne, BelongsTo, ForeignKey } from "sequelize-typescript";
import { Seller_product } from "./seller_product.model";

@Table({ tableName: 'products', timestamps: true, paranoid: true })
export class Product extends Model<Product> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id!: Number;

    @Column({ type: DataType.STRING, allowNull: false })
    name!: string;

    @ForeignKey(()=>Seller_product)
    @Column({ type: DataType.INTEGER })
    seller_product_id!: number;

    @Column({ type: DataType.STRING })
    status!: string;

    @CreatedAt
    @Column({})
    createdAt!: Date;

    @UpdatedAt
    @Column({})
    updatedAt!: Date;

    @DeletedAt
    @Column({})
    deletedAt!: Date;

    @BelongsTo(()=>Seller_product)
    seller_product!:Seller_product
}

// {
//       "name": "new",
//       "seller_product_id": "Seller"
// }