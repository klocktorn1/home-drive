const express = require("express");
const multer = require("multer");
const path = require("path");

const dateNow = new Date().toLocaleString();
const app = express();

app.use(express.static('public'));
// storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // later: your external drive path
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
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

app.get("/api/files", (req, res) => {

  try {

    const fs = require("fs");
    fs.readdir("uploads/", (err, files) => {
      if (err) {
        return res.status(500).json({ error: "Unable to read files" });
      }
      res.json({ files });
    });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(3000, "0.0.0.0", () => {
  console.log("Server running on port 3000 ", dateNow);
});
