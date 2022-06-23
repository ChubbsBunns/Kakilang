//Setup .env file to be handled
require("dotenv").config();

//Setup Express with cors
const express = require("express");
const cors = require("cors");
const app = express();
app.set("view engine", "ejs");
app.use(cors());
app.options("*", cors());
app.use(express.json());

//Setup mongoose
const mongoose = require("mongoose");

//setup mongoDB connection
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewURLParser: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

//Setup Server Port
const port = process.env.PORT || 2500;

//Setup Socket.IO
const { createServer } = require("http");
const { Server } = require("socket.io");
const httpServer = createServer(app);
//const server = process.env.WHITELIST;
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
app.use((req, res, next) => {
  req.io = io;
  return next();
});

app.use("/register", registerRouter);
app.use("/", loginRouter);
app.use("/message", chatboxRouter);
app.use("/users", usersRouter);
app.use("/uploads", express.static("uploads"));

//@TODO Unsure how to translate this to a file
app.get("/getUser", verifyJWT, (req, res) => {
  res.json({
    isLoggedIn: true,
    email: req.user.email,
    name: req.user.name,
    img: req.user.img,
  });
});

//start the server
httpServer.listen(port, () => {
  console.log(`Server is running on port : ${port}`);
});

//JWT setup
const jwt = require("jsonwebtoken");

function verifyJWT(req, res, next) {
  const token = req.headers["x-access-token"]?.split("Bearer")[1];
  if (token) {
    //console.log("Verifying");
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.json({
          isLoggedIn: false,
          message: "Failed to Authenticate",
        });
      }
      req.user = {};
      req.user.id = decoded.id;
      req.user.email = decoded.email;
      req.user.name = decoded.name;
      req.user.img = decoded.img;
      next();
    });
  } else {
    res.json({ message: "Incorrect Token Given", isLoggedIn: false });
  }
}
