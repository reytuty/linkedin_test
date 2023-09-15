import { Request, Response } from "express";
import { sendMessage } from "../model/message.model";

const MessageSend = async (req: Request, res: Response) => {
  const id: string = "1";
  try {
    sendMessage(id, req.params.userId!, req.body.message);
  } catch (e: any) {
    return res.status(500).send({ e });
  }
  return res.send({ success: true });
};

export { MessageSend };
