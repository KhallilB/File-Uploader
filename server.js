const express = require("express");
const cors = require("cors");
var corsOptions = {
  origin: "http://localhost:4200",
  optionsSuccessStatus: 200
};

const server = express();
server.use(cors(corsOptions));

port = process.env.Port || 4000;
server.listen(port, () => {
  console.log("Server Working!");
});
