import {Server} from "socket.io"
import http from "http"
import express from "express"


const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"]
  }
})

export function getReceiverSocketId(userId) {
  return userSocketMap[userId]
}
// I am storing onlineUsers here
const userSocketMap = {} // In this format -> userId:socketId'

io.on("connection", (socket) => {
  console.log("A user has connectecd", socket.id);

  const userId = socket.handshake.query.userId;

  if(userId) userSocketMap[userId] = socket.id;

  //io.emit() is used to send events to all the clients on the same server
  io.emit("getOnlineUsers", Object.keys(userSocketMap))

  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  })
})



export {io, app, server};