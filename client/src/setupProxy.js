const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(proxy(["/auth"], { target: "http://localhost:5000" }));
};

/*
 * Will need to update this for https on production...
 *
 * As mentioned in /server/routes/apiRoutes.js, if you have
 * other endpoints that need to hit the node/express server
 * instead of local React routing you need to enter them in
 * the proxy array above.
 *
 * NOTE:
 * This is ONLY for local development. In production it won't
 * matter.
 */
