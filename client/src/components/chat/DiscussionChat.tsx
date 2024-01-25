import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MessageInput } from "./MessageInput";

export const DiscussionChat = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const { roomId } = useParams();

  useEffect(() => {
    async function fetchData() {
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
      console.log(data);
    }
    fetchData();
  }, [roomId]);
  const handleSendMessage = (message: string) => {
    setMessages([...messages, message]);
  };

  return (
    <div className="flex flex-col h-full p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <div className="flex flex-col flex-1 mb-4 overflow-y-auto">
        {messages.map((message, index) => (
          <p key={index}>{message}</p>
        ))}
      </div>
      <div className="mt-auto">
        <MessageInput onSendMessage={handleSendMessage} show={true} />
      </div>
    </div>
  );
};
