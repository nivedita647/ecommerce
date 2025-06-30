import { Table, Model, PrimaryKey, AutoIncrement, Column, DataType, CreatedAt, UpdatedAt, DeletedAt, HasMany, HasOne, BelongsTo, ForeignKey, BelongsToMany } from "sequelize-typescript";
import { Role_permission_mapping } from "./role_permission_mapping.model";
import { Role } from "./role.model";

@Table({ tableName: 'permissions', timestamps: true, paranoid: true })
export class Permission extends Model<Permission> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id!: Number;

    @Column({ type: DataType.STRING, allowNull: false })
    type!: string;

    @CreatedAt
    @Column({})
    createdAt!: Date;

    @UpdatedAt
    @Column({})
    updatedAt!: Date;

    @DeletedAt
    @Column({})
    deletedAt!: Date;

    @HasMany(() => Role_permission_mapping)
    role_perms!: Role_permission_mapping

    @BelongsToMany(()=>Role, ()=>Role_permission_mapping)
    role!:Role
}
