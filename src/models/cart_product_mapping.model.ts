import { Table, Model, PrimaryKey, AutoIncrement, Column, DataType, CreatedAt, UpdatedAt, DeletedAt, HasMany, HasOne, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Cart } from "./cart.model";
import { Seller_product } from "./seller_product.model";

@Table({ tableName: 'cart_product_mappings', timestamps: true, paranoid: true })
export class Cart_product_mapping extends Model<Cart_product_mapping> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id!: Number;

    @ForeignKey(()=>Cart)
    @Column({ type: DataType.INTEGER, allowNull: false })
    cart_id!: number;
    @BelongsTo(()=>Cart)
    cart!: Cart

    @ForeignKey(()=>Seller_product)
    @Column({ type: DataType.INTEGER, allowNull: false })
    seller_product_id!: number;
    @BelongsTo(()=>Seller_product)
    seller_product!:Seller_product

    @CreatedAt
    @Column({})
    createdAt!: Date;

    @UpdatedAt
    @Column({})
    updatedAt!: Date;

    @DeletedAt
    @Column({})
    deletedAt!: Date;
}