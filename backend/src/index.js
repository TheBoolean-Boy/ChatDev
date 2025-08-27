import express from "express";
import dotenv from "dotenv"
import authRoutes from "./routes/auth.route.js";

const app = express();
dotenv.config();

const PORT = process.env.PORT;
app.use("/api/auth", authRoutes)

app.listen(PORT, () => {
  console.log("Server in running on PORT:" +PORT)
})