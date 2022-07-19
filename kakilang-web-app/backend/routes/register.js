/**
 * Router for Authentication at /register
 * API for authentication CRUD
 */

require("dotenv").config();

/** Setup Route and dependencies */
const router = require("express").Router();
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
 * POST Request to register user
 */
router.route("/add").post(upload.single("myImage"), async (req, res) => {
  const user = req.body;
  const file = req.file;

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
    res.json({ message: "Invalid Email or Password", isSuccessful: false });
  } else {
    /** Safely encrypt the password */
    user.password = await bcrypt.hash(user.password, process.env.BCRYPT_SALT);

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

module.exports = router;
