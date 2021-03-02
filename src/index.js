const express = require('express');
const app = express();
const dbConnectionMw = require("./module/db-connection-mw.js");
const dbConnectionCheckMw = require("./module/db-connection-check-mw.js");
const passportStrategy = require("./module/passport-strategy.js");
const authenticatedRoutes = require("./module/authenticated-routes.js");
const routes = require("./module/routes.js");

app.use(dbConnectionMw);         // This middleware will inject the mutation service into the express app
app.use(dbConnectionCheckMw);    // This middleware will return a 500 error if the connection with the database has failed
app.use(passportStrategy);       // Use passport strategy to ensure user authentication
app.use(authenticatedRoutes);    // These are all the authenticated routes
app.use(routes);                 // These are all the un-authenticated routes

const port = 8080;

app.listen(port, () => {
  console.log('App listening on port ' + port);
});
