//Setup .env file to be handled
require("dotenv").config();

const Message = require("../models/message.model");
const router = require("express").Router();
const axios = require("axios");

/** Load env and get the server name */
const server = process.env.SERVER || "http://localhost:2500";

/**
 * POST request for message sending
 */
router.route("/send").post(async (req, res) => {
  const newMessage = new Message(req.body);
  newMessage.save((err) => {
    if (err) {
      res.sendStatus(500);
    }
    req.io.emit("message", req.body);
    res.sendStatus(200);
  });
});

/**
 * GET request for messages
 */
router.route("/get").get(async (req, res) => {
  const messageData = req.query;
  axios
    .get(server + "/getUser", {
      headers: { "x-access-token": messageData.token },
    })
    .then((reply) => {
      if (!reply && reply.user.email != messageData.email) res.sendStatus(403);
      console.log("Message Success");
      Message.find(
        {
          $or: [
            { fromEmail: messageData.email },
            { toEmail: messageData.email },
          ],
        },
        (err, messages) => {
          if (err) res.sendStatus(500);
          //console.log(messages);
          res.json({ messages: messages });
        }
      );
    });
});

module.exports = router;
