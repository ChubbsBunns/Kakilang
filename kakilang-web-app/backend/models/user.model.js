const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * Schema of the User
 * For MongoDB and mongoose operations
 *
 */
const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    major: { type: String, required: false },
    house: { type: String, required: false },
    floor: { type: String, required: false },
    cca: { type: Array, required: false },
    year: { type: Number, required: false },
    profileIMG: { type: String, required: false },
    profile: {
      bio: { type: String, required: false },
      interest: { type: String, required: false },
      display: { type: Array, required: false },
      type: Object,
      required: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
