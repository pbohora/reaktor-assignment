require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

const bodyParser = require("body-parser");
const packageRouter = require("./controllers/package");
const dataToObjArray = require("./utils/helpers");

app.use(cors());

app.use(bodyParser.json());

// read the txt file and create an array of packages
dataToObjArray();

//serve static build files for prduction
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

//routes for the packages
app.use("/api/packages", packageRouter);

app.get("*", (_request, response) => {
  response.sendFile(path.join(__dirname, "client/build", "index.html"));
});

//handle unknown end points
app.use(function (_request, _response) {
  return res.status(404).send({ error: "unknown endpoint" });
});

module.exports = app;
