import { SocketContext } from "@/context/SocketContext";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { io } from "socket.io-client";
import SideBarChat from "./chat/SideBarChat";

export const ChatLayout = () => {
  const socket = io("http://localhost:3000", {
    extraHeaders: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    closeOnBeforeunload: true,
  });

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected");
    });

    socket.on("connect_error", (err) => {
      console.log(err);
    });

    socket.on("disconnect", () => {
      console.log("disconnected");
    });
  }, [socket]);

  useEffect(() => {
    socket.on("notification", (rooms) => {
      console.log(rooms);
    });
  });

  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  });

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
