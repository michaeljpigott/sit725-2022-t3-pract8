var express = require("express");
var pageRouter = express.Router();
const rootDir = process.cwd(); // the root directory of the project on your local computer

pageRouter.get("/", (req, res) => {
  let fileLocation = rootDir + "/public/index.html"; // creates absolute path for html file
  res.sendFile(fileLocation);
});

module.exports = pageRouter;
