import { Message } from "@/types/Message";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MessageChat } from "./MessageChat";
import { MessageInput } from "./MessageInput";

export const DiscussionChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const { roomId } = useParams();

  const fetchData = useCallback(async () => {
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
    setMessages(data.messages);
  }, [roomId]);

  useEffect(() => {
    fetchData();

    return () => {
      setMessages([]);
    };
  }, [fetchData]);

  const handleSendMessage = (message: string) => {};

  return (
    <div className="flex flex-col h-full p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <div className="flex flex-col flex-1 mb-4 overflow-y-auto">
        {messages.map((message) => (
          <div key={message._id}>
            <MessageChat message={message} />
          </div>
        ))}
      </div>
      <div className="mt-auto">
        <MessageInput onSendMessage={handleSendMessage} show={true} />
      </div>
    </div>
  );
};
