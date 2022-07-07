const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventsSchema = new Schema(
  {
    name: { type: String, required: true },
    eventIMG: { type: String },
    description: { type: String },
    eventDate: { type: String, required: true },
    owner: {
      id: { type: String, required: true },
      name: { type: String },
      profileIMG: { type: String },
      type: Object,
      required: false,
    },
    ownerID: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    registeredIDs: {
      type: [mongoose.Types.ObjectId],
      ref: "User",
      required: false,
    },
  },
  { timestamps: true }
);

EventsSchema.methods.info = function () {
  const basic = this;
  return basic;
};

/**
 * Event Model
 *
 * @param {String} name Event name
 * @param {String} eventIMG Event banner image
 * @param {String} description Event description
 * @param {String} eventDate Event start date
 * @param {Object} owner Creator of the Event
 * @param {String} owner.name Name of the Creator
 * @param {String} owner.profileIMG Picture of the Creator
 */
const Events = mongoose.model("Events", EventsSchema);

module.exports = Events;
