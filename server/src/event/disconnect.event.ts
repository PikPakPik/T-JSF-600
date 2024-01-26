import { Server, Socket } from "socket.io";
import User from "../entity/User.entity";

export const disconnect = async (io: Server, socket: Socket) => {
    const user: any = socket.handshake.query.user;
    console.log("Socket disconnected: " + socket.id);
    await User.findOneAndUpdate({ _id: user._id }, { socketId: null });
    socket.broadcast.emit("user_logout", user);
}