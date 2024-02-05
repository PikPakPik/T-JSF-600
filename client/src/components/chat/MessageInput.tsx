// MessageInput.tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SetStateAction, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

export const MessageInput = ({
  onSendMessage,
  show,
  messageTo
}: {
  onSendMessage: (message: string) => void;
  show: boolean;
  messageTo?: string | null;
}) => {
  const [message, setMessage] = useState("");
  const { t } = useTranslation();

  useEffect(() => {
    if (messageTo !== undefined) {
      setMessage(`/msg ${messageTo} `);
    }
  }, [messageTo]);

  const handleInputChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setMessage(event.target.value);
  };

  const handleButtonClick = () => {
    if(messageTo !== undefined) {
      const [command, messageTo] = message.split(" ");
      if (command === "/msg") {
        onSendMessage(message);
        setMessage(`/msg ${messageTo} `);
      } else {
        toast.error(t("chat.privateMessage.error"));
      }
    } else {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <div className={`${show ? "block" : "hidden"} flex`}>
      <Input
        placeholder={t("chat.message.placeholder")}
        value={message}
        onChange={handleInputChange}
        className="flex-1 mr-2 dark:text-white"
      />
      <Button onClick={handleButtonClick} className="w-76">
        {t("chat.message.send")}
      </Button>
    </div>
  );
};
