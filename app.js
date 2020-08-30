require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

const bodyParser = require("body-parser");
const packageRouter = require("./controllers/package");

const Package = require("./db/models/packageModel");

let fs = require("fs");

app.use(cors());

app.use(bodyParser.json());

// read the txt file and create an array of packages
fs.readFile("data.txt", async function (err, buf) {
  const packageList = await Package.find({});
  const arrayPackage = buf
    .toString()
    .replace(/\r/g, "")
    .split(/\n\s*\n/);

  let arr = arrayPackage.map((cap) => {
    var obj = {};

    let c = cap.split("\n");

    for (let i = 0, l = c.length; i < l; i++) {
      let chunk = c[i].split(": ");

      if (chunk[1] === undefined && obj.Description) {
        obj["Description"] = obj.Description.concat(chunk[0]);
      }

      obj[chunk[0]] = chunk[1];
    }
    return obj;
  });

  for (let i = 0, l = arr.length; i < l; i++) {
    const reverse = arr.filter(
      (a) => a.Depends && a.Depends.includes(arr[i].Package)
    );
    arr[i]["reverse"] = reverse.map((r) => r.Package);
  }
  if (packageList.length < 1) {
    arr.map((a) => {
      savePackageToDb(a);
    });
  }
});

const savePackageToDb = async (package) => {
  const packageObj = new Package({
    packageName: package.Package,
    description: package.Description,
    dependsOn: package.Depends,
    reverseDependency: package.reverse,
  });

  await packageObj.save();
};

app.use(express.static("client/build"));

app.use("/api/packages", packageRouter);

app.get("*", (_request, response) => {
  response.sendFile(path.join(__dirname, "client/build", "index.html"));
});

app.use(function (_request, response) {
  return res.status(404).send({ error: "unknown endpoint" });
});

module.exports = app;
