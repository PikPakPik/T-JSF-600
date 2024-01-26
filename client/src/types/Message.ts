import { UserMessage } from "./User";

export type Message = {
  _id: string;
  user: UserMessage;
  message: string;
  createdAt: string;
};
