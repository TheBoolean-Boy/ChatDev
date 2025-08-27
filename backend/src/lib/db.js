import mongoose from "mongoose"

export const connectDB = async() => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB connnected at ${conn.connection.host}`)
  } catch (error) {
    console.log(`Error Connecting to DB: ${error.message}`)
    process.exit(1)
  }
}