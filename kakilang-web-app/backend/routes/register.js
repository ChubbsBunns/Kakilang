const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const router = require('express').Router();

// find the exercise and returns the data if '/' get request is made
router.route('/add').post(async (req, res) => {
    const user = req.body;

    //check if email has already registered
    const takenEmail = await User.findOne({email: user.email});
    
    if (takenEmail) {
        res.json({message: "Email has already registered an account"});
    } else {
        //safely encrypt the password
        user.password = await bcrypt.hash(req.body.password, 10)

        //construct a user from the model
        const newUser = new User({
            email: user.email.toLowerCase(),
            password: user.password
        })

        //save the user to mongoDB
        newUser.save()
        res.json({message: "Success"})
    }
});

module.exports = router;