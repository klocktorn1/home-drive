const express = require("express");

const { uploadFiles, getFiles} = require("../controllers/filesController");
const upload = require("../middleware/multer");

const router = express.Router();

router.post("/upload", upload.single("file"), uploadFiles);
router.get("/files", getFiles);

module.exports = router