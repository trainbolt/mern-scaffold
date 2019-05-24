const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const jwt_decode = require("jwt-decode");
const bcrypt = require("bcrypt");
const users = express.Router();

const keys = require("../config/keys");
const User = require("../models/User");

users.use(cors());

users.post("/register", async (req, res) => {
  const dateNow = new Date();
  const userData = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
    createdAt: dateNow
  };

  console.log("userData: ", userData);

  const user = await User.findOne({
    where: {
      email: req.body.email
    }
  });

  console.log("user: ", user);

  if (!user) {
    console.log("no user exists");
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      userData.password = hash;
      console.log("userData", userData);
      User.create(userData)
        .then(user => {
          let token = jwt.sign(user.dataValues, keys.SECRET_KEY, {
            expiresIn: "1 day"
          });
          res.send(token);
          res.redirect("/app/dashboard");
        })
        .catch(err => {
          res.send(`error: ${err}`);
        });
    });
  } else {
    res.json({
      error: "User already exists"
    });
  }
});

users.post("/login", (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          let token = jwt.sign(user.dataValues, keys.SECRET_KEY, {
            expiresIn: "1 day"
          });
          res.send(token);
        }
      } else {
        res.status(400).json({
          error: "Incorrect login details"
        });
      }
    })
    .catch(err => {
      res.status(400).json({
        error: err
      });
    });
});

users.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

users.get("/logged_in", (req, res) => {
  jwt.verify(req.token, keys.SECRET_KEY, err => {
    const status = err ? 401 : 200;
    res.sendStatus(status);
  });
});

module.exports = users;
