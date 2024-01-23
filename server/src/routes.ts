import express, { Request, Response, NextFunction } from 'express';
import * as loginController from './controller/login.controller';
import * as registerController from './controller/register.controller';
import * as userController from './controller/user.controller';
import mongoose from 'mongoose';
import {isLogged} from "./middleware/express/isLogged.middleware";
const router = express.Router();

mongoose.connect(`mongodb://${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`)
    .then(r => {
        console.log("Database connected");
    }).catch(err => {
        console.log("Database connection error");
        console.log(err);
    });

router.get('/', (req: any, res: any) => {
    res.json({
        status: 200,
        message: "ping"
    });
});

router.post('/login', (req: Request, res: Response, next: NextFunction) => loginController.login(req, res, next));
router.post('/register', (req: Request, res: Response, next: NextFunction) => registerController.register(req, res, next));
router.get('/user', isLogged, (req: Request, res: Response, next: NextFunction) => userController.me(req, res, next));
router.patch('/user', isLogged, (req: Request, res: Response, next: NextFunction) => userController.updateData(req, res, next));
router.put('/user/password', isLogged, (req: Request, res: Response, next: NextFunction) => userController.updatePassword(req, res, next));

export default router;
