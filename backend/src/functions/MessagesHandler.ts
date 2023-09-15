import { Request, Response } from "express";
import { listUsers } from "../model/user.model";
import { getUsersChat } from "../model/message.model";

const MessagesHandler = async (req: Request, res: Response) => {
  res.send(getUsersChat());
};

export { MessagesHandler };
