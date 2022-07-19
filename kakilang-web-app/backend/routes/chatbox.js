/**
 * Router for Chatbox functions at /chatbox
 * API for messages and convo CRUD
 */

require("dotenv").config();

const Message = require("../models/message.model");
const Convo = require("../models/conversation.model");
const { verifyJWT, isUserSessionToken } = require("../token");
const router = require("express").Router();

/**
 * Creates new messages and a new convo
 * JWT authentication and User Session authentication required for usage
 * Socket emits "message" with convoID
 */
router.route("/convo").post(verifyJWT, (req, res) => {
  const senderID = req.body.senderID;
  const dbUser = isUserSessionToken(req.jwtID, senderID);

  if (!dbUser || dbUser._id !== senderID) {
    return res.send(403).json({ message: "Usage not allowed" });
  }

  const participants = [req.body.senderID, req.body.targetID];
  const newConvo = new Convo({ participants: participants });
  newConvo.save((err) => {
    if (err) res.status(500).send({ err: err });
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
 * Creates new messages in existing convo
 * JWT authentication and User Session authentication required for usage
 * Socket emits "message" with convoID
 */
router.route("/convo/:convoID").post(verifyJWT, (req, res) => {
  const senderID = req.body.senderID;
  const dbUser = isUserSessionToken(req.jwtID, senderID);

  if (!dbUser) {
    return res.status(403).json({ message: "Usage not allowed" });
  }

  const newMessage = new Message({
    convoID: req.params.convoID,
    senderID: req.body.senderID,
    message: req.body.message,
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
 * JWT authentication required for usage
 */
router.route("/convo/:convoID").get(verifyJWT, async (req, res) => {
  const queryID = req.params.convoID;
  const convoParticipants = await Convo.findById(queryID)
    .populate("EventChat", "ownerID registeredIDs")
    .then((dbConvo) => {
      return dbConvo.EventChat
        ? [dbConvo.EventChat.ownerID, ...dbConvo.EventChat.registeredIDs]
        : dbConvo.participants;
    })
    .catch((err) => {
      console.log(err);
      return [];
    });

  if (!convoParticipants.includes(req.jwtID)) {
    return res.status(403).json({ message: "Read not allowed" });
  }

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
 * JWT authentication and User Session authentication required for usage
 */
router.route("/user/:userID").get(verifyJWT, (req, res) => {
  const queryID = req.params.userID;
  const dbUser = isUserSessionToken(req.jwtID, queryID);
  if (!dbUser) {
    return res.status(403).json({ message: "Read not allowed" });
  }

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
 * JWT authentication and User Session authentication required for usage
 */
router.route("/user/:user1ID/:user2ID").get(verifyJWT, (req, res) => {
  const user1ID = req.params.user1ID;
  const user2ID = req.params.user2ID;

  const isAuth =
    isUserSessionToken(req.jwtID, user1ID) ||
    isUserSessionToken(req.jwtID, user2ID);

  if (!isAuth) {
    return res.status(403).json({ message: "Read not allowed" });
  }

  Convo.findOne({
    $or: [
      { participants: [user1ID, user2ID] },
      { participants: [user2ID, user1ID] },
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
