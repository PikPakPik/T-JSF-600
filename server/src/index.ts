import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import { myDataSource } from "./database"

myDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err: any) => {
        console.error("Error during Data Source initialization:", err)
    })

const app = express();
app.use(express.json());

app.get('/', (req: any, res: any) => {
    res.json({
        status: 200,
        message: "ping"
    });
});

app.listen(process.env.APP_PORT, () => {
    console.log(`Server running at http://localhost:${process.env.APP_PORT}`);
});