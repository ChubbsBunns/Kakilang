const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * Schema of the User
 * For MongoDB get and post requests
 * @memberof userSchema
 *
 * @property {string} _id - Unique Database ID
 * @property {string} email - Unique User's email
 * @property {string} password - Encrypted User's password
 */
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
