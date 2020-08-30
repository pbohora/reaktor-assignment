const PackageObj = require("../db/models/packageModel");

export const queryPackages = async () => {
  try {
    const packages = await PackageObj.find({});
    return packages.map((package) => package.toJSON());
  } catch (error) {
    return error;
  }
};

export const queryPackage = async (id) => {
  try {
    const package = await PackageObj.findById(id);
    return package.toJSON();
  } catch (error) {
    return error;
  }
};

const updatePackage = async (id, tag, note) => {
  try {
    const package = await queryPackage(id);
    if (tag) {
      updatePackage.tags = package.tags.concat(tagBody);
    }
    if (note) {
      updatePackage.note = package.note.concat(noteBody);
    }
    const updatedPackage = await updatePackage.save();

    return updatedPackage.toJSON();
  } catch (error) {
    return error;
  }
};
