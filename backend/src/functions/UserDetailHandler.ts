import { Request, Response } from "express";
import { getUser, listUsers } from "../model/user.model";
import { z } from "zod";
const UserDetailHandler = async (req: Request, res: Response) => {
  const schema = z.object({
    id: z.string().min(1),
  });
  const resultParse = schema.safeParse(req.params);
  if (!resultParse.success) {
    return res
      .status(400)
      .send({ success: false, messages: ["please sent id"] });
  }
  const { id } = resultParse.data;
  const user = await getUser(id);
  if (!user) {
    return res
      .status(404)
      .send({ success: false, messages: ["user not found"] });
  }
  res.send(user);
};

export { UserDetailHandler };
