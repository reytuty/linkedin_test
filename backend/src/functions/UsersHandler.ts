import { Request, Response } from "express";
import { listUsers } from "../model/user.model";

const UsersHandler = async (req: Request, res: Response) => {
  res.send(await listUsers());
};

export { UsersHandler };
