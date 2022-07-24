/**
 * Router for Users at /users
 * API for User and Profile CRUD
 */
require("dotenv").config();

/** Setup Route and dependencies */
const router = require("express").Router();
const { verifyJWT } = require("../token");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");

/** Setup Cloudinary */
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
    folder: "DEV",
  },
});

/** Setup Multer */
const multer = require("multer");
const upload = multer({ storage: storage });

/**
 * POST to create user
 */
router.route("/").post(upload.single("myImage"), async (req, res) => {
  const user = req.body;
  const file = req.file;
  const SALT = parseInt(process.env.BCRYPT_SALT);

  console.log(user);

  // Check if email has already registered
  const takenEmail = await User.findOne({ email: user.email });

  if (takenEmail) {
    /** Delete uploaded file */
    if (file) {
      console.log(file);
      cloudinary.uploader.destroy(file.filename, (res) => {
        console.log("deleted", res);
      });
    }
    /** Send Failure */
    return res
      .status(400)
      .json({ message: "Invalid Email or Password", isSuccessful: false });
  } else {
    /** Safely encrypt the password */
    user.password = bcrypt.hashSync(user.password, SALT);

    // Construct a user from the model
    const newUser = new User({
      email: user.email.toLowerCase(),
      password: user.password,
      name: user.name,
      profileIMG: file?.path,
      profile: {
        major: {
          value: user.major,
          display: true,
        },
        house: {
          value: user.house,
          display: true,
        },
        floor: {
          value: user.floor,
          display: true,
        },
        cca: {
          value: user.cca,
          display: true,
        },
      },
    });

    // Save the user to mongoDB
    newUser.save();
    res.status(201).json({ message: "Success", isSuccessful: true });
  }
});

/** Get All Users
 * JWT authentication required
 */
router.route("/").get(verifyJWT, (req, res) => {
  User.find((err, dbUsers) => {
    if (err) res.status(418).json({ err: err });
    const all = [];
    dbUsers?.map((user) => {
      const basic = user.info();
      all.push(basic);
      return;
    });
    res.status(200).json({ users: all });
  });
});

/**
 * Get User info
 * JWT authentication required
 */
router.route("/:id").get(verifyJWT, (req, res) => {
  User.findById(req.params.id)
    .then((dbUser) => {
      if (!dbUser) {
        return res.status(404).json({ err: "User not found" });
      }
      res.status(200).json({ user: dbUser.info() });
    })
    .catch((err) => {
      if (err.kind == "ObjectId") {
        return res.status(400).json({ err: "Invalid ObjectID" });
      }
      console.log(err);
      return res.status(500).json({ err: err });
    });
});

/**
 * Get Filtered All
 * JWT authentication required
 */
router.route("/:key/:value").get(verifyJWT, (req, res) => {
  const key = req.params.key;
  if (key == "email" || key == "password") {
    return res.status(200).json({ users: [] });
  }

  const queryObj = {};
  queryObj[key] = req.params.value;

  User.find(queryObj)
    .then((dbUsers) => {
      const all = [];
      dbUsers?.map((user) => {
        const basic = user.info();
        all.push(basic);
        return;
      });
      res.status(200).json({ users: all });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err: err });
    });
});

module.exports = router;
