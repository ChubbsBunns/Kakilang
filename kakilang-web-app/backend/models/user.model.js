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
    profileID: {
      type: mongoose.Types.ObjectId,
      ref: "Profile",
      required: false,
    },
  },
  { timestamps: true }
);

userSchema.methods.info = function () {
  const basic = {
    _id: this._id,
    name: this.name,
    profileIMG: this.profileIMG,
    profileID: this.profileID,
  };
  return basic;
};

userSchema.methods.profile = function () {
  this.populate("profileID");
  const basic = {
    _id: this._id,
    name: this.name,
    profileIMG: this.profileIMG,
    profileID: this.profileID,
  };
  return basic;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
