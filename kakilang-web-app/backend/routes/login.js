//@TODO
/**
 * Router for Authentication at /token
 * API for authentication CRUD
 */

/** Import router and dependencies */
const router = require("express").Router();
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../middleware/token");

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

        // return the user with censored password
        dbUser.password = "";

        // Creating the JWT
        jwt.sign(
          payload,
          process.env.JWT_SECRET,
          { expiresIn: "2h" },
          (err, token) => {
            if (err) return res.status(500).json(badLogin(err));
            return res.status(200).json({
              message: "Success",
              token: "Bearer" + token,
              login: true,
              user: dbUser,
            });
          }
        );
      } else {
        // Password is wrong
        return res.status(403).json(badLogin());
      }
    });
  });
});

/**
 * JWT authentication function
 */
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

      req.id = decoded.id;

      next();
    });
  } else {
    res
      .status(403)
      .json({ message: "Incorrect Token Given", isLoggedIn: false });
  }
}

router.route("/getUser").get(verifyJWT, (req, res) => {
  User.findById(req.id)
    .then((dbUser) => {
      //remove password before sending
      dbUser.password = "";

      res.status(200).json({
        isLoggedIn: true,
        user: dbUser,
      });
    })
    .catch((err) => {
      res.status(500).json(badLogin(err));
    });
});

router.route("/login").get(generateToken);

module.exports = router;
