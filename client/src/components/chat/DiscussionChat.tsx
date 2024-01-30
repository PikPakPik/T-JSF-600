import useSocketStore from "@/store/useSocketStore";
import { Message } from "@/types/Message";
import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { MessageChat } from "./MessageChat";
import { MessageInput } from "./MessageInput";

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
        `http://localhost:3000/api/rooms/${roomId}/messages`,
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
    socket?.on("message", (data: any) => {
      if (window.location.pathname === `/chat/${data.room}`) {
        fetchData();
      }
    });
  }, [fetchData, socket]);

  useEffect(() => {
    socket?.on("command:list", (data: any) => {
      const roomsSearch = data.data;

      if (roomsSearch.length === 0) {
        setMessageServer("No rooms found");
      } else {
        setMessageServer(roomsSearch.map((room: any) => room.name).join(", "));
      }
    });
  }, [socket]);

  useEffect(() => {
    socket?.on("command:users", (data: any) => {
      const usersSearch = data.users;

      if (usersSearch.length === 0) {
        setMessageServer("No users found");
      } else {
        setMessageServer(
          usersSearch
            .map((user: any) => user.nickname || user.username)
            .join(", ")
        );
      }
    });
  }, [socket]);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    socket?.emit("command:join", { name: roomName.current });
    socket?.on("notification", (data: any) => {
      if (
        (data.event === "room_join" || data.event === "room_quit") &&
        window.location.pathname === `/chat/${data.room}`
      ) {
        setMessageServer(data.message);
        setTimeout(() => {
          setMessageServer("");
        }, 3000);
      }
    });
  });

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
