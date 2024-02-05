import useSocketStore from "@/store/useSocketStore";
import { Message } from "@/types/Message";
import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { MessageChat } from "./MessageChat";
import { MessageInput } from "./MessageInput";
import { t } from "i18next";

export const DiscussionChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageServer, setMessageServer] = useState<string>();
  const { roomId } = useParams();
  const socket = useSocketStore((state) => state.socket);
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const roomName = useRef<string>("");

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(
        `http://10.29.126.16:3000/api/rooms/${roomId}/messages`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      const data = await response.json();
      roomName.current = data.room.name;
      setMessages(data.messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  }, [roomId]);

  useEffect(() => {
    fetchData();
    return () => {
      setMessages([]);
    };
  }, [fetchData, roomId]);

  useEffect(() => {
    const handleMessage = (data: any) => {
      if (window.location.pathname === `/chat/${data.room}`) {
        fetchData();
      }
    };

    const handleCommandList = (data: any) => {
      const roomsSearch = data.data;
      setMessageServer(
        roomsSearch.length === 0
          ? "No rooms found"
          : roomsSearch.map((room: any) => room.name).join(", ")
      );
    };

    const handleCommandUsers = (data: any) => {
      const usersSearch = data.users;
      setMessageServer(
        usersSearch.length === 0
          ? "No users found"
          : usersSearch
              .map((user: any) => user.nickname || user.username)
              .join(", ")
      );
    };

    const handleNotification = (data: any) => {
      if (
        (data.event === "room_join" || data.event === "room_quit") &&
        window.location.pathname === `/chat/${data.room}`
      ) {
        setMessageServer(t(data.message, { name: data.username }));
        setTimeout(() => {
          setMessageServer("");
        }, 3000);
      }
    };

    socket?.on("message", handleMessage);
    socket?.on("command:list", handleCommandList);
    socket?.on("command:users", handleCommandUsers);
    socket?.on("notification", handleNotification);
    socket;

    return () => {
      socket?.off("message", handleMessage);
      socket?.off("command:list", handleCommandList);
      socket?.off("command:users", handleCommandUsers);
      socket?.off("notification", handleNotification);
    };
  }, [fetchData, socket]);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (message: string) => {
    if (!message) return;
    const [command, ...args] = message.split(" ");
    switch (command.substring(1)) {
      case "join":
        socket?.emit("command:join", { name: args[0] });
        break;
      case "quit":
        socket?.emit("command:quit", { name: args[0] });
        break;
      case "nick":
        socket?.emit("command:nickname", { nickname: args[0] });
        break;
      case "msg":
        socket?.emit("command:msg", { user: args[0], message: args[1] });
        break;
      case "list":
        socket?.emit("command:list", { query: args[0] });
        break;
      case "create":
        socket?.emit("command:create", { name: args[0] });
        break;
      case "delete":
        socket?.emit("command:delete", { name: args[0] });
        break;
      case "users":
        socket?.emit("command:users");
        break;
      default:
        socket?.emit("command:help");
        break;
    }
    if (!message.startsWith("/")) {
      socket?.emit("message", { message, roomId });
      fetchData();
    }
  };

  return (
    <div className="flex flex-col h-full p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <div className="flex flex-col flex-1 mb-4 overflow-y-auto">
        {messages.map((message) => (
          <div key={message._id}>
            <MessageChat message={message} />
            <div ref={lastMessageRef} />
          </div>
        ))}

        {messageServer && (
          <div className="flex items-center justify-center" id="messageServer">
            <div className="px-4 py-2 text-sm text-white bg-gray-500 rounded-lg">
              {messageServer}
            </div>
          </div>
        )}
      </div>
      <div className="mt-auto">
        <MessageInput onSendMessage={handleSendMessage} show={true} />
      </div>
    </div>
  );
};
