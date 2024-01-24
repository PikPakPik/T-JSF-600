// MessageInput.tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SetStateAction, useState } from "react";

export const MessageInput = ({
  onSendMessage,
}: {
  onSendMessage: (message: string) => void;
}) => {
  const [message, setMessage] = useState("");

  const handleInputChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setMessage(event.target.value);
  };

  const handleButtonClick = () => {
    onSendMessage(message);
    setMessage("");
  };

  return (
    <>
      <Input
        placeholder="Type your message here..."
        value={message}
        onChange={handleInputChange}
      />
      <Button onClick={handleButtonClick}>Send</Button>
    </>
  );
};
