import { Table, Model, PrimaryKey, AutoIncrement, Column, DataType, CreatedAt, UpdatedAt, DeletedAt, BelongsTo, ForeignKey, HasMany, HasOne } from "sequelize-typescript";
import { Order } from "./order.model";
import { Product } from "./product.model";

@Table({ tableName: 'order_product_mappings', timestamps: true, paranoid: true })
export class Order_product_mapping extends Model<Order_product_mapping> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id!: Number;

    @ForeignKey(()=>Product)
    @Column({ type: DataType.INTEGER, allowNull: false })
    product_id!: number;
    @BelongsTo(()=>Product)
    product!:Product;

    @ForeignKey(()=>Order)
    @Column({ type: DataType.INTEGER, allowNull: false })
    order_id!: number;
    @BelongsTo(()=>Order)
    order!:Order

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


// {
//     "user_id": "14",
//     "payment_id": "abc",
//     "payment_status": "xyz",
//     "status": "bh store"
// }