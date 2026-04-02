const express = require("express");
const cors = require("cors");
const path = require("path");

const fileRoutes = require("./routes/files");

const dateNow = new Date().toLocaleString();
const app = express();

app.use(cors({ origin: "http://oneplus-8:5173" }));
app.use(express.static('public'));
app.use("/api", fileRoutes);





app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(3000, "0.0.0.0", () => {
  console.log("Server running on port 3000 ", dateNow);
});
