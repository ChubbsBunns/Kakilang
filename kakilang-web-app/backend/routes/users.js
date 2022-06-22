//Setup Route and dependencies
const router = require("express").Router();
const User = require("../models/user.model");

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
