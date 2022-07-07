//Setup Route and dependencies
const router = require("express").Router();
const User = require("../models/user.model");

/** Rotuing for users */

// Get All Users
router.route("/").get((req, res) => {
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

// Get User No Auth
router.route("/:id").get((req, res) => {
  User.findById(req.params.id)
    .then((dbUser) => {
      res.status(200).json({ user: dbUser.info() });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err: err });
    });
});

// Get Filtered All
router.route("/:key/:value").get((req, res) => {
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

// Reading User (No Passwords)
router.route("/getBasic").get((req, res) => {
  User.find((err, users) => {
    if (err) res.sendStatus(err, 418);
    const basic = users.map((user) => {
      // remove password has for security
      user.password = "";
      return user;
    });

    res.json({ users: basic });
  });
});

module.exports = router;
