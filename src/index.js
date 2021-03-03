const express = require('express');
const app = express();
const dbConnectionMw = require("./module/db-connection-mw.js")(app);
const passportStrategy = require("./module/passport-strategy.js")(app);
const authenticatedRoutes = require("./module/authenticated-routes.js")(app);
const routes = require("./module/routes.js")(app);
const dbService = require("./module/db-service.js")(app);

app.use(dbConnectionMw);         // This middleware will inject the database connection into the express app
app.use(dbService);              // This middleware will inject the mutation service into the express app
app.use(passportStrategy);       // Use passport strategy to ensure user authentication
app.use(authenticatedRoutes);    // These are all the authenticated routes
app.use(routes);                 // These are all the un-authenticated routes

app.use(express.static('public'));

const port = 8080;

app.listen(port, () => {
  console.log('App listening on port ' + port);
});
