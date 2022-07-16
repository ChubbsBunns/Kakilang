/**
 * Convo Schema
 * Stores existing conversations
 *
 * @param EventChat Event's ID if it is an eventchat
 * @param participants The users' ID if it is a normalchat
 */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const convoSchema = new Schema({
  EventChat: {
    type: mongoose.Types.ObjectId,
    ref: "Events",
    required: false,
  },
  participants: {
    type: [mongoose.Types.ObjectId],
    ref: "User",
    required: false,
  },
});

const Convo = mongoose.model("Convo", convoSchema);
module.exports = Convo;
