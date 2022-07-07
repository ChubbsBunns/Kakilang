//Setup .env file to be handled
require("dotenv").config();

//Setup Route and dependencies
const Events = require("../models/events.model");
const Convo = require("../models/conversation.model");
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

// Create Events
router.route("/").post(upload.single("eventImage"), (req, res) => {
  const file = req.file;
  const details = req.body;

  const newEvents = new Events({
    eventIMG: file?.path,
    ...details,
  });

  newEvents.save((err) => {
    if (err) {
      console.log(err);
      res.status(502).json({ err: err });
      return;
    }
    console.log("Event Created!");
    const newConvo = new Convo({
      EventChat: newEvents._id,
    });
    newConvo.save((err) => {
      if (err) {
        console.log(err);
        return;
      }
    });

    req.io.emit("updateEvent");
    res.sendStatus(201);
  });
});

// Read Events
router.route("/").get((req, res) => {
  Events.find((err, events) => {
    if (err) res.status(418).send(err);
    res.status(200).json({ events: events });
  });
});

// Update Events
router.route("/:id").patch(upload.single("eventImage"), (req, res) => {
  const file = req.file;
  const details = req.body;
  const oldFile = req.body.oldIMG;
  const update = {
    eventIMG: file?.path,
    ...details,
  };
  delete update.oldIMG;

  const deleteOld = async () => {
    let isDeleted = { result: "no file change" };
    if (update.eventIMG && update.eventIMG !== oldFile) {
      const temp = oldFile.split("/");
      const oldFileName = temp[temp.length - 1].split(".")[0];
      isDeleted = await cloudinary.uploader.destroy("Events/" + oldFileName);
    }
    return isDeleted;
  };

  Events.findByIdAndUpdate(req.params.id, update, async (err, dbEvent) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: err });
    }
    const deleteStatus = await deleteOld();
    console.log("Old Image deleted?:", deleteStatus.result);
    req.io.emit("updateEvent");
    console.log("Event Updated");
    res.status(200).json({ message: "OK", update: dbEvent });
  });
});

// Delete Events
router.route("/:id").delete((req, res) => {
  const oldFile = req.body.oldIMG;
  const deleteIMG = async () => {
    let isDeleted = { result: "No event images" };
    if (oldFile) {
      const temp = oldFile.split("/");
      const oldFileName = temp[temp.length - 1].split(".")[0];
      isDeleted = await cloudinary.uploader.destroy("Events/" + oldFileName);
    }
    return isDeleted;
  };

  Events.findByIdAndDelete(req.params.id, async (err) => {
    if (err) {
      console.log(err);
      res.status(502).json({ message: err });
    }
    const deleteStatus = await deleteIMG();
    console.log("Image deleted?:", deleteStatus.result);
    console.log("Event Deleted");
    req.io.emit("updateEvent");
    res.sendStatus(200);
  });
});

module.exports = router;
