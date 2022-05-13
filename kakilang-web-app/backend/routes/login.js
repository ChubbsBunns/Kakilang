const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const router = require('express').Router();

router.route("/login").post((req, res) => {
    const userLogin = req.body;
    User.findOne({email: userLogin.email})
        .then(dbUser => {
            if (!dbUser) {
                //no such email found
                return res.json({message: "Invalid Email or Password"});
            }
            bcrypt.compare(userLogin.password, dbUser.password)
                .then(isSame => {
                    if (isSame) {
                        const payload = {
                            id: dbUser._id,
                            email: dbUser.email,
                        };
                        jwt.sign(
                            payload,
                            process.env.JWT_SECRET,
                            {expiresIn: 600},
                            (err, token) => {
                                if (err) return res.json({message: err});
                                return res.json({
                                    message: "Success",
                                    token: "Bearer" + token});
                            }
                        )
                    } else {
                        return res.json({message: "Invalid Email or Password"});
                    }
                })
        })
})

module.exports = router;