import { Table, Model, PrimaryKey, AutoIncrement, Column, DataType, CreatedAt, UpdatedAt, DeletedAt, HasMany, HasOne } from "sequelize-typescript";

@Table({ tableName: 'admins', timestamps: true, paranoid: true })
export class Admin extends Model<Admin> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id!: Number;

    @Column({ type: DataType.STRING, allowNull: false })
    username!: string;

    @Column({ type: DataType.STRING, allowNull: false })
    password!: string;

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
//       "username": "new",
//       "password": "user",
// }