/**
 * Router for Events at /events
 * API for event CRUD and registering
 */

require("dotenv").config();

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

const { verifyJWT, isUserSessionToken } = require("../token");

/**
 * Create Events
 * JWT authentication required
 */
router.route("/").post(verifyJWT, upload.single("eventImage"), (req, res) => {
  const file = req.file;
  const details = req.body;
  if (req.jwtID !== details.ownerID) {
    return res.status(403).json({});
  }

  const newEvents = new Events({
    eventIMG: file?.path,
    name: details.name,
    description: details.description,
    eventDate: details.eventDate,
    ownerID: details.ownerID,
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
    res.status(201).json();
  });
});

// Read Events
router.route("/").get((req, res) => {
  Events.find((err, events) => {
    if (err) res.status(418).send(err);
    res.status(200).json({ events: events?.map((event) => event.info()) });
  });
});

/** Update Events
 * JWT and User's Event Authentication required
 */
router
  .route("/:id")
  .patch(
    verifyJWT,
    verifyUserEvent,
    upload.single("eventImage"),
    (req, res) => {
      const file = req.file;
      const details = req.body;
      const oldFile = req.body.oldIMG;
      const update = {
        eventIMG: file?.path,
        ...details,
      };
      delete update.oldIMG;

      const deleteOld = () => {
        let isDeleted = { result: "no file change" };
        if (update.eventIMG && update.eventIMG !== oldFile) {
          const temp = oldFile.split("/");
          const oldFileName = temp[temp.length - 1].split(".")[0];
          isDeleted = cloudinary.uploader.destroy("Events/" + oldFileName);
        }
        return isDeleted;
      };

      //Update
      const dbEvent = req.dbEvent;
      const updateEvent = (key) => {
        if (update[key]) {
          dbEvent[key] = update[key];
        }
        return;
      };
      updateEvent("name");
      updateEvent("eventIMG");
      updateEvent("description");
      updateEvent("eventDate");
      dbEvent.save();

      const deleteStatus = deleteOld();
      console.log("Old Image deleted?:", deleteStatus.result);

      req.io.emit("updateEvent");
      console.log("Event Updated");
      res.status(200).json({ message: "OK", update: dbEvent.info() });
    }
  );

async function verifyUserEvent(req, res, next) {
  const ownerID = req.body.ownerID;
  const dbUser = isUserSessionToken(req.jwtID, ownerID);
  if (!dbUser) {
    return res.status(403).json({ message: "Edit not allowed" });
  }

  const dbEvent = await Events.findById(req.params.id)
    .then((dbEvent) => {
      return dbEvent.ownerID == ownerID ? dbEvent : false;
    })
    .catch((err) => {
      console.log(err);
      return "";
    });
  if (!dbEvent) {
    return res.status(403).json({ message: "Edit not allowed" });
  }

  req.dbEvent = dbEvent;

  next();
}

/** Delete Events
 * JWT and User's Event Authentication required
 */
router.route("/:id").delete(verifyJWT, verifyUserEvent, (req, res) => {
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

  //delete dbEvent
  const dbEvent = req.dbEvent;
  dbEvent.remove();

  const deleteStatus = deleteIMG();
  console.log("Image deleted?:", deleteStatus.result);
  console.log("Event Deleted");
  req.io.emit("updateEvent");
  res.sendStatus(200);
});

/**
 * Get a User's Events
 * JWT and User Session authenticationr required
 */
router.route("/user/:id").get(verifyJWT, (req, res) => {
  const queryID = req.params.id;
  const dbUser = isUserSessionToken(req.jwtID, queryID);
  if (!dbUser) {
    return res.status(403).json({ message: "Read not allowed" });
  }

  Events.find({
    $or: [{ ownerID: queryID }, { registeredIDs: queryID }],
  }).then((dbEvents) => {
    res.status(200).json({ events: dbEvents?.map((event) => event.info()) });
  });
});

/** Registering for an event
 * JWT authentication required
 */
router.route("/:eventID/:userID").patch(verifyJWT, (req, res) => {
  if (req.jwtID !== res.params.userID) {
    return res.status(403).json({ message: "Registeration not allowed" });
  }

  const update = {
    $push: {
      registeredIDs: req.params.userID,
    },
  };

  Events.findByIdAndUpdate(req.params.eventID, update, async (err, dbEvent) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: err });
    }
    req.io.emit("updateEvent");
    dbEvent;
    res.status(200).json({ message: "OK" });
  });
});

/** Unregistering for an event
 * JWT authentication required
 */
router.route("/:eventID/:userID").delete(verifyJWT, (req, res) => {
  if (req.jwtID !== req.params.userID) {
    return res.status(403).json({ message: "Unregistration not allowed" });
  }

  const update = {
    $pull: {
      registeredIDs: req.params.userID,
    },
  };

  Events.findByIdAndUpdate(req.params.eventID, update, async (err, dbEvent) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: err });
    }
    req.io.emit("updateEvent");
    dbEvent;
    res.status(200).json({ message: "OK" });
  });
});

module.exports = router;
