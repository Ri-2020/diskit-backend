import express from "express";
import connectDB from "./config/connectDb.js";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import discussionRoutes from "./routes/functionalRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;

// Database connect
connectDB(DATABASE_URL);

// body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

app.get("/", (req, res) => {
  res.send("<h1>Hello</h1>");
});
app.use("/api/diskit/", discussionRoutes);

app.listen(port, () => {
  console.log(`server is running at http://locathost:${port}`);
});
