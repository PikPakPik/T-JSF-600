import { NextFunction, Request, Response } from 'express';
import PrivateMessage from '../entity/PrivateMessage.entity';
import Room from '../entity/Room.entity';
import User from '../entity/User.entity';

export const get = async (req: Request, res: Response, next: NextFunction) => {
    const rooms = await Room.find();
    return res.status(200).json({
        success: true,
        rooms: rooms
    });
}

export const getMessages = async (req: Request, res: Response, next: NextFunction) => {
    const query = User.findById(req.params.userId);
    const toUser = await query.exec();

    if (!toUser) {
        return res.status(404).json({
            success: false,
            message: "user.not_found"
        });
    }

    const currentDate = new Date();
    const startDate = new Date(currentDate);
    startDate.setDate(startDate.getDate() - 2);
    startDate.setHours(0, 0, 0, 0);
    
    const endDate = new Date(currentDate);
    endDate.setHours(23, 59, 59, 999);
    
    const query1 = PrivateMessage.find({
        $or: [ { toUser: req.params.userId, fromUser: req.body.user }, { toUser: req.body.user, fromUser: req.params.userId } ],
        createdAt: {
            $gte: startDate.toISOString(),
            $lte: endDate.toISOString()
        }
    }).sort({ createdAt: 1 }).populate('fromUser', ['username', 'nickname']).populate('toUser', ['username', 'nickname']);

    const messages = await query1.exec();

    return res.status(200).json({
        success: true,
        userParam: {
            _id: req.params.userId,
            username: toUser.username,
            nickname: toUser.nickname
        },
        isPrivate: true,
        messages: messages
    });
}
