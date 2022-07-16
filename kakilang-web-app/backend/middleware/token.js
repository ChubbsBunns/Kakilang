/**
 * Middleware that deals with Json Web Tokens
 */

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const Session = require("../models/session.model");

/**
 * Checks if JWT is valid
 *
 * @onfufilled JWT is returned as req.jwt, userID is returned as req.jwtID,
 * and the next function is called
 * @onrejected A 403 error is sent
 */
function verifyJWT(req, res, next) {
  const token = req.headers["x-access-token"]?.split("Bearer")[1];
  if (!token) {
    return res
      .status(403)
      .json({ message: "No Token Given", isLoggedIn: false });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({
        isLoggedIn: false,
        message: "Failed to Authenticate",
      });
    }

    req.jwtID = decoded.id;
    req.jwt = token;

    next();
  });
}

/**
 * Checks if JWT is valid to a userID
 *
 * @param token The JWT token
 * @param userID The user's ID to check the token against
 *
 * @return true if token is valid to the user, false otherwise
 */
async function isUserSessionToken(token, userID) {
  const encryptedJWT = await User.findById(userID)
    .populate("Session")
    .then((dbUser) => {
      return dbUser.sessionID?.JWT;
    })
    .catch((err) => {
      console.log(err);
      return null;
    });

  if (!encryptedJWT) return false;
  return bcrypt.compareSync(token, encryptedJWT);
}

/**
 * Generates a valid JWT token
 *
 * @param User.id
 * @param User.email
 *
 * @return Raw JWT Token that expires in 2h
 */
function generateToken({ id, email }) {
  const payload = {
    id: id,
    email: email,
  };
  jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: "2h" },
    (err, token) => {
      if (err) {
        console.log(err);
        return "";
      }
      return token;
    }
  );
}

/**
 * Makes a JWT token valid to a user session
 *
 * @param token JWT token
 * @param userID ID of the user to save the token to
 *
 * @return err if any, null other wise
 */
function saveTokenTodbUser(token, userID) {
  const encryptedJWT = bcrypt.hashSync(token, process.env.BCRYPT_SALT);

  const newSession = new Session({
    JWT: encryptedJWT,
  });
  newSession.save();

  User.findByIdAndUpdate(userID, { sessionID: newSession._id }, (err) => {
    if (err) {
      console.log(err);
      return err;
    }
  });
  return;
}

module.exports = {
  verifyJWT,
  isUserSessionToken,
  generateToken,
  saveTokenTodbUser,
};
