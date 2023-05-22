require("dotenv").config();

const path = require("node:path");
const express = require("express");
const cors = require("cors");
const http = require("http");
const socketIO = require("socket.io");
const app = express();
const { PORT } = process.env;
const server = http.createServer(app);

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

const io = socketIO(server, {
  cors: {
    origin: "*",
  },
});

// routes from controllers
const apiRoute = require("./routes/apiRoute");
const videoRoute = require("./routes/videoRoute");
const socketController = require("./controllers/socketController");

// routes
app.use("/api", apiRoute);
app.use("/videos", videoRoute);
socketController.socketController(io);

// listener
server.listen(PORT, function () {
  console.log("🚀 Server is running on port: " + PORT);
});
