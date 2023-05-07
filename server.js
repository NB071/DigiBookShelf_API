require("dotenv").config();

const path = require("node:path");
const express = require("express");
const app = express();
const cors = require("cors");
const { PORT } = process.env;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
 

// routes from controllers
const apiRoute = require("./routes/apiRoute");
const videoRoute = require("./routes/videoRoute");

// routes
app.use('/api', apiRoute)
app.use('/videos', videoRoute)


// listener
app.listen(PORT, function () {
  console.log("🚀 Server is running on port: " + PORT);
});
