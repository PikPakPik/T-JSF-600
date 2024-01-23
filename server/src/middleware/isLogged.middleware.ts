import {NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken";
import User from "../entity/User.entity";

export function isLogged(req: Request, res: Response, next: NextFunction) {
    const bearerHeader = req.header('Authorization');
    if (typeof bearerHeader === 'undefined') {
        return res.status(403).json({
            status: 403,
            message: "Forbidden"
        });
    }

    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    jwt.verify(bearerToken, process.env.JWT_SECRET!, async (err: any, decoded: any) => {
        if (err) {
            return res.status(401).json({
                status: 401,
                message: "Unauthorized"
            });
        }

        const query = User.where( {_id: decoded.id });
        const user = await query.findOne().select(['-password']);
        if (!user) {
            return res.status(401).json({
                status: 403,
                message: "User not found"
            });
        }

        req.body.user = user;
        return next();
    });
}