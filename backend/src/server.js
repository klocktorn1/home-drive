const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const fileRoutes = require("./routes/files");

const dateNow = new Date().toLocaleString();
const app = express();

const PORT = process.env.PORT || 3000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:5173";


app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.static('public'));
app.use("/api", fileRoutes);





app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT} `, dateNow);
});
