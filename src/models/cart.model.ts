import { Table, Model, PrimaryKey, AutoIncrement, Column, DataType, CreatedAt, UpdatedAt, DeletedAt, HasMany, HasOne, ForeignKey, BelongsTo } from "sequelize-typescript";
import { User } from "./user.model";
import { Cart_product_mapping } from "./cart_product_mapping.model";

@Table({ tableName: 'carts', timestamps: true, paranoid: true })
export class Cart extends Model<Cart> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id!: Number;

    @ForeignKey(()=>User)
    @Column({ type: DataType.INTEGER, allowNull: false })
    user_id!: number;
    @BelongsTo(()=>User)
    user!:User

    @CreatedAt
    @Column({})
    createdAt!: Date;

    @UpdatedAt
    @Column({})
    updatedAt!: Date;

    @DeletedAt
    @Column({})
    deletedAt!: Date;

    @HasMany(()=>Cart_product_mapping)
    cart_product_mapping!:Cart_product_mapping
}
