import { create } from "zustand";


export const useChatStore = create((set) => ({
  messages:[],
  users:[],
  selectedUser: null,
  isUserLoading: false,
  isMessageLoading: false,

  getUsers
}))