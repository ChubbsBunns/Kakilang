const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const profileSchema = new Schema({
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
  cca: { type: Array, required: false },
  year: {
    value: { type: String },
    display: { type: Boolean },
    required: false,
  },
  bio: { type: String, required: false },
  interest: { type: String, required: false },
});

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;
