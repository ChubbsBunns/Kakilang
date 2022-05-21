const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const router = require("express").Router();

/**
 * Creates an error message for bad login
 * @param [err="undefined"] - System Error Message
 * @returns json object with a message and login = false
 */
const badLogin = (err = undefined) =>
  err
    ? { message: "" + err, login: false }
    : { message: "Invalid Email or Password", login: false };

/**
 * POST request to login to the user's account
 */
router.route("/login").post((req, res) => {
  const userLogin = req.body;

  // Promise to find the User in the database
  User.findOne({ email: userLogin.email }).then((dbUser) => {
    if (!dbUser) {
      // No such email found
      return res.json(badLogin());
    }

    // Compare the password with the encrypted password
    bcrypt.compare(userLogin.password, dbUser.password).then((isSame) => {
      // Create a JsonWebToken if login is successful, else return bad login
      if (isSame) {
        // payload for the JWT
        const payload = {
          id: dbUser._id,
          email: dbUser.email,
        };

        // Creating the JWT
        jwt.sign(
          payload,
          process.env.JWT_SECRET,
          { expiresIn: "1h" },
          (err, token) => {
            if (err) return res.json(badLogin(err));
            return res.json({
              message: "Success",
              token: "Bearer" + token,
              login: true,
            });
          }
        );
      } else {
        // Password is wrong
        return res.json(badLogin());
      }
    });
  });
});

module.exports = router;
