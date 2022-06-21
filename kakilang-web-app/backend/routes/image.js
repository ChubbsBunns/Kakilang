//Setup .env file to be handled
require("dotenv").config();

//Setup Route and dependencies
const Image = require("../models/image.model");
const router = require("express").Router();

//Setup Multer with Cloudinary
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

const multer = require("multer");
const upload = multer({ storage: storage });

router.route("/upload").post(upload.single("myImage"), (req, res) => {
  const file = req.file.path;
  const texts = req.body;
  console.log("filepath: ", file);
  console.log("texts: ", texts);

  const newImage = new Image({
    name: texts.name,
    image: file,
  });
  newImage.save((err) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    }
    console.log("Upload Success");
    res.sendStatus(200);
  });
});

router.route("/getImages").get((req, res) => {
  Image.find((err, images) => {
    if (err) res.sendStatus(err, 418);
    console.log("Get image success", images);
    res.json({ images: images });
  });
});

module.exports = router;
