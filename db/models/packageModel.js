const mongoose = require("mongoose");
const packageSchema = mongoose.Schema({
  packageName: String,
  description: String,
  dependsOn: String,
  reverseDependency: [String],
  tags: [String],
  note: [String],
});

packageSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("PackageModel", packageSchema);
