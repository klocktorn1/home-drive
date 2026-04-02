const multer = require("multer");
const path = require("path");

const uploadDir = path.resolve(__dirname, "../../uploads");


// storage config
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir); // later: your external drive path
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});


module.exports = multer({ storage });