const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const bcrypt = require("bcrypt");
const auth = express.Router();

const keys = require("../config/keys");
const User = require("../models/User");

auth.use(cors());

auth.get("/checkLoginStatus", (req, res, next) => {
  console.log("hit the check login status route.");
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err) {
      console.log(err);
    }

    const id = parseInt(req.query.id, 10);

    if (info !== undefined) {
      console.log(info.message);
      res.status(401).send(info.message);
    } else if (user.id === id) {
      User.findOne({
        where: {
          id
        }
      }).then(userInfo => {
        if (userInfo != null) {
          console.log("user found in db from findUsers");
          res.status(200).send({
            auth: true,
            first_name: userInfo.first_name,
            last_name: userInfo.last_name,
            email: userInfo.email,
            username: userInfo.username,
            password: userInfo.password,
            message: "user found in db"
          });
        } else {
          console.error("no user exists in db with that username");
          res.status(401).send("no user exists in db with that username");
        }
      });
    } else {
      console.error("jwt id and username do not match");
      res.status(403).send("username and jwt token do not match");
    }
  })(req, res, next);
});

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
              res
                .status(200)
                .cookie("token", token, { maxAge: 24 * 60 * 60 * 1000 }) // 24 hours
                .send({
                  user,
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
