//setup middle ware to connect to database
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
app.use(cors());
app.use(express.json());

//setup mongoDB connection
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewURLParser: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

//Setup Server Port
const port = process.env.PORT || 2500;


//Setup Routers (Subpages)
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
app.use('/register', registerRouter);
app.use('/', loginRouter);

//start the server
app.listen(port, () => {
    console.log(`Server is running on port : ${port}`);
});

