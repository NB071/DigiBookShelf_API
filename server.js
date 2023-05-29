require("dotenv").config();

const path = require("node:path");
const cron = require('node-cron');
const express = require("express");
const cors = require("cors");
const http = require("http");
const socketIO = require("socket.io");
const app = express();
const server = http.createServer(app);

// for cron job 
const knexConfig = require("./knexfile");
const { knex } = require("knex");
const db = knex(knexConfig);

cron.schedule('0 0 * * 0', async () => {
  try {
    await db.seed.run({ specific: '000_book_NYT_best_seller.js' });
    console.log('Seed completed successfully');
  } catch (error) {
    console.error('Seed failed:', error);
  }
});

// middlewares
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
server.listen(process.env.PORT, function () {
  console.log("🚀 Server is running on port: " + process.env.PORT);
});
