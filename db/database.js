const mongoose = require("mongoose");
const config = require("../utils/config");

const connectDb = (url = config.MONGODB_URI, opts = {}) => {
  return mongoose.connect(url, {
    ...opts,
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
};

module.exports = connectDb;
