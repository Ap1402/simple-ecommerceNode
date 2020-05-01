const multer = require("multer");

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + "-" + file.originalname);
  },
});

const upload = multer({
  storage: fileStorage,
  limits: {
    fileSize: 100000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|png|gif)$/)) {
      cb(new Error("File must be JPG/PNG/GIF"));
    }
    cb(undefined, true);
  },
});

module.exports = upload;
