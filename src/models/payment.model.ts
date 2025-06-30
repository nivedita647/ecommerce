import { Table, Model, PrimaryKey, AutoIncrement, Column, DataType, CreatedAt, UpdatedAt, DeletedAt, BelongsTo, ForeignKey, HasOne } from "sequelize-typescript";
import { Product } from './product.model';
import { Order } from "./order.model";
import { Address } from "./address.model";

@Table({ tableName: 'payments', timestamps: true, paranoid: true })
export class Payment extends Model<Payment> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id!: Number;

    @Column({ type: DataType.FLOAT })
    order_amt!: number;

    @Column({ type: DataType.FLOAT })
    shipping_cost!: number;

    @Column({ type: DataType.STRING })
    mode_of_payment!: string;

    @Column({ type: DataType.STRING })
    payment_status!: string;

    @ForeignKey(()=>Order)
    @Column({ type: DataType.INTEGER })
    order_id!: number;
    @BelongsTo(()=>Order)
    order!:Order

    @Column({ type: DataType.STRING })
    invoice!:string;

    @ForeignKey(()=>Address)
    @Column({ type: DataType.INTEGER })
    address_id!: number;
    @BelongsTo(()=>Address)
    address!:Address

    @CreatedAt
    @Column({})
    createdAt!: Date;

    @UpdatedAt
    @Column({})
    updatedAt!: Date;

    @DeletedAt
    @Column({})
    deletedAt!: Date;

    // @HasOne(()=>Order)
    // order!:Order
}


// {
//     "Product_id": "14",
//     "payment_id": "abc",
//     "payment_status": "xyz",
//     "status": "bh store"
// }