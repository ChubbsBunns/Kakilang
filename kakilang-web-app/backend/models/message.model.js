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
    toEmail: {
      type: String,
      required: true,
    },
    fromEmail: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
