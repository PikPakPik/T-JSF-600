import express, { Request, Response, NextFunction } from 'express';
import {createServer} from "node:http";
import {Server, Socket} from "socket.io";
import dotenv from 'dotenv';
dotenv.config();
import routes from './routes';
import cors from 'cors';
import {isLogged} from "./middleware/websocket/isLogged.middleware";

const app = express();

const httpServer = createServer(app);
app.use(express.json());
app.use(cors());
app.use("/api", routes);

const io = new Server(httpServer);
io.engine.use(cors());
io.use(async (socket: Socket, next) => { isLogged(socket, next); });
io.on("connection", (socket: Socket) => {
    const user: any = socket.handshake.query.user;
    console.log("Socket connected: " + socket.id);

    socket.on("disconnect", () => {
        console.log("Socket disconnected: " + socket.id);
    });
});

httpServer.listen(process.env.APP_PORT, () => {
    console.log(`Server running at http://localhost:${process.env.APP_PORT}`);
});
