const express = require("express");
const dotenv = require("dotenv");
const app = express();

// to accept json data
app.use(express.json());

const { chats } = require("./data/data.js");
const connectDB = require("./config/db.js");
const userRoutes = require("./routes/UserRoutes");
const { notFound, errorHandler } = require("./middleware/ErrorHandler");

dotenv.config();

//connect mongo db
connectDB();

app.get("/test", (req, res) => {
  res.send("up and running");
});

app.use("/api/user", userRoutes);

// if no urls matched then this will encounter
app.use(notFound);
app.use(errorHandler);

// app.get("/api/chat", (req, res) => {
//   res.send(chats);
// });

// app.get("/api/chat/:id", (req, res) => {
//   let chat_id = req?.params?.id;
//   const singleChat = chats.find((chat) => chat._id == chat_id);
//   res.send(singleChat);
// });

const port = process.env.PORT || 5000;

app.listen(port, console.log(`server is running on port ${port}`));
