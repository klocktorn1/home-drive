const fs = require("fs");
const path = require("path");

const uploadDir = path.resolve(__dirname, "../../uploads");


// upload route
const uploadFiles = (req, res) => {
    console.log("UPLOAD DIR:", path.resolve("uploads"))
    res.json({
        message: "File uploaded",
        file: req.file,
    });
};

const getFiles = (req, res) => {
    console.log("UPLOAD DIR:", path.resolve("uploads"))
    try {
        fs.readdir(uploadDir, (err, files) => {
            if (err) {
                return res.status(500).json({ error: "Unable to read files" });
            }
            res.json({ files });
        });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};


module.exports = {
    uploadFiles,
    getFiles
};