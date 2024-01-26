import { Request, Response, NextFunction } from 'express';
import {validationPipe} from "../util/validationPipe.util";
import {ValidationErrorException} from "../exception/ValidationError.exception";
import {UserDTO, UserPasswordDTO} from "../dto/user.dto";
import User from "../entity/User.entity";
import bcrypt from "bcrypt";

export const me = async (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({
        success: true,
        data: req.body.user
    });
}

export const updateData = async (req: Request, res: Response, next: NextFunction) => {
    const result = await validationPipe(UserDTO, {...req.body})
    if (result instanceof ValidationErrorException) {
        return res.status(400).json({ success: false, message: result.message, errors: result.getErrors() });
    }

    if (result.username === req.body.user.username && result.email === req.body.user.email) {
        return res.status(200).json({
            success: true,
            message: "user.not_updated",
        });
    }

    const query = User.where({
        $or: [
            { username: result.username },
            { email: result.email }
        ],
        _id: { $ne: req.body.user._id }
    });
    const searchUser = await query.findOne();

    if (searchUser) {
        return res.status(409).json({
            error: 'Conflict',
            code: 409,
            message: 'user.credentials.already_in_use',
        });
    }

    await User.findOneAndUpdate({ _id: req.body.user._id }, {
        username: result.username,
        email: result.email,
        updatedAt: new Date().toISOString()
    });

    return res.status(200).json({
        success: true,
        message: "user.updated"
    });
}

export const updatePassword = async (req: Request, res: Response, next: NextFunction) => {
    const result = await validationPipe(UserPasswordDTO, {...req.body})
    if (result instanceof ValidationErrorException) {
        return res.status(400).json({ success: false, message: result.message, errors: result.getErrors() });
    }

    const query = User.where( {_id: req.body.user.id });
    const user = await query.findOne();

    if (!user) {
        return res.status(404).json({
            error: 'Not Found',
            code: 404,
            message: 'user.not_found',
        });
    }

    const passwordMatch = await bcrypt.compare(result.currentPassword, user.password);
    if (!passwordMatch) {
        return res.status(403).json({
            error: 'Forbidden',
            code: 403,
            message: 'user.credentials.wrong_password',
        });
    }

    await User.findOneAndUpdate({ _id: user._id }, {
        password: bcrypt.hashSync(result.newPassword, 10),
        updatedAt: new Date().toISOString()
    });

    return res.status(200).json({
        success: true,
        message: "user.password_updated"
    });
}

export const getConnectedUsers = async (req: Request, res: Response, next: NextFunction) => {
    const users = await User.find({ socketId: { $ne: null } }).select(["-password", "-email"]);

    return res.status(200).json({
        success: true,
        users: users
    });
}