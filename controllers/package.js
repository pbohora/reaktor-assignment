const packageRouter = require("express").Router();
const Package = require("../models/packageModel");

packageRouter.get("/", async (request, response, next) => {
  const packages = await Package.find({});
  response.status(200).json(packages.map((package) => package.toJSON()));
});

packageRouter.put("/:id", async (request, response, next) => {
  const { tagBody, noteBody } = request.body;
  const package = await Package.findById(request.params.id);
  package.tags = package.tags.concat(tagBody);
  package.note = package.note.concat(noteBody);
  const updatedPackage = await package.save();

  response.status(200).json(updatedPackage.toJSON());
});

packageRouter.get("/:id", async (request, response, next) => {
  const package = await Package.findById(request.params.id);
  response.status(200).json(package.toJSON());
});

module.exports = packageRouter;
