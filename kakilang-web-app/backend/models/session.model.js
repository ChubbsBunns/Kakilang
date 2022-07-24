/**
 * Session Schema
 * Stores a session bcrypt JWT that expires in 2h
 *
 * @param JWT
 */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const sessionSchema = new Schema({
  JWT: { type: String, required: true },
  createdAt: { type: Date, expires: 7200, default: Date.now() },
});

const Session = mongoose.model("Session", sessionSchema);
module.exports = Session;
