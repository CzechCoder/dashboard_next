import mongoose from "mongoose";

interface Connection {
  isConnected?: mongoose.ConnectionStates;
}

const connection: Connection = {};

export const connectDb = async () => {
  try {
    if (connection.isConnected) return;
    //@ts-ignore
    const db = await mongoose.connect(process.env.MONGO);
    connection.isConnected = db.connections[0].readyState;
  } catch (error) {
    console.log(error);
  }
};
