const PackageObj = require("../db/models/packageModel");

const queryPackages = async () => {
  try {
    const packages = await PackageObj.find({});
    return packages.map((packageData) => packageData.toJSON());
  } catch (error) {
    return error;
  }
};

const queryPackage = async (id) => {
  try {
    const packageData = await PackageObj.findById(id);
    return packageData.toJSON();
  } catch (error) {
    return error;
  }
};

const savePackageToDb = async (package) => {
  try {
    const packageObj = new Package({
      packageName: package.Package,
      description: package.Description,
      dependsOn: package.Depends,
      reverseDependency: package.reverseDependency,
    });

    await packageObj.save();
  } catch (error) {
    return error;
  }
};

const updatePackage = async (id, tag, note) => {
  try {
    const packageData = await PackageObj.findById(id);
    if (tag) {
      packageData.tags = packageData.tags.concat(tag);
    }
    if (note) {
      packageData.note = packageData.note.concat(note);
    }
    const updatedPackage = await packageData.save();

    return updatedPackage.toJSON();
  } catch (error) {
    return error;
  }
};

module.exports = {
  queryPackages,
  queryPackage,
  savePackageToDb,
  updatePackage,
};
