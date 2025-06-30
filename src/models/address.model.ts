import { Table, Model, PrimaryKey, AutoIncrement, Column, DataType, CreatedAt, UpdatedAt, DeletedAt, BelongsTo, ForeignKey, HasMany } from "sequelize-typescript";
import { User } from "./user.model";
import { Order } from "./order.model";
import { Payment } from "./payment.model";

@Table({ tableName: 'addresses', timestamps: true, paranoid: true })
export class Address extends Model<Address> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id!: Number;

    @Column({ type: DataType.STRING, allowNull: false })
    house_num!: string;

    @Column({ type: DataType.STRING, allowNull: false })
    locality!: string;

    @Column({ type: DataType.STRING, allowNull: false })
    area!: string;

    @Column({ type: DataType.STRING })
    landmark!: string;

    @Column({ type: DataType.STRING, allowNull: false })
    city!: string;

    @Column({ type: DataType.STRING, allowNull: false })
    state!: string;

    @Column({ type: DataType.STRING, allowNull: false })
    address_type!: string;

    @Column({ type: DataType.INTEGER, allowNull: false })
    pincode!: number;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER })
    user_id_fk!: number;
    @BelongsTo(() => User)
    user!: User;

    @CreatedAt
    @Column({})
    createdAt!: Date;

    @UpdatedAt
    @Column({})
    updatedAt!: Date;

    @DeletedAt
    @Column({})
    deletedAt!: Date;

    @HasMany(() => Order)
    order!: Order

    @HasMany(()=>Payment)
    payment!:Payment
}


// {
//     "house_num": "14",
//     "locality": "abc",
//     "area": "xyz",
//     "landmark": "bh store",
//     "city": "ahm",
//     "state": "guj",
//     "address_type": "work",
//     "pincode": "123456",
//     "user_id_fk": "1"
// }