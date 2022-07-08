const jwt = require("jsonwebtoken");

function verifyJWT(req, res, next) {
  const token = req.headers["x-access-token"]?.split("Bearer")[1];
  if (token) {
    //console.log("Verifying");
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({
          isLoggedIn: false,
          message: "Failed to Authenticate",
        });
      }

      req.JWTID = decoded.id;

      next();
    });
  } else {
    res
      .status(403)
      .json({ message: "Incorrect Token Given", isLoggedIn: false });
  }
}

function generateToken(req, res) {
  const token = req.headers["x-access-token"]?.split("Bearer")[1];
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({
          isLoggedIn: false,
          message: "Failed to Authenticate",
        });
      }

      if (req.id == decoded.id) {
        const payload = {
          id: decoded.id,
          email: decoded.email,
        };
        jwt.sign(
          payload,
          process.env.JWT_SECRET,
          { expiresIn: "2h" },
          (err, token) => {
            if (err) return res.status(500).json({ err: err });
            return res.status(200).json({
              message: "Success",
              token: "Bearer" + token,
            });
          }
        );
      }
    });
  } else {
    res
      .status(403)
      .json({ message: "Incorrect Token Given", isLoggedIn: false });
  }
}

module.exports = { verifyJWT, generateToken };
