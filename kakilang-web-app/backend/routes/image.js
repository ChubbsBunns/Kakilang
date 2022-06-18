const Image = require("../models/image.model");
const router = require("express").Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.route("/upload").post(upload.single("myImage"), (req, res) => {
  const file = req.file;
  const texts = req.body;
  console.log("file: ", file);
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
