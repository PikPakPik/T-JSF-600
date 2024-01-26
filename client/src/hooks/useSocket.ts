import { SocketContext } from "@/context/SocketContext";
import { useContext } from "react";

// Custom hook to access the socket object from child components
export const useSocket = () => useContext(SocketContext);
