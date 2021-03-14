const config = require("../config.js");
const passport = require('passport');
const session = require("express-session");
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;

function configureApp(app,req){
 
  // Do nothing if passport is already configured
  if(app.get("passport")!==undefined) {
    return; 
  }

  console.log("Configuring passport linkedin strategy");
  
  // TODO should configure properly the session
  app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: "SECRET"
  }));

  app.use(passport.initialize());
  app.use(passport.session());

  // TODO should configure properly serialization of user
  passport.serializeUser(function (user, cb) {
    cb(null, user);
  });
  passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
  });

  passport.use(new LinkedInStrategy({
  clientID: config.oauth.linkedin.clientId,
  clientSecret: config.oauth.linkedin.clientSecret,
  callbackURL: "http://localhost:8080/auth/linkedin/callback",
  scope: ['r_emailaddress', 'r_liteprofile'],
  }, function(accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      // To keep the example simple, the user's LinkedIn profile is returned to
      // represent the logged-in user. In a typical application, you would want
      // to associate the LinkedIn account with a user record in your database,
      // and return that user instead.
      return done(null, profile);
    })
  }));

  app.get("/auth/linkedin", passport.authenticate("linkedin"));
  app.get("/auth/linkedin/callback", passport.authenticate("linkedin",{
    successRedirect: '/',
    failureRedirect: '/login'
  }));

  app.set("passport",passport);
}

module.exports = (app) => function(req,res,next){
  configureApp(app,req);
  next();
}
