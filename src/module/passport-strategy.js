const config = require("../config.js");

module.exports = (app) => function(req,res,next){
  console.log(config.oauth.linkedin.clientId);
  console.log(config.oauth.linkedin.clientSecret.substring(0,2));
  next();
}
