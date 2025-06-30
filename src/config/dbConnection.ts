import { Sequelize } from "sequelize-typescript";
import { models } from "../models"
import dotenv from "dotenv"
dotenv.config();

export const sequelize = new Sequelize({
    dialect: 'postgres',
    host:process.env.DB_HOST,
    username:process.env.DB_USER,
    password:process.env.DB_PASS,
    database:process.env.DB_NAME,
    models,
    logging:false
});