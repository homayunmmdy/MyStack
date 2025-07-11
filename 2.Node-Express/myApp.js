let express = require("express");
const bodyParser = require('body-parser');  
let app = express();

// Use body-parser middleware for URL-encoded data
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
});

app.use("/public", express.static(__dirname + "/public"));

app.get("/now", function (req, res, next) {
    req.time = new Date().toString();
    next();
  },
  function (req, res) {
    res.json({ time: req.time });
  }
);

require("dotenv").config();

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/json", function (req, res) {
  let message = "Hello json";

  if (process.env.MESSAGE_STYLE === "uppercase") {
    message = message.toUpperCase();
  }

  res.json({ message: message });
});

app.get('/:word/echo', function(req , res) {
  const word = req.params.word;
  res.json({echo : word})
})

app.get('/name' , function(req,res) {
  const firstName = req.query.first;
  const lastName = req.query.last;

  res.json({ name: `${firstName} ${lastName}` });
})

app.post('/name',function(req,res)  {
  const firstName = req.body.first;
  const lastName = req.body.last;

  res.json({name : `${firstName} ${lastName}`})
})


module.exports = app;
