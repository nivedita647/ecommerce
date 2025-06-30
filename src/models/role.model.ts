import { Table, Model, PrimaryKey, AutoIncrement, Column, DataType, CreatedAt, UpdatedAt, DeletedAt, HasMany, HasOne, BelongsTo, ForeignKey, BelongsToMany } from "sequelize-typescript";
import { Role_permission_mapping } from "./role_permission_mapping.model";
import { Permission } from "./permission.model";
import { User } from "./user.model";

@Table({ tableName: 'roles', timestamps: true, paranoid: true })
export class Role extends Model<Role> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id!: Number;

    @Column({ type: DataType.STRING, allowNull: false })
    role_name!: string;

    @CreatedAt
    @Column({})
    createdAt!: Date;

    @UpdatedAt
    @Column({})
    updatedAt!: Date;

    @DeletedAt
    @Column({})
    deletedAt!: Date;

    @HasMany(()=>User)
    user!:User

    @HasMany(()=>Role_permission_mapping)
    role_perms!:Role_permission_mapping

    @BelongsToMany(()=>Permission, ()=>Role_permission_mapping)
    perms!:Permission
}
