require("dotenv").config();

//Setup Express with cors
const express = require("express");
const cors = require("cors");
const app = express();
app.set("view engine", "ejs");
app.use(cors());
app.options("*", cors());
app.use(express.json());

//Setup Socket.IO
const { createServer } = require("http");
const { Server } = require("socket.io");
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origins: [
      "https://kakilang-willcwx.vercel.app",
      "https://kakilang-git-main-willcwx.vercel.app",
      "https://kakilang.vercel.app",
      "http://localhost:3000",
      "https://kakilang-server-app.herokuapp.com/getUser",
    ],
  },
});

io.on("connection", (socket) => {
  console.log("Connected:", socket.id);
  socket.on("disconnect", (reason) => {
    console.log("Socket:", socket.id, " disconnected:", reason);
  });
});
io.on("error", (err) => {
  console.log(err);
});

//Setup Routers (Post & Get Requests) in specific webpages
const registerRouter = require("./routes/register");
const loginRouter = require("./routes/login");
const chatboxRouter = require("./routes/chatbox");
const usersRouter = require("./routes/users");
const eventsRouter = require("./routes/events");

app.use((req, res, next) => {
  req.io = io;
  return next();
});

app.use("/register", registerRouter);
app.use("/", loginRouter);
app.use("/message", chatboxRouter);
app.use("/users", usersRouter);
app.use("/events", eventsRouter);

module.exports = httpServer;
