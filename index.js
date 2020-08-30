const app = require("./app");
const http = require("http");

const config = require("./utils/config");

const connectDb = require("./db/database");

connectDb()
  .then(() => {
    console.log("Databse is connected");
  })
  .catch(() => {
    console.log("error connecting database");
  });

const server = http.createServer(app);

server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
