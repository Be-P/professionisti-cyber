const express = require("express");

function checkAuthentication(req,res,next){
  if(!req.isAuthenticated()){
    res.status(403)
      .json({message:"Login is required"})
      .end();
  }else{
    next();
  }
}

function configureApp(app,req,res,next) {
  if(app.get("authenticatedRoutes")!==undefined) return;
  
  console.log("Configuring authenticatedRoutes");

  const authenticatedRouter = express.Router();
  
  authenticatedRouter.get("/user",(req,res)=>{
    res.json(req.user).end();
  });

  app.use("/authenticated",checkAuthentication, authenticatedRouter);
  
  app.set("authenticatedRoutes",true);
}

module.exports = (app) => function(req,res,next){
  configureApp(app,req,res,next);
  next();
}
