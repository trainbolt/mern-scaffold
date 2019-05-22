const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

require("./models/User");

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

/*
 * Just for authRoutes, but could extend to others
 * like /api etc.
 *
 * If other routes should resolve here you need
 * to add them to /client/setupProxy.js
 */

var auth = require("./routes/authRoutes");
app.use("/auth", auth);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
