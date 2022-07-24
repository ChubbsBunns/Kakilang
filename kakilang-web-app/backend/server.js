/**
 * The Server
 * Contains mongoose, and app.js (APIs)
 */

require("dotenv").config();

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
const httpServer = require("./app");
const port = process.env.PORT || 2500;

//start the server
httpServer.listen(port, () => {
  console.log(`Server is running on port : ${port}`);
});
