import {Socket} from "socket.io";
import jwt from "jsonwebtoken";
import User from "../../entity/User.entity";

export function isLogged(socket: Socket, next: any) {
    const bearerHeader = socket.handshake.headers.authorization;
    if (typeof bearerHeader === 'undefined') {
        return next(new Error('Forbidden'));
    }

    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    jwt.verify(bearerToken, process.env.JWT_SECRET!, async (err: any, decoded: any) => {
        if (err) {
            return next(new Error('Unauthorized'));
        }

        const query = User.where( {_id: decoded.id });
        const user = await query.findOne().select(['-password']);
        if (!user) {
            return next(new Error('User not found'));
        }

        // if (user.socketId !== null) {
        //     return next(new Error('User already connected'));
        // }

        (socket.handshake.query as any).user = user;
        return next();
    });
}