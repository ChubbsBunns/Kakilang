/**
 * Message Schema
 * Stores the contents of a message,
 * with reference to the conversation and the sender
 *
 * @param convoID
 * @param senderID
 * @param message
 * @param image Optional
 */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const messageSchema = new Schema(
  {
    convoID: {
      type: mongoose.Types.ObjectId,
      ref: "Convo",
      required: true,
    },
    senderID: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
