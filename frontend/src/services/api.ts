import axios from "axios";
const Axios = axios.create({
  baseURL: "http://localhost/",
});

const getUsers = async () => {
  return (await Axios.get("users"))?.data;
};
const userDetail = async (id: string) => {
  return await Axios.get(`user/${id}`);
};
const chatHistory = async (userId: string, lastMessage: string = "0") => {
  return await Axios.get(`message/${userId}/history/${lastMessage}/`);
};
const chatSend = async (userId: string, message: string) => {
  if (message == "") {
    return { success: false };
  }
  return await Axios.post(`message/${userId}/send/`, { message });
};

export { getUsers, userDetail, chatHistory, chatSend };
