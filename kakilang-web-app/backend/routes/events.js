//Setup .env file to be handled
require("dotenv").config();

//Setup Route and dependencies
const Events = require("../models/events.model");
const router = require("express").Router();

/** Setup Cloudinary and Multer for uploading banner images **/
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Events",
  },
});
const multer = require("multer");
const upload = multer({ storage: storage });

/** Routing for Events **/

// Create
router.route("/create").post(upload.single("eventImage"), (req, res) => {
  const file = req.file;
  const details = req.body;
  const owner = {
    id: details.ownerID,
    name: details.ownerName,
    profileIMG: details.profileIMG,
  };

  const newEvents = new Events({
    eventIMG: file?.path,
    owner: owner,
    ...details,
  });

  newEvents.save((err) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    }
    console.log("Event Created!");
    res.sendStatus(200);
  });
});

// Read
router.route("/getEvents").get((req, res) => {
  Events.find((err, events) => {
    if (err) res.status(418).send(err);
    res.status(200).json({ events: events });
  });
});

// Update
router.route("/update/:id").patch(async (req, res) => {
  Events.findByIdAndUpdate(req.params.id, req.body, (err, docs) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: err });
    }
    console.log("Updated: ", docs);
    res.status(200).json({ message: "OK", update: docs });
  });
});

// Delete
router.route("/delete/:id").delete((req, res) => {
  Events.findByIdAndDelete(req.params.id, (err, docs) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: err });
    }
    console.log("Deleted: ", docs);
    res.status(200).json({ message: "OK", update: docs });
  });
});

router.route("/test").post(upload.single("wrong"), (req, res) => {
  console.log("testing");
  const file = req.file;
  const details = req.body;
  console.log("File:", file);
  console.log("Details:", details);
  res.sendStatus(200);
});

module.exports = router;
