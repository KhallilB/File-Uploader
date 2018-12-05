const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const multer = require("multer");
const cors = require("cors");
const mongoose = require("mongoose");

// const corsOptions = {
//   origin: "http://localhost:4200",
//   optionsSuccessStatus: 200
// };

app.use(cors());

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Credentials", "true");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

/** Serving from the same express Server
No cors required */
app.use(express.static("../client"));
app.use(bodyParser.json());

// mongoose.connect(
//   "mongodb://localhost/fileUpload",
//   { useNewUrlParser: true }
// );

// var storage = multer.diskStorage({
//   //multers disk storage settings
//   destination: function(req, file, cb) {
//     cb(null, "");
//   },
//   filename: function(req, file, cb) {
//     var datetimestamp = Date.now();
//     cb(
//       null,
//       file.fieldname +
//         "-" +
//         datetimestamp +
//         "." +
//         file.originalname.split(".")[file.originalname.split(".").length - 1]
//     );
//   }
// });

// var storage = require("multer-gridfs-storage")({
//   url: "mongodb://localhost:3001/fileUpload",
//   useNewUrlParser: true
// });
MongoClient.connect("mongodb://localhost:3001/fileUpload").then(database => {
  storage = new GridFSStorage({ db: database });
});

const promise = MongoClient.connect("mongodb://localhost:3001/fileUpload");
const storage = new GridFSStorage({ db: promise });

const upload = multer({
  //multer settings
  storage: storage
}).single("file");

/** API path that will upload the files */
app.post("/upload", cors(), function(req, res) {
  upload(req, res, function(err) {
    console.log(req.file);
    if (err) {
      res.json({ error_code: 1, err_desc: err });
      return;
    }
    res.json({ error_code: 0, err_desc: null });
  });
});

app.listen("3001", () => {
  console.log("running on 3001...");
});
