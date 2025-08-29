import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";


export const useChatStore = create((set, get) => ({
  messages:[],
  users:[],
  selectedUser: null,
  isUserLoading: false,
  isMessageLoading: false,


  getUsers: async() => {
    set({isUserLoading: true})
    try {
      const res = await axiosInstance.get("/messages/users");
      set({users: res.data});
    } catch (error) {
      toast.error("Error getting users list")
    } finally{
    set({isUserLoading: false})
    }
  },

  getMessages: async(userId) => {
    set({isMessageLoading: true})
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({messages: res.data})
    } catch (error) {
      toast.error("Couldn't load messages something went wrong")
    }finally{
    set({isMessageLoading: false})
    }
  },

  sendMessage: async(messageData) => {
    const {selectedUser, messages} = get();
    try {
      const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
      set({messages:[...messages, res.data]});
    } catch (error) {
      toast.error("Error in sending messages")
    }
  },

  //todo: optimize it later
  setSelectedUser: (selectedUser) => set({selectedUser})
}))