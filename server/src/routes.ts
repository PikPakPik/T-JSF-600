import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import * as loginController from './controller/login.controller';
import * as privateMessageController from './controller/privateMessage.controller';
import * as registerController from './controller/register.controller';
import * as roomController from './controller/room.controller';
import * as userController from './controller/user.controller';
import Room from './entity/Room.entity';
import { isLogged } from "./middleware/express/isLogged.middleware";
const router = express.Router();

mongoose.connect(`mongodb://${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`)
    .then(r => {
        console.log("Database connected");
    }).catch(err => {
        console.log("Database connection error");
        console.log(err);
    });

var db = mongoose.connection;
db.once('open', () => {
    Room.findOne({ isDefault: true }).then((room) => {
        if (room) {
            console.log("Default room already exists");
        } else {
            const defaultRoom = new Room({
                name: 'Général',
                isDefault: true,
                createdBy: null,
                createdAt: new Date().toISOString(),
            });

            defaultRoom.save().then(() => {
                console.log("Default room created");
            }).catch(err => {
                console.log("Error creating default room");
                console.log(err);
            });
        }
    }).catch(err => {
        console.log("Error checking default room");
        console.log(err);
    });
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
router.get('/user/connected', isLogged, (req: Request, res: Response, next: NextFunction) => userController.getConnectedUsers(req, res, next));

router.get('/rooms', isLogged, (req: Request, res: Response, next: NextFunction) => roomController.get(req, res, next));
router.get('/rooms/:roomId/messages', isLogged, (req: Request, res: Response, next: NextFunction) => roomController.getMessages(req, res, next));

router.get('/privateMessages/:userId', isLogged, (req: Request, res: Response, next: NextFunction) => privateMessageController.getMessages(req, res, next));

export default router;
