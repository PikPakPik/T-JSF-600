import "reflect-metadata"
import { DataSource } from "typeorm";

export const dbSource = new DataSource({
    type: "mongodb",
    host: process.env.DATABASE_HOST,
    port: 27017,
    database: process.env.DATABASE_NAME,
    //entities: [],
    logging: true,
    synchronize: true,
})