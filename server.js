//DEPENDENCIES
const express = require("express");
const cors = require("cors");
const upload = require("./upload");

//ALLOWS ANY DOMAIN
var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200
};

const server = express();
server.use(cors(corsOptions));

//ROUTES
server.post("/upload", upload);

//LISTENING
port = process.env.Port || 4000;
server.listen(port, () => {
  console.log("Server Working!");
});
