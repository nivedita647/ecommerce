import { Table, Model, PrimaryKey, AutoIncrement, Column, DataType, CreatedAt, UpdatedAt, DeletedAt, HasMany, HasOne, BelongsTo, ForeignKey } from "sequelize-typescript";
import { User } from "./user.model";
import { Seller_product } from "./seller_product.model";

@Table({ tableName: 'sellers', timestamps: true, paranoid: true })
export class Seller extends Model<Seller> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id!: Number;

    @Column({ type: DataType.STRING, allowNull: false })
    gst_num!: string;

    @Column({ type: DataType.STRING, allowNull: false })
    gstin_certificate!: string;

    @ForeignKey(()=>User)
    @Column({ type: DataType.INTEGER })
    user_id!: number;

    @Column({ type: DataType.ENUM('pending','verified','rejected') })
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

    @BelongsTo(()=>User)
    user!:User

    @HasMany(()=>Seller_product)
    seller_product!:Seller_product
}

// {
//       "gst_num": "new",
//       "gstin_certificate": "Seller",
//       "user_id": "url",
//       "status": "new@Seller"
// }