const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const convoSchema = new Schema({
  EventChat: {
    type: mongoose.Types.ObjectId,
    ref: "Events",
    required: false,
  },
  participants: {
    type: [mongoose.Types.ObjectId],
    ref: "User",
    required: false,
  },
});

const Convo = mongoose.model("Convo", convoSchema);

module.exports = Convo;
