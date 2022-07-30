const multer = require("multer");

const imageFilter = (req, file, cb) => {
  if (file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    cb(null, true);
  } else {
    cb("Please upload only jpeg, jpg, png images.", false);
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // console.log(__dirname)
    cb(null, __dirname + "/resources/static/img/profiles");
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  },
});

const uploadFile = multer({ storage: storage, fileFilter: imageFilter, limits: {fileSize: 2000000} });

module.exports = uploadFile;