import { SocketContext } from "@/context/SocketContext";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { io } from "socket.io-client";
import SideBarChat from "./chat/SideBarChat";

export const Chat = () => {
  const socket = io("http://localhost:3000", {
    extraHeaders: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return (
    <SocketContext.Provider value={socket}>
      <div className="flex flex-row h-full overflow-hidden">
        <SideBarChat />
        <div className="flex flex-col w-full h-full mx-6 ">
          <Outlet />
        </div>
      </div>
    </SocketContext.Provider>
  );
};