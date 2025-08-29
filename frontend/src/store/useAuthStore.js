import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import {io} from "socket.io-client"

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";
// const BASE_URL = "http://localhost:5001"
export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLogginIn: false,
  isUpdatingProfile: false,
  onlineUser: [],
  isCheckingAuth: true,
  socket: null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
      get().connectSocket();

    } catch (error) {
      console.log("Error in checkingAuth", error);
      set({ authUser: null })
    } finally {
      set({ isCheckingAuth: false })
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true })
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data })
      toast.success("Account Created Successfully")

      get().connectSocket()
    } catch (error) {
      console.log("Error creating account");
      toast.error(error.response.data.message)
    } finally {
      set({ isSigningUp: false })
    }
  },

  login: async (data) => {
    set({ isLogginIn: true })
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Logged in successfully");
      get().connectSocket()

    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLogginIn: false })
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      get().disconnectSocket();
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Something went wrong");
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true })
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data })
      toast.success("Profile updated successfully")
    } catch (error) {
      console.log("Error in updating profile", error);
      toast.error(error.response)
    } finally {
      set({ isUpdatingProfile: false })
    }
  },

  connectSocket: () => {
    const {authUser} = get();
    if(!authUser || get().socket?.connected) return;

    const socket = io(BASE_URL, {
      query:{
        userId: authUser._id
      }
    });
    socket.connect();
    set({socket: socket});

    socket.on("getOnlineUsers", (userIds) => {
      set({onlineUser: userIds})
    })
  },

  disconnectSocket: () => {
    
    if(get().socket?.connected) get().socket.disconnect();
  }
}))