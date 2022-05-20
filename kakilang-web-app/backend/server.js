//setup middle ware to connect to database
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json());

//setup mongoDB connection
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewURLParser: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

//Setup Server Port
const port = process.env.PORT || 2500;

//Setup Routers (Post & Get Requests) in specific webpages
const registerRouter = require("./routes/register");
const loginRouter = require("./routes/login");
app.use("/register", registerRouter);
app.use("/", loginRouter);

//start the server
app.listen(port, () => {
  console.log(`Server is running on port : ${port}`);
});

//@TODO Unsure how to translate this to a file
app.get("/getUser", verifyJWT, (req, res) => {
  res.json({ isLoggedIn: true, email: req.user.email });
});

function verifyJWT(req, res, next) {
  const token = req.headers["x-access-token"]?.split("Bearer")[1];
  if (token) {
    console.log("Verifying");
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
      next();
    });
  } else {
    res.json({ message: "Incorrect Token Given", isLoggedIn: false });
  }
}
