const path = require("path");
const express = require("express");
const socketio = require("socket.io");
const port = 3000 || process.env.PORT;
const app = express();
let http = require("http").createServer(app);
//const server = http.createServer(app);
const io = socketio(http);

//middlewares

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.static(__dirname + "/public"));

var cors = require("cors");

let dbConnect = require("./dbConnect");
let projectRoutes = require("./routes/projectRoutes");
let pageRoutes = require("./routes/pageRoutes");

app.use(cors());
app.use("/api/projects", projectRoutes);
app.use("/", pageRoutes);

let client = require("./dbConnect");

//listener to look out for when a user connects to the socket
io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  setInterval(() => {
    socket.emit("number", parseInt(Math.random() * 10));
  }, 1000);
});

//api for testing

app.get("/addTwoNumbers/:firstNumber/:secondNumber", function (req, res, next) {
  var firstNumber = parseInt(req.params.firstNumber);
  var secondNumber = parseInt(req.params.secondNumber);
  var result = firstNumber + secondNumber || null;
  if (result == null) {
    res.json({ result: result, statusCode: 400 }).status(400);
  } else {
    res.json({ result: result, statusCode: 200 }).status(200);
  }
});

app.get("/name/:firstName/:surname", function (req, res, next) {
  // change first letter of surname to uppercase. Source info is from here: https://flexiple.com/javascript/javascript-capitalize-first-letter/
  firstName =
    req.params.firstName.charAt(0).toUpperCase() +
    req.params.firstName.slice(1);
  surname =
    req.params.surname.charAt(0).toUpperCase() + req.params.surname.slice(1);
  let fullName = firstName + " " + surname || null;
  if (fullName == null) {
    res.json({ fullName: fullName, statusCode: 400 }).status(400);
  } else {
    res.json({ fullName: fullName, statusCode: 200 }).status(200);
  }
});

http.listen(port, () => {
  console.log("listening on *:3000");
});
