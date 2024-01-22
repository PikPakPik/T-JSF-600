import express from 'express';
import dotenv from 'dotenv'; 
dotenv.config(); 

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(process.env.APP_PORT, () => {
    console.log(`Server running at http://localhost:${process.env.APP_PORT}`);
});