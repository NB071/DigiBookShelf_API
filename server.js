require("dotenv").config();

const path = require("node:path");
const express = require("express");
const app = express();
const cors = require("cors");
const {authorize} = require("./utils/Authorize_middleware")
const { PORT } = process.env;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
// app.use(authorize)

// routes from controllers
const accountRoute = require("./routes/accountRoute");

// routes
app.use('/api/account', accountRoute)


// listener
app.listen(PORT, function () {
  console.log("🚀 Server is running on port: " + PORT);
});
