const packageRouter = require("express").Router();
const PackageObj = require("../models/packageModel");

packageRouter.get("/", async (request, response, next) => {
  const packages = await PackageObj.find({});
  response.status(200).json(packages.map((package) => package.toJSON()));
});

packageRouter.put("/:id", async (request, response, next) => {
  const { tagBody, noteBody } = request.body;
  const updatePackage = await PackageObj.findById(request.params.id);

  if (tagBody) {
    updatePackage.tags = updatePackage.tags.concat(tagBody);
  }
  if (noteBody) {
    updatePackage.note = updatePackage.note.concat(noteBody);
  }
  const updatedPackage = await updatePackage.save();

  response.status(200).json(updatedPackage.toJSON());
});

packageRouter.get("/:id", async (request, response, next) => {
  const singlePackage = await PackageObj.findById(request.params.id);
  response.status(200).json(singlePackage.toJSON());
});

module.exports = packageRouter;
