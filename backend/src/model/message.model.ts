import { listUsers } from "./user.model";
import { IUserResume } from "../interfaces/UserResume";

const dataBase = new Map<
  string,
  {
    userInfo: {
      id: string;
      name: string;
      picture: string;
    };
    messages: {
      id: string;
      user: string;
      message: string;
    }[];
  }
>();
const userOnList: any = [];
//populate fake users chat list
listUsers().then((result) => {
  result.data.forEach((user: IUserResume) => {
    userOnList.push(user);
    dataBase.set(user.id, {
      userInfo: {
        id: user.id,
        name: user.name,
        picture: user.picture,
      },
      messages: [],
    });
  });
});
const getUsersChat = () => {
  return userOnList;
};
const getHistory = (userId: string, lastMessageId: string) => {
  const userData = dataBase.get(userId);
  if (!userData) {
    return []; // Usuário não encontrado, retorna um array vazio
  }

  const messages = userData.messages;
  const startIndex = lastMessageId
    ? messages.findIndex((msg) => msg.user === lastMessageId) + 1
    : 0;
  return messages.slice(startIndex, messages.length - 1);
};

const sendMessage = (fromUserId: string, toUserId: string, message: string) => {
  const toUserData = dataBase.get(toUserId);
  if (!toUserData) {
    throw new Error("User not found");
  }
  const fromUserData = dataBase.get(fromUserId);
  if (!fromUserData) {
    throw new Error("User not found");
  }
  const newMessage = {
    id: toUserData.messages.length.toString(),
    user: fromUserId,
    message: message,
  };

  toUserData.messages.push(newMessage);
};
export { getUsersChat, getHistory, sendMessage };
