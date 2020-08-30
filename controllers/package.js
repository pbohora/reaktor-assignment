const packageRouter = require("express").Router();
const services = require("../services/packageService");
const PackageObj = require("../db/models/packageModel");

packageRouter.get("/", async (_request, response) => {
  try {
    const packageData = await services.queryPackages();
    response.status(200).json(packageData);
  } catch (error) {
    resp.status(400).json({ error });
  }
});

packageRouter.put("/:id", async (request, response) => {
  const { tagBody, noteBody } = request.body;
  const { id } = request.params;
  try {
    const updatedPackage = await services.updatePackage(id, tagBody, noteBody);
    response.status(200).json(updatedPackage);
  } catch (error) {
    res.status(400).json({ error });
  }
});

packageRouter.get("/:id", async (_request, response) => {
  try {
    const packageData = await services.queryPackage();
    response.status(200).json(packageData);
  } catch (error) {
    response.status(400).json({ error });
  }
});

module.exports = packageRouter;
