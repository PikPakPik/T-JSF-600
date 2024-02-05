import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { createServer } from "node:http";
import { Server, Socket } from "socket.io";
import User from "./entity/User.entity";
import * as commandEvent from "./event/command.event";
import * as disconnectEvent from "./event/disconnect.event";
import * as messageEvent from "./event/message.event";
import { isLogged } from "./middleware/websocket/isLogged.middleware";
dotenv.config();
import routes from './routes';

const app = express();

const httpServer = createServer(app);
app.use(express.json());
app.use(cors());
app.use("/api", routes);

const io = new Server(httpServer);
io.engine.use(cors());
io.use(async (socket: Socket, next) => { isLogged(socket, next); });

io.on("connection", async (socket: Socket) => {
    const user: any = socket.handshake.query.user;
    console.log("Socket connected: " + socket.id);
    await User.findOneAndUpdate({ _id: user._id }, { socketId: socket.id });
    socket.broadcast.emit("notification", {
        event: "user_login",
        user: user
    });

    socket.on("message", (arg: any) => { messageEvent.message(io, socket, arg) });

    socket.on("command:nickname", (arg: any) => { commandEvent.nickname(io, socket, arg) });

    socket.on("command:list", (arg: any) => { commandEvent.list(io, socket, arg) });

    socket.on("command:create", (arg: any) => { commandEvent.createRoom(io, socket, arg) });

    socket.on("command:delete", (arg: any) => { commandEvent.deleteRoom(io, socket, arg) });

    socket.on("command:join", (arg: any) => { commandEvent.joinRoom(io, socket, arg) });

    socket.on("command:quit", (arg: any) => { commandEvent.quitRoom(io, socket, arg) });

    socket.on("command:users", (arg: any) => { commandEvent.users(io, socket, arg) });

    socket.on("command:msg", (arg: any) => { commandEvent.privateMessage(io, socket, arg) });

    socket.on("disconnect", () => { disconnectEvent.disconnect(io, socket) });
});

httpServer.listen(process.env.APP_PORT, () => {
    console.log(`Server running at http://localhost:${process.env.APP_PORT}`);
});
