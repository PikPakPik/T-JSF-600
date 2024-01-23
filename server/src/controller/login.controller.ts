import { Request, Response, NextFunction } from 'express';
import { validationPipe } from "../util/validationPipe.util";
import { LoginDTO } from "../dto/login.dto";
import User from "../entity/User.entity";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {ValidationErrorException} from "../exception/ValidationError.exception";

export const login = async (req: Request, res: Response, next: NextFunction) => {
    const result = await validationPipe(LoginDTO, { ...req.body })
    if (result instanceof ValidationErrorException) {
        return res.status(400).json({ success: false, message: result.message, errors: result.getErrors() });
    }

    const query = User.where({
        $or: [
            { username: result.username },
            { email: result.username }
        ]
    });
    const user = await query.findOne();

    if (!user) {
        return res.status(403).json({
            error: 'Forbidden',
            code: 403,
            message: 'Invalid username or password',
        });
    }

    const passwordMatch = await bcrypt.compare(result.password, user.password);
    if (!passwordMatch) {
        return res.status(403).json({
            error: 'Forbidden',
            code: 403,
            message: 'Invalid username or password',
        });
    }

    await User.findOneAndUpdate({ _id: user._id }, { lastLogin: new Date().toISOString() });

    let token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET!,
        { expiresIn: '1h' }
    );

    res.status(200).json({ success: true, token: token })
};
