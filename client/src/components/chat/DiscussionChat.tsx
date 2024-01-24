import { useState } from "react";
import { MessageInput } from "./MessageInput";

export const DiscussionChat = ({ socket }: { socket: any }) => {
  const [messages, setMessages] = useState<string[]>([]);

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
