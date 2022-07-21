/**
 * User Schema
 * Stores user login credentials, login session and displayed profile
 *
 * @param email
 * @param password
 * @param sessionID
 * @param name
 * @param profileIMG
 * @param Profile
 */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    email: { type: String, required: true, lowercase: true, unique: true },
    password: { type: String, required: true },

    sessionID: { type: mongoose.Types.ObjectId, ref: "Session" },

    name: { type: String, required: true },
    profileIMG: { type: String, required: false },
    Profile: {
      major: {
        value: { type: String },
        display: { type: Boolean },
        required: false,
      },
      house: {
        value: { type: String },
        display: { type: Boolean },
        required: false,
      },
      floor: {
        value: { type: String },
        display: { type: Boolean },
        required: false,
      },
      cca: {
        value: { type: Array },
        display: { type: Boolean },
        required: false,
      },
      year: {
        value: { type: String },
        display: { type: Boolean },
        required: false,
      },
      bio: { type: String, required: false },
      interest: { type: String, required: false },
    },
  },
  { timestamps: true }
);

/**
 * @returns user information without private credentials
 */
userSchema.methods.info = function () {
  const profile = this.Profile;
  const basic = {
    _id: this._id,
    name: this.name,
    img: this.profileIMG || "/defaultProfile.png",
    profile: {
      major: profile.major.display && profile.major.value,
      house: profile.house.display && profile.house.value,
      floor: profile.floor.display && profile.floor.value,
      cca: profile.cca.display && profile.cca.value,
      year: profile.year.display && profile.year.value,
      bio: profile.bio,
      interest: profile.bio,
    },
  };
  return basic;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
