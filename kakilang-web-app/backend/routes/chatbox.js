//Setup .env file to be handled
require("dotenv").config();

const Message = require("../models/message.model");
const Convo = require("../models/conversation.model");
const router = require("express").Router();

/**
 * Creating new messages and a new convo
 */
router.route("/convo").post((req, res) => {
  const participants = [req.body.senderID, req.body.targetID];
  const newConvo = new Convo({
    participants: participants,
  });
  newConvo.save((err) => {
    if (err) {
      res.status(500).send({ err: err });
    }
  });
  const newMessage = new Message({
    convoID: newConvo._id,
    senderID: req.body.senderID,
    message: req.body.message,
  });
  newMessage.save((err) => {
    if (err) {
      res.status(500).send({ err: err });
      return;
    }
    req.io.emit("message", { convoID: newConvo._id });
    res.status(201).json({ sent: "OK", convoID: newConvo._id });
  });
});

/**
 * Creating new messages in existing convo
 */
router.route("/convo/:convoID").post((req, res) => {
  const newMessage = new Message({
    convoID: req.params.convoID,
    ...req.body,
  });
  newMessage.save((err) => {
    if (err) {
      res.status(500).send({ err: err });
      return;
    }
    req.io.emit("message", { convoID: req.params.convoID });
    res.status(201).json({ sent: "OK" });
  });
});

/**
 * Get messages from ConvoID
 */
router.route("/convo/:convoID").get((req, res) => {
  const queryID = req.params.convoID;
  Message.find({ convoID: queryID })
    .populate("senderID", "name profileIMG")
    .then((dbMessages) => {
      res.status(200).json({ messages: dbMessages });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err: err });
    });
});

/**
 * Get Convo from single userID
 */
router.route("/user/:userID").get((req, res) => {
  const queryID = req.params.userID;
  Convo.find({ $or: [{ participants: queryID }, { EventChat: { $ne: null } }] })
    .populate({
      path: "participants",
      match: { _id: { $ne: queryID } },
    })
    .populate({
      path: "EventChat",
      match: { $or: [{ registeredIDs: queryID }, { ownerID: queryID }] },
    })
    .then((convos) => {
      if (!convos) {
        res.status(200).json({ convos: convos });
      }
      const output = convos
        .filter((convo) => {
          return convo.EventChat || convo.participants.length !== 0;
        })
        .map((convo) => {
          if (convo.participants.length == 0) {
            let target = convo.EventChat.info();

            return { convoID: convo._id, ...target };
          } else {
            let target = convo.participants[0].info();
            target.convoID = convo._id;
            return { convoID: convo._id, ...target };
          }
        });
      res.status(200).json({ convos: output });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err: err });
    });
});

/**
 * Get Convo from two UserID
 */
router.route("/user/:user1ID/:user2ID").get((req, res) => {
  Convo.findOne({
    $or: [
      { participants: [req.params.user1ID, req.params.user2ID] },
      { participants: [req.params.user2ID, req.params.user1ID] },
    ],
  })
    .then((convo) => {
      if (!convo) {
        res.status(200).json({ err: "No Convo found", convoID: null });
        return;
      }
      res.status(200).json({ convoID: convo._id });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err: err });
    });
});

/**
 * Get Convo from EventID
 */
router.route("/event/:eventID").get((req, res) => {
  const queryID = req.params.eventID;
  Convo.findOne({ EventChat: queryID })
    .then((dbEventConvo) => {
      res.status(200).json({ convoID: dbEventConvo?._id });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err: err });
    });
});

module.exports = router;
