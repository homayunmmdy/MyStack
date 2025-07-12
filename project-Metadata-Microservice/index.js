var express = require("express");
var cors = require("cors");
require("dotenv").config();
var app = express();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

/*-----------------------------------------------------------------------------------------*/
/*---------------------------------------MY CODE-------------------------------------------*/
/*-----------------------------------------------------------------------------------------*/

app.post(
  "/api/fileanalyse",
  upload.single("upfile"),
  function (req, res, next) {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    const response = {
      name: req.file.originalname,
      type: req.file.mimetype,
      size: req.file.size,
    };

    res.json(response);
  }
);

/*=========================================================================================*/

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
