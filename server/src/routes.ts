import express, { Request, Response, NextFunction } from 'express';
import { dbSource } from "./database"
import * as loginController from './controller/login.controller';
const router = express.Router();

router.get('/', (req: any, res: any) => {
    res.json({
        status: 200,
        message: "ping"
    });
});

router.post('/login', (req: Request, res: Response, next: NextFunction) => loginController.login(dbSource, req, res, next));

export default router;
