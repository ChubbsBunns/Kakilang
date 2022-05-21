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
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
