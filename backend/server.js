const express = require("express");
const dotenv = require("dotenv");
const app = express();
const { chats } = require("./data/data.js");

dotenv.config();

app.get("/test", (req, res) => {
  res.send("up and running");
});

app.get("/second", (req, res) => {
  res.send("muskrake mili thi mujhe zindagi");
});

app.get("/api/chat", (req, res) => {
  res.send(chats);
});

app.get("/api/chat/:id", (req, res) => {
  let chat_id = req?.params?.id;
  const singleChat = chats.find((chat) => chat._id == chat_id);
  res.send(singleChat);
});

const port = process.env.PORT || 5000;

app.listen(port, console.log(`server is running on port ${port}`));
