import useSocketStore from "@/store/useSocketStore";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import SideBarChat from "./chat/SideBarChat";

export const ChatLayout = () => {
  const { connect, disconnect } = useSocketStore();

  useEffect(() => {
    connect();

    return () => {
      disconnect();
    };
  }, [connect, disconnect]);

  return (
    <div className="flex flex-row h-full overflow-hidden">
      <SideBarChat />
      <div className="flex flex-col w-full h-full mx-6 ">
        <Outlet />
      </div>
    </div>
  );
};
