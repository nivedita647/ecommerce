import { Table, Model, PrimaryKey, AutoIncrement, Column, DataType, CreatedAt, UpdatedAt, DeletedAt, BelongsTo, ForeignKey, HasMany } from "sequelize-typescript";
import { Seller_product } from "./seller_product.model";

@Table({ tableName: 'categories', timestamps: true, paranoid: true })
export class Category extends Model<Category> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id!: Number;

    @Column({ type: DataType.STRING, allowNull: false })
    name!: string;

    @Column({ type: DataType.STRING})
    description!: string;

    @Column({ type: DataType.STRING})
    photo!: string;

    @CreatedAt
    @Column({})
    createdAt!: Date;

    @UpdatedAt
    @Column({})
    updatedAt!: Date;

    @DeletedAt
    @Column({})
    deletedAt!: Date;

    @HasMany(()=>Seller_product)
    seller_product!:Seller_product
}


// {
//     "name": "14",
//     "description": "abc",
//     "photo": "xyz"
// }