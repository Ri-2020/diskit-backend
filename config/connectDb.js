import mongoose from "mongoose";

const connectDB = async (DATABASE_URL) => {
  try {
    const DB_OPTIONS = {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      DbName: "diskit",
    };
    await mongoose.connect(DATABASE_URL, DB_OPTIONS);
    console.log("Database connected successfully");
  } catch (e) {
    console.log(e.message);
  }
};

export default connectDB;
