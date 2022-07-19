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
const Session = require("../models/session.model");

/**
 * Creates an authenticated session
 * Email and Password required to authenticate
 *
 * Json web token saved and returned if successful
 */
router.route("/").post((req, res) => {
  const userPassword = req.body?.password;
  const userEmail = req.body?.email;
  if (!userEmail || !userPassword)
    return res.status(400).json(badLogin("No Email Given"));

  User.findOne({ email: userEmail })
    .then((dbUser) => {
      if (!dbUser) return res.status(403).json(badLogin());

      bcrypt.compare(userPassword, dbUser.password).then((correctPass) => {
        if (!correctPass) return res.status(403).json(badLogin());

        const token = generateToken(dbUser._id, userEmail);
        const isSaved = saveTokenTodbUser(token, dbUser);

        return res.status(200).json({
          token: "Bearer" + token,
          isLoggedIn: true,
          debug: isSaved,
          user: dbUser.info(),
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
router.route("/").get(verifyJWT, async (req, res) => {
  const dbUser = await isUserSessionToken(req.jwt, req.jwtID);
  if (!dbUser) {
    return res.status(403).json(badLogin("Invalid User Session"));
  }

  return res.status(200).json({
    isLoggedIn: true,
    user: dbUser.info(),
  });
});

//@TODO regenerate Token
router.route("/").patch(verifyJWT, async (req, res) => {
  const dbUser = await isUserSessionToken(req.jwt, req.jwtID);
  if (!dbUser) {
    return res.status(403).json(badLogin("Invalid User Session"));
  }

  const newToken = generateToken(dbUser._id, dbUser.email);
  saveTokenTodbUser(newToken, dbUser);

  return res.status(200).json({
    user: dbUser.info(),
    token: "Bearer" + newToken,
  });
});

router.route("/").delete(verifyJWT, async (req, res) => {
  const dbUser = await isUserSessionToken(req.jwt, req.jwtID);
  if (!dbUser) {
    return res.status(403).json(badLogin("Invalid User Session"));
  }

  const sessionID = dbUser.sessionID?._id;
  Session.findByIdAndDelete(sessionID);
  dbUser.sessionID = undefined;
  console.log(dbUser.sessionID);
  await dbUser.save();
  console.log(dbUser);
  return res.status(202).json();
});

module.exports = router;
