function addOffer(db,obj){
  db.collection("customers").insertOne(obj, function(err, res) {});

  console.log("get objects");
  db.collection("customers").find({}).toArray(function(err, result) {
    console.log(result);
  });

}
class MongoDbService {
  constructor(mongodb) {
    this.db = mongodb;
  }

  // Add a pentester offer to the database
  async addPentesterOffer(pentesterId,offerTitle,offerDescription,offerPrice){

    const obj = {
      pentesterId,
      offerTitle,
      offerDescription,
      offerPrice
    }
    
    await this.db.collection("pentester-offers").insertOne(obj);
  }

  async getPentesterOfferList(filter){
    return await this.db.collection("pentester-offers").find(filter).toArray(); 
  }
}

module.exports = (app) => async function(req,res,next) {

  const mongodb = app.get("mongodb");
  
  if ( app.get("service")===undefined ){
    app.set("service", new MongoDbService(mongodb));
  }
  
  await app.get("service").addPentesterOffer("pid","title","descr","price");
  const list = await app.get("service").getPentesterOfferList({});
  console.log("list",list);
  next();

}


