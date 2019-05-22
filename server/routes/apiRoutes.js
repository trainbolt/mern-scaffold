/*
 * This file is for example only.
 * You probably want to break up any api endpoints into separate
 * files for endpoint grouped functions
 *
 * requireLogin will lock down these routes
 */

/*


const keys = require("../config/keys");
const requireLogin = require("../middlewares/requireLogin");
const orders = express.Router();

const Orders = require("../models/Order");

orders.get("/all", (req, res) => {
  const dateNow = new Date();
  const userData = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
    createdAt: dateNow
  };

  Order.findOne({
    where: { ... }
  }) ...

...


*/
