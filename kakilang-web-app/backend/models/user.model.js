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
 * @property {string} name - Unique Database ID
 * @property {string} year - Unique User's email
 * @property {string} house - Encrypted User's password
 * @property {string} floor - Unique Database ID
 * @property {string} cca - Unique User's email
 * @property {string} major - Unique User's email
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
    name: {
      type: String,
      required: true,
    },
    major: {
      type: String,
      required: false,
    },
    house: {
      type: String,
      required: false,
    },
    floor: {
      type: String,
      required: false,
    },
    cca: {
      type: Array,
      required: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
