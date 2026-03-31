const express = require("express");
const multer = require("multer");
const path = require("path");


const app = express();


// storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // later: your external drive path
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// upload route
app.post("/upload", upload.single("file"), (req, res) => {
  res.json({
    message: "File uploaded",
    file: req.file,
  });
});

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});