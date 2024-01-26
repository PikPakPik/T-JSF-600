import { Server, Socket } from "socket.io";

export const message = async (io: Server, socket: Socket, arg: any) => {
    const user: any = socket.handshake.query.user;
    console.log("message %s", arg);
}