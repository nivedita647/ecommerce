import { Table, Model, PrimaryKey, AutoIncrement, Column, DataType, CreatedAt, UpdatedAt, DeletedAt, BelongsTo, ForeignKey, HasMany, HasOne } from "sequelize-typescript";
import { User } from "./user.model";
import { Order_item } from "./order_item.model";
import { Payment } from "./payment.model";
import { Address } from "./address.model";

@Table({ tableName: 'orders', timestamps: true, paranoid: true })
export class Order extends Model<Order> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id!: Number;

    @ForeignKey(()=>User)
    @Column({ type: DataType.INTEGER, allowNull: false })
    user_id!: number;
    @BelongsTo(()=>User)
    user!:User;

    // @ForeignKey(()=>Payment)
    // @Column({ type: DataType.INTEGER, allowNull: false })
    // payment_id!: number;
    // @BelongsTo(()=>Payment)
    // payment!:Payment

    @ForeignKey(()=>Address)
    @Column({ type: DataType.INTEGER, allowNull: false })
    address_id!: number;
    @BelongsTo(()=>Address)
    address!:Address;

    // @Column({ type: DataType.STRING, allowNull: false })
    // receipt!: string;

    @Column({ type: DataType.ENUM('placed','pending','in-transit','completed','failed')})
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

    @HasOne(()=>Payment)
    payment!:Payment

    // @HasMany(()=>Order_item)
    // order_item!:Order_item;

}


// {
//     "user_id": "14",
//     "payment_id": "abc",
//     "payment_status": "xyz",
//     "status": "bh store"
// }