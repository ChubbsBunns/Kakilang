/**
 * Router for Users at /users
 * API for User and Profile CRUD
 */

const router = require("express").Router();
const { verifyJWT } = require("../token");
const User = require("../models/user.model");

/** Rotuing for users */

/** Get All Users
 * JWT authentication required
 */
router.route("/").get(verifyJWT, (req, res) => {
  User.find((err, dbUsers) => {
    if (err) res.status(418).json({ err: err });
    const all = [];
    dbUsers?.map((user) => {
      const basic = user.info();
      all.push(basic);
      return;
    });
    res.status(200).json({ users: all });
  });
});

/**
 * Get User info
 * JWT authentication required
 */
router.route("/:id").get(verifyJWT, (req, res) => {
  User.findById(req.params.id)
    .then((dbUser) => {
      res.status(200).json({ user: dbUser.info() });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err: err });
    });
});

/**
 * Get Filtered All
 * JWT authentication required
 */
router.route("/:key/:value").get(verifyJWT, (req, res) => {
  const key = req.params.key;
  if (key == "email" || key == "password") {
    return res.status(200).json({ users: [] });
  }

  const queryObj = {};
  queryObj[key] = req.params.value;

  User.find(queryObj)
    .then((dbUsers) => {
      const all = [];
      dbUsers?.map((user) => {
        const basic = user.info();
        all.push(basic);
        return;
      });
      res.status(200).json({ users: all });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err: err });
    });
});

module.exports = router;
