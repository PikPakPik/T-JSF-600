// DiscussionChat.tsx
import { useState } from "react";
import { MessageInput } from "./MessageInput";

export const DiscussionChat = ({ socket }: { socket: any }) => {
  const [messages, setMessages] = useState<string[]>([]);

  const handleSendMessage = (message: string) => {
    setMessages([...messages, message]);
  };

  return (
    <div>
      {messages.map((message, index) => (
        <p key={index}>{message}</p>
      ))}
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
};
