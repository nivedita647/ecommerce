import { Table, Model, PrimaryKey, AutoIncrement, Column, DataType, CreatedAt, UpdatedAt, DeletedAt, HasMany, HasOne, AfterCreate, Max, Min, IsAlpha, IsDate, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Address } from "./address.model";
import { Seller } from "./seller.model";
import { Cart } from "./cart.model";
import { cartRepository } from "../repositories/cart.repository";
import { Role } from "./role.model";

@Table({ tableName: 'users', timestamps: true, paranoid: true })
export class User extends Model<User> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id!: Number;

    @IsAlpha
    @Column({ type: DataType.STRING, allowNull: false })
    firstName!: string;

    @IsAlpha
    @Column({ type: DataType.STRING })
    lastName!: string;

    @Column({ type: DataType.STRING })
    profile_photo!: string;

    @Column({ type: DataType.STRING })
    email!: string;

    @Column({type: DataType.STRING})
    password!:string;

    @Min(10)
    @Column({ type: DataType.STRING })
    phone!: string;

    @Column({type: DataType.STRING})
    gender!:string;

    @IsDate
    @Column({type: DataType.DATEONLY})
    dob!:Date;

    @Column({type: DataType.ENUM('customer','seller')})
    role!:string;

    @ForeignKey(()=>Role)
    @Column({ type: DataType.INTEGER, allowNull: false })
    role_id!:number
    @BelongsTo(()=>Role)
    roleid!:Role

    @CreatedAt
    @Column({})
    createdAt!: Date;

    @UpdatedAt
    @Column({})
    updatedAt!: Date;

    @DeletedAt
    @Column({})
    deletedAt!: Date;

    @HasMany(()=>Address)
    address!:string;

    @HasOne(()=>Seller)
    seller!:Seller

    @HasOne(()=>Cart)
    cart!:Cart

    @AfterCreate
    static async log(user:User){
        await cartRepository.create(Number(user.id))
    }
}


// {
//     "firstName": "new",
//       "lastName": "user",
//       "profile_photo": "url",
//       "email": "new@user",
//       "password": "hashedpwd",
//       "phone": "1234567890",
//       "gender": "male",
//       "dob": "2001-07-12",
//       "role":"seller"
// }