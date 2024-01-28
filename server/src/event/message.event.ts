import { Server, Socket } from "socket.io";
import Message from "../entity/Message.entity";
import Room from "../entity/Room.entity";

export const message = async (io: Server, socket: Socket, arg: any) => {
  const user: any = socket.handshake.query.user;
  if (!(arg instanceof Object)) {
    return socket.emit("message", {
      success: false,
      message: "ws.argument.invalid",
    });
  }
  if (!arg.hasOwnProperty("message") && !arg.hasOwnProperty("roomId")) {
    return socket.emit("message", {
      success: false,
      message: "ws.argument.property_not_found",
    });
  }
  if (
    arg.message === null ||
    arg.message === undefined ||
    (arg.message.length === 0 && arg.roomId === null) ||
    arg.roomId === undefined ||
    arg.roomId.length === 0
  ) {
    return socket.emit("message", {
      success: false,
      message: "ws.argument.is_empty",
    });
  }

  const query = Room.where({ _id: arg.roomId });
  const searchRoom = await query.findOne();

  if (!searchRoom) {
    return socket.emit("message", {
      success: false,
      message: "message.room.not_found",
    });
  }

  const message = new Message();
  message.user = user._id;
  message.message = arg.message;
  message.room = searchRoom._id;
  const lastMessage = await message.save();

  const username = user.nickname ? user.nickname : user.username;
  return socket.to(searchRoom._id.toString()).emit("message", {
    success: true,
    message: arg.message,
    username: username,
    createdAt: lastMessage.createdAt,
  });
};
