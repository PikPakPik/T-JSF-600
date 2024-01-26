import { Server, Socket } from "socket.io";
import User from "../entity/User.entity";
import Room from "../entity/Room.entity";

export const nickname = async (io: Server, socket: Socket, arg: any) => {
    const user: any = socket.handshake.query.user;
    if (!(arg instanceof Object)) {
        return socket.emit("command:nickname", { success: false, message: "ws.argument.invalid" })
    }
    if (!arg.hasOwnProperty("nickname")) {
        return socket.emit("command:nickname", { success: false, message: "ws.argument.property_not_found" })
    }
    if (arg.nickname === null || arg.nickname === undefined || arg.nickname === "") {
        await User.findOneAndUpdate({ _id: user._id }, { nickname: null });
        user.nickname = null;
        return socket.emit("command:nickname", { success: true, message: "user.nickname.updated" })
    }
    if (arg.nickname.length === 0) {
        return socket.emit("command:nickname", { success: false, message: "ws.argument.is_empty" })
    }
    if (!arg.nickname.match(/^[a-zA-Z0-9]+$/)) {
        return socket.emit("command:nickname", { success: false, message: "ws.argument.is_not_alphanumeric" })
    }

    if (arg.nickname === user.nickname) {
        return socket.emit("command:nickname", { success: false, message: "user.nickname.not_updated" })
    }

    const query = User.where({
        $or: [
            { username: arg.nickname },
            { nickname: arg.nickname }
        ],
        _id: { $ne: user._id }
    });
    const searchUser = await query.findOne();

    if (searchUser) {
        return socket.emit("command:nickname", { success: false, message: "user.nickname.already_in_use" })
    }

    await User.findOneAndUpdate({ _id: user._id }, { nickname: arg.nickname });
    user.nickname = arg.nickname;

    return socket.emit("command:nickname", { success: true, message: "user.nickname.updated" })
}

export const list = async (io: Server, socket: Socket, arg: any) => {
    if (!(arg instanceof Object)) {
        return socket.emit("command:list", { success: false, message: "ws.argument.invalid" })
    }
    if (!arg.hasOwnProperty("query")) {
        return socket.emit("command:list", { success: false, message: "ws.argument.property_not_found" })
    }
    if (arg.query.length === 0) {
        return socket.emit("command:list", { success: false, message: "ws.argument.is_empty" })
    }

    const rooms = await Room.find({ name: { $regex: arg.query, $options: "i" } });

    return socket.emit("command:list", { success: true, data: rooms })
}

export const createRoom = async (io: Server, socket: Socket, arg: any) => {
    console.log("command:create %s", arg);
}

export const deleteRoom = async (io: Server, socket: Socket, arg: any) => {
    console.log("command:delete %s", arg);
}

export const joinRoom = async (io: Server, socket: Socket, arg: any) => {
    console.log("command:join %s", arg);
}

export const quitRoom = async (io: Server, socket: Socket, arg: any) => {
    console.log("command:quit %s", arg);
}

export const users = async (io: Server, socket: Socket, arg: any) => {
    const users = await User.find({ socketId: { $ne: null } }).select(["-password", "-email"]);
    console.log("command:users", users);
}