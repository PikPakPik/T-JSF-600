import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useSocket } from "@/hooks/useSocket";
import { Room } from "@/types/Room";
import { User } from "@/types/User";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

export default function SideBarChat() {
  const [roomsDefault, setRoomsDefault] = useState<Room[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const { t } = useTranslation();
  const socket = useSocket();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:3000/api/rooms", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      const data = await response.json();

      const defaultRooms = data.rooms.filter((room: Room) => room.isDefault);
      const nonDefaultRooms = data.rooms.filter(
        (room: Room) => !room.isDefault
      );

      setRoomsDefault(defaultRooms);
      setRooms(nonDefaultRooms);
    }

    fetchData();

    async function fetchConnectedUsers() {
      const response = await fetch("http://localhost:3000/api/user/connected", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      const data = await response.json();

      const filteredUsers = data.users.filter(
        (userL: User) => userL._id !== user?._id
      );

      setUsers(filteredUsers);
    }

    fetchConnectedUsers();

    socket?.on("notification", (data: any) => {
      if (data.event === "room_create") {
        fetchData();
      } else if (data.event === "room_delete") {
        fetchData();
      }
    });
  }, [socket, user]);

  const handleJoinRoom = async (room: Room) => {
    navigate(`/chat/${room._id}`);
  };

  useEffect(() => {
    socket?.on("command:join", (data: any) => {
      const updatedRooms = rooms.map((room: Room) => {
        if (room._id === data.room) {
          return { ...room, isJoined: true };
        }
        return room;
      });
      setRooms(updatedRooms);
    });
    socket?.on("command:quit", (data: any) => {
      const updatedRooms = rooms.map((room: Room) => {
        if (room._id === data.room) {
          return { ...room, isJoined: false };
        }
        return room;
      });
      setRooms(updatedRooms);
    });
  }, [rooms, socket]);

  return (
    <div
      key="1"
      className="flex flex-col w-64 h-full bg-gray-100 dark:bg-gray-800"
    >
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <Link to="/chat">
            <Button className="w-full mb-4" variant={"outline"}>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {t("chat.home")}
              </span>
            </Button>
          </Link>
          <h3 className="mb-2 text-sm font-semibold text-gray-500 dark:text-gray-400">
            {t("chat.rooms")}
          </h3>
          <ul className="flex flex-col space-y-2">
            {roomsDefault.map((room: Room) => (
              <li
                className="flex items-center space-x-2 hover:cursor-pointer"
                onClick={() => handleJoinRoom(room)}
                key={room._id}
              >
                <span className="block w-2 h-2 bg-green-500 rounded-full"></span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {room.name}
                </span>
              </li>
            ))}
            {rooms.map((room: Room) => (
              <li
                className="flex items-center space-x-2 hover:cursor-pointer"
                onClick={() => handleJoinRoom(room)}
                key={room._id}
              >
                <span
                  className={`block w-2 h-2 rounded-full ${
                    room.isJoined ? "bg-green-500" : "bg-gray-500"
                  }`}
                ></span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {room.name}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="p-4">
          <h3 className="mb-2 text-sm font-semibold text-gray-500 dark:text-gray-400">
            {t("chat.users")}
          </h3>
          <ul className="space-y-2">
            {users.map((user: User) => (
              <li className="flex items-center space-x-2" key={user._id}>
                <Avatar className="w-6 h-6">
                  <AvatarImage
                    alt="User Avatar"
                    src="/placeholder-avatar.jpg"
                  />
                  <AvatarFallback className="dark:text-white">
                    {user.nickname === null
                      ? user.username.substring(0, 2)
                      : user.nickname.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {user.nickname ? user.nickname : user.username}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
