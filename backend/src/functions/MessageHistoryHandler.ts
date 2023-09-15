import { Request, Response } from "express";
import { getHistory } from "../model/message.model";

const MessageHistoryHandler = async (req: Request, res: Response) => {
  const history = await getHistory(req.params.userId, req.params.lastMessageId);
  res.send(history);
};

export { MessageHistoryHandler };
