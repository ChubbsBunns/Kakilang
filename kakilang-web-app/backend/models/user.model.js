const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * Schema of the User
 * For MongoDB get and post requests
 * 
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
    profileIMG: {
      type: String,
      required: false
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
