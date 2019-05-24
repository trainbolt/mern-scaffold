const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const bcrypt = require("bcrypt");
const auth = express.Router();

const keys = require("../config/keys");
const User = require("../models/User");

auth.use(cors());

auth.get("/checkLoginStatus", () => {});

auth.post("/login", (req, res, next) => {
  passport.authenticate("login", (err, users, info) => {
    if (err) {
      console.error(`error ${err}`);
    }
    if (info !== undefined) {
      console.error(info.message);
      if (info.message === "bad username") {
        res.status(401).send(info.message);
      } else {
        res.status(403).send(info.message);
      }
    } else {
      req.logIn(users, () => {
        User.findOne({
          where: {
            email: req.body.email
          }
        }).then(user => {
          if (user) {
            if (bcrypt.compareSync(req.body.password, user.password)) {
              const token = jwt.sign({ id: user.id }, keys.SECRET_KEY);
              delete user.password;
              res.status(200).send({
                user,
                token,
                message: "user found & logged in"
              });
            }
          }
        });
      });
    }
  })(req, res, next);
});

auth.post("/register", (req, res, next) => {
  passport.authenticate("register", (err, user, info) => {
    if (err) {
      console.error(err);
    }
    if (info !== undefined) {
      console.error(info.message);
      res.status(403).send(info.message);
    } else {
      // eslint-disable-next-line no-unused-vars
      req.logIn(user, error => {
        const dateNow = new Date();
        const userData = {
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email: req.body.email,
          createdAt: dateNow
        };
        User.findOne({
          where: {
            email: userData.email
          }
        }).then(user => {
          console.log(user);
          user.update(userData).then(() => {
            console.log("user created in db");
            res.status(200).send({ message: "user created" });
          });
        });
      });
    }
  })(req, res, next);
});

module.exports = auth;
