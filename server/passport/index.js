const bcrypt = require("bcrypt");
const Sequelize = require("sequelize");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const BCRYPT_SALT_ROUNDS = 12;
const Op = Sequelize.Op;

const keys = require("../config/keys");
const User = require("../models/User");

passport.use(
  "register",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
      session: false
    },
    (req, email, password, done) => {
      console.log(email);
      console.log(req.body.email);

      try {
        User.findOne({
          where: {
            email: req.body.email
          }
        }).then(user => {
          if (user != null) {
            console.log("username or email already taken");
            return done(null, false, {
              message: "username or email already taken"
            });
          }
          bcrypt.hash(password, BCRYPT_SALT_ROUNDS).then(hashedPassword => {
            User.create({
              password: hashedPassword,
              email: req.body.email
            }).then(user => {
              console.log("user created");
              return done(null, user);
            });
          });
        });
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      session: false
    },
    (email, password, done) => {
      try {
        User.findOne({
          where: {
            email
          }
        }).then(user => {
          if (user === null) {
            return done(null, false, { message: "bad username" });
          }
          bcrypt.compare(password, user.password).then(response => {
            if (response !== true) {
              console.log("passwords do not match");
              return done(null, false, { message: "passwords do not match" });
            }
            console.log("user found & authenticated");
            return done(null, user);
          });
        });
      } catch (err) {
        done(err);
      }
    }
  )
);

function cookieExtractor(req) {
  var token = null;
  if (req && req.cookies) {
    token = req.cookies["token"];
  }
  console.log("extracted token: ", token);
  return token;
}

const opts = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: keys.SECRET_KEY
};

passport.use(
  "jwt",
  new JWTstrategy(opts, (jwt_payload, done) => {
    try {
      User.findOne({
        where: {
          id: jwt_payload.id
        }
      }).then(user => {
        if (user) {
          console.log("user: ", user.id);
          console.log("user found in db in passport");
          done(null, user);
        } else {
          console.log("user not found in db");
          done(null, false);
        }
      });
    } catch (err) {
      done(err);
    }
  })
);
