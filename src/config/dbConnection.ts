import { Sequelize } from "sequelize-typescript";
import { models } from "../models"
import dotenv from "dotenv";
dotenv.config();

let seq;

if (process.env.DB_URL) {
    seq = new Sequelize(process.env.DB_URL);
    seq.addModels(models)
}
else{
    seq = new Sequelize({
        dialect: 'postgres',
        host:process.env.DB_HOST,
        username:process.env.DB_USER,
        password:process.env.DB_PASS,
        database:process.env.DB_NAME,
        models,
        logging:false
    })
}

export const sequelize = seq;
console.log(sequelize);

// export const sequelize = new Sequelize({
//     dialect: 'postgres',
//     host:process.env.DB_HOST,
//     username:process.env.DB_USER,
//     password:process.env.DB_PASS,
//     database:process.env.DB_NAME,
//     models,
//     logging:false
// });