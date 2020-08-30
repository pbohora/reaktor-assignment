require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

const bodyParser = require("body-parser");
const packageRouter = require("./controllers/package");

const Package = require("./models/packageModel");

let fs = require("fs");
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.set("useUnifiedTopology", true);
mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => console.log("connected to the database"))
  .catch((error) =>
    console.log("error connecting to mongoDB: ", error.message)
  );

app.use(cors());

app.use(bodyParser.json());

//read the txt file and create an array of packages
// fs.readFile("data.txt", function (err, buf) {
//   const arrayPackage = buf
//     .toString()
//     .replace(/\r/g, "")
//     .split(/\n\s*\n/);

//   let arr = arrayPackage.map((cap) => {
//     var obj = {};

//     let c = cap.split("\n");

//     for (let i = 0, l = c.length; i < l; i++) {
//       let chunk = c[i].split(": ");

//       if (chunk[1] === undefined && obj.Description) {
//         obj["Description"] = obj.Description.concat(chunk[0]);
//       }

//       obj[chunk[0]] = chunk[1];
//     }
//     return obj;
//   });

//   for (let i = 0, l = arr.length; i < l; i++) {
//     const reverse = arr.filter(
//       (a) => a.Depends && a.Depends.includes(arr[i].Package)
//     );
//     arr[i]["reverse"] = reverse.map((r) => r.Package);
//   }
//   console.log(arr.length);
//   arr.map((a) => {
//     savePackageToDb(a);
//   });
// });

// const savePackageToDb = async (package) => {
//   const packageList = await Package.find({});
//   const packageObj = new Package({
//     packageName: package.Package,
//     description: package.Description,
//     dependsOn: package.Depends,
//     reverseDependency: package.reverse,
//   });
//   if (packageList.length < 1) {
//     await packageObj.save();
//   }
// };

app.use(express.static("client/build"));

app.use("/api/packages", packageRouter);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
