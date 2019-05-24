const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const fs = require("fs");
const http = require("http");
const https = require("https");
const privateKey = fs.readFileSync("sslcert/server.key", "utf8");
const certificate = fs.readFileSync("sslcert/server.crt", "utf8");

const credentials = { key: privateKey, cert: certificate };

//require("./models/User");
require("./passport");

const app = express();
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());

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

if (process.env.NODE_ENV === "production") {
  const httpsServer = https.createServer(credentials, app);
  httpsServer.listen(8443);
} else {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT);
}
