// MessageInput.tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SetStateAction, useState } from "react";
import { useTranslation } from "react-i18next";

export const MessageInput = ({
  onSendMessage,
  show,
}: {
  onSendMessage: (message: string) => void;
  show: boolean;
}) => {
  const [message, setMessage] = useState("");
  const { t } = useTranslation();

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
        placeholder={t("chat.message.placeholder")}
        value={message}
        onChange={handleInputChange}
        className="flex-1 mr-2 "
      />
      <Button onClick={handleButtonClick} className="w-76">
        {t("chat.message.send")}
      </Button>
    </div>
  );
};
