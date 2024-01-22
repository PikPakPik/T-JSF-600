import { Request, Response, NextFunction } from 'express';
import { validationPipe } from "../util/validationPipe.util";
import { LoginDTO } from "../dto/login.dto";
import { User } from '../entity/User.entity';

export const login = async (dbSource: any, req: Request, res: Response, next: NextFunction) => {

    dbSource
    .initialize()
    .then(async () => {
        const user = new User()
        user.username = "Timber"
        user.email = "Saw"
        user.password = "dddd"
        user.createdAt = new Date()
        user.updatedAt = new Date()
        await dbSource.manager.save(user)
    })

    const result = await validationPipe(LoginDTO, { ...req.body })
    if (result !== true) {
        res.status(400).json({ result: result })
        return;
    }

    res.status(200).json({ token: "1234567890" })
};
