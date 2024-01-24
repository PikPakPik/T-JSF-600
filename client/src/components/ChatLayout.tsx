import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { io } from "socket.io-client";
import { DiscussionChat } from "./chat/DiscussionChat";
import SideBarChat from "./chat/SideBarChat";

export const Chat = () => {
  const socket = io("http://localhost:3000", {
    extraHeaders: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  useEffect(() => {
    socket.emit("message", "Hello world");
    return () => {
      socket.disconnect();
    };
  }, [socket]);
  return (
    <div className="flex flex-row h-full overflow-hidden">
      <SideBarChat />
      <div className="w-full mx-6 my-6">
        <Outlet />
        <div className="flex flex-col h-full">
          <DiscussionChat socket={socket} />
        </div>
      </div>
    </div>
  );
};
