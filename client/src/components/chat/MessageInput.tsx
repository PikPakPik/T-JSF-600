// MessageInput.tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SetStateAction, useState } from "react";

export const MessageInput = ({
  onSendMessage,
  show,
}: {
  onSendMessage: (message: string) => void;
  show: boolean;
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
    <div className={`${show ? "block" : "hidden"} flex`}>
      <Input
        placeholder="Type your message here..."
        value={message}
        onChange={handleInputChange}
        className="flex-1 mr-2 "
      />
      <Button onClick={handleButtonClick} className="w-76">
        Send
      </Button>
    </div>
  );
};
