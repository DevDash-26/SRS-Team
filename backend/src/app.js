const express = require("express");
const path = require("path");
const cors = require("cors");
const routes = require("./routes/index");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Campus Hub API is running" });
});

app.use("/api", routes);

app.use(errorHandler);

module.exports = app;
