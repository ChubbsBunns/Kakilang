/**
 * Event Schema
 * Stores an event and users registered to the event.
 *
 * @param name
 * @param eventIMG
 * @param description Event description
 * @param eventDate Event start date
 * @param ownerID
 * @param registeredIDs
 */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const EventsSchema = new Schema(
  {
    name: { type: String, required: true },
    eventIMG: { type: String },
    description: { type: String },
    eventDate: { type: String, required: true },
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

/**
 * @returns Events without private information
 * and with defaults set to missing values
 */
EventsSchema.methods.info = function () {
  const basic = {
    _id: this._id,
    name: this.name,
    img: this.eventIMG || "/defaultEvent.jpg",
    eventDate: this.eventDate,
    description: this.description,
    ownerID: this.ownerID,
    registeredIDs: this.registeredIDs,
  };
  return basic;
};

const Events = mongoose.model("Events", EventsSchema);
module.exports = Events;
