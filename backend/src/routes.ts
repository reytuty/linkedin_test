import express from "express";
import { UsersHandler } from "./functions/UsersHandler";
import { UserDetailHandler } from "./functions/UserDetailHandler";
import { MessagesHandler } from "./functions/MessagesHandler";
import { MessageHistoryHandler } from "./functions/MessageHistoryHandler";
import { MessageSend } from "./functions/MessageSend";

const router = express.Router();

router.get("/users", UsersHandler);
router.get("/user/:id", UserDetailHandler);

router.get("/messages/", MessagesHandler);
router.get("/message/:userId/history/:lastMessageId/", MessageHistoryHandler);
router.post("/message/:userId/send/", MessageSend);

export { router };
