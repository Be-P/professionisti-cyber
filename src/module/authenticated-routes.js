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

  authenticatedRouter.get("/logout",(req,res)=>{
    req.logout();
    res.redirect("/");
  });
  
  authenticatedRouter.post("/upsertOffer",async (req,res)=>{
    try {
      const result = await app.get('service').upsertPentesterOffer(req.body.offerId,req.user.id,req.body.title,req.body.description,req.body.price);
      res.json(result).end();
    } catch(e){
      res.status(500).json(e).end();
    }

  });

  authenticatedRouter.get("/getOffers",async (req,res)=>{
    const result = await app.get('service').getPentesterOfferList({});
    res.json(result).end();
  });

  app.use("/authenticated",checkAuthentication, authenticatedRouter);
  app.set("authenticatedRoutes",true);
}

module.exports = (app) => function(req,res,next){
  configureApp(app,req,res,next);
  next();
}
