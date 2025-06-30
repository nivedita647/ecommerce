import { Table, Model, PrimaryKey, AutoIncrement, Column, DataType, CreatedAt, UpdatedAt, DeletedAt, HasMany, HasOne, BelongsTo, ForeignKey } from "sequelize-typescript";
import { Role } from "./role.model";
import { Permission } from "./permission.model";

@Table({ tableName: 'role_permission_mappings', timestamps: true, paranoid: true })
export class Role_permission_mapping extends Model<Role_permission_mapping> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id!: Number;

    @ForeignKey(()=>Role)
    @Column({ type: DataType.INTEGER, allowNull: false })
    role_id!: number;
    @BelongsTo(()=>Role)
    role!:Role

    @ForeignKey(()=>Permission)
    @Column({ type: DataType.INTEGER, allowNull: false })
    perms_id!: number;
    @BelongsTo(()=>Permission)
    perms!:Permission

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
