import { Table, Model, PrimaryKey, AutoIncrement, Column, DataType, CreatedAt, UpdatedAt, DeletedAt, BelongsTo, ForeignKey } from "sequelize-typescript";
import { Product } from './product.model';
import { Order } from "./order.model";

@Table({ tableName: 'Order_items', timestamps: true, paranoid: true })
export class Order_item extends Model<Order_item> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id!: Number;

    @ForeignKey(() => Product)
    @Column({ type: DataType.INTEGER, allowNull: false })
    product_id!: number;
    @BelongsTo(() => Product)
    product!: Product;

    @ForeignKey(() => Order)
    @Column({ type: DataType.INTEGER, allowNull: false })
    order_id!: number;
    @BelongsTo(() => Order)
    order!: Order;

    @Column({ type: DataType.INTEGER })
    quantity!: number;

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
//     "Product_id": "14",
//     "payment_id": "abc",
//     "payment_status": "xyz",
//     "status": "bh store"
// }