import { Request, Response, NextFunction } from 'express';
import Room from '../entity/Room.entity';
import Message from '../entity/Message.entity';

export const get = async (req: Request, res: Response, next: NextFunction) => {
    const rooms = await Room.find();
    return res.status(200).json({
        success: true,
        rooms: rooms
    });
}

export const getMessages = async (req: Request, res: Response, next: NextFunction) => {
    const query = Room.findById(req.params.roomId);
    const room = await query.exec();

    if (!room) {
        return res.status(404).json({
            success: false,
            message: "Room not found"
        });
    }

    const currentDate = new Date();
    const startDate = new Date(currentDate);
    startDate.setHours(0, 0, 0, 0);
    
    const endDate = new Date(currentDate);
    endDate.setHours(23, 59, 59, 999);
    
    const query1 = Message.find({
        room: room._id,
        createdAt: {
            $gte: startDate.toISOString(),
            $lte: endDate.toISOString()
        }
    }).sort({ createdAt: 1 }).select(['-room']).populate('user', ['username']);

    const messages = await query1.exec();

    return res.status(200).json({
        success: true,
        room: room,
        messages: messages
    });
}
