// useSocketStore.ts
import { io, Socket } from "socket.io-client";
import create from "zustand";

interface SocketState {
  socket: Socket | null;
  connect: () => void;
  disconnect: () => void;
}

const useSocketStore = create<SocketState>((set) => ({
  socket: null,
  connect: () => {
    const socket = io("http://10.29.126.16:3000", {
      extraHeaders: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      closeOnBeforeunload: true,
    });

    socket.on("connect", () => {
      console.log("connected");
      set({ socket });
    });

    socket.on("disconnect", () => {
      console.log("disconnected");
      set({ socket: null });
    });

    socket.on("connect_error", (err) => {
      console.error(err);
    });
  },
  disconnect: () => {
    set((state) => {
      state.socket?.disconnect();
      return { socket: null };
    });
  },
}));

export default useSocketStore;
