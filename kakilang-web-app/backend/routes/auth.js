/**
 * Router for Authentication at /token
 * API for authentication CRUD
 */

const router = require("express").Router();
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const {
  verifyJWT,
  isUserSessionToken,
  generateToken,
  saveTokenTodbUser,
} = require("../token");

/**
 * Creates an authenticated session
 * Email and Password required to authenticate
 *
 * Json web token saved and returned if successful
 */
router.route("/").post((req, res) => {
  const userPassword = req.body?.password;
  const userEmail = req.body?.email;
  if (!userEmail) return res.status(400).json(badLogin("No Email Given"));

  User.findOne({ email: userEmail })
    .then((dbUser) => {
      if (!dbUser) return res.status(403).json(badLogin());

      bcrypt.compare(userPassword, dbUser.password).then((correctPass) => {
        if (!correctPass) return res.status(403).json(badLogin());

        const token = generateToken(dbUser._id, userEmail);
        if (!saveTokenTodbUser(token, dbUser._id)) {
          return res.status(500).json(badLogin());
        }

        const isSaved = saveTokenTodbUser(token, dbUser._id);

        return res.status(200).json({
          isLoggedIn: true,
          debug: isSaved,
          user: dbUser.info(),
          token: "Bearer" + token,
        });
      });
    })
    .catch((err) => res.status(500).json(badLogin(err)));
});

function badLogin(err = "Invalid Email or Password") {
  return { isLoggedIn: false, message: err };
}

/**
 * Retrives an existing session
 * JWT and User session authentication required
 *
 * Returns successful user login
 */
router.route("/").get(verifyJWT, (req, res) => {
  if (!isUserSessionToken(req.jwt, req.jwtID)) {
    return res.status(403).json(badLogin("Invalid User Session"));
  }

  User.findByID(req.jwtID)
    .then((dbUser) => {
      return res.status(200).json({
        isLoggedIn: true,
        user: dbUser.info(),
      });
    })
    .catch((err) => {
      return res.status(500).json(badLogin(err));
    });
});

module.exports = router;
