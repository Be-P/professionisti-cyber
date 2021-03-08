module.exports = (app) => function(req,res,next){
  app.get("/hello-world",function(req,res){
    res.end("ciao a tutti");
  });  
  next();
}
