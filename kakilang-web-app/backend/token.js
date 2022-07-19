/**
 * Middleware that deals with Json Web Tokens
 */
const path = `${__dirname}/../.env`;
require("dotenv").config({ path: path });

const jwt = require("jsonwebtoken");
const User = require("./models/user.model");
const Session = require("./models/session.model");

/**
 * Checks if JWT is valid
 * Token should be found in headers["x-access-token"]
 *
 * @onfufilled JWT is returned as req.jwt, userID is returned as req.jwtID,
 * and the next function is called
 * @onrejected A 403 error is sent
 */
function verifyJWT(req, res, next) {
  const token = req.headers["x-access-token"]?.split("Bearer")[1];
  if (!token) {
    return res
      .status(400)
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
 * @return dbUser if true, returns false otherwise
 */
async function isUserSessionToken(token, userID) {
  let dbUser;
  const sessionJWT = await User.findById(userID)
    .populate({
      path: "sessionID",
    })
    .then((dbSession) => {
      dbUser = dbSession;
      return dbSession.sessionID?.JWT;
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
  if (!sessionJWT) return false;
  const isCorrect = token == sessionJWT;
  return isCorrect ? dbUser : false;
}

/**
 * Generates a valid JWT token
 *
 * @param id
 * @param email
 *
 * @return Raw JWT Token that expires in 2h
 */
function generateToken(id, email) {
  const payload = {
    id: id,
    email: email,
  };

  try {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });
    return token;
  } catch (error) {
    console.log(error);
    return "";
  }
}

/**
 * Makes a JWT token valid to a user session
 *
 * @param token JWT token
 * @param dbUser User from the database
 *
 * @return true if success, false otherwise
 */
async function saveTokenTodbUser(token, dbUser) {
  if (!dbUser) return false;

  const user = new User(dbUser);
  const newSession = new Session({
    JWT: token,
  });
  newSession.save();

  user.sessionID = newSession._id;
  user.save();

  return true;
}

module.exports = {
  verifyJWT,
  isUserSessionToken,
  generateToken,
  saveTokenTodbUser,
};
