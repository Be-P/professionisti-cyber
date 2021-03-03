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

  // Search a list of pentester offers from the database
  async getPentesterOfferList(filter){
    return await this.db.collection("pentester-offers").find(filter).toArray(); 
  }

  // Add Pentester general information to the database
  async addPentesterInfo(pentesterId, pentesterName, pentesterLinkedinId, pentesterLinkedinUrl, pentesterLinkedinImage){
    const obj = {
      pentesterId,
      pentesterName,
      pentesterLinkedinId,
      pentesterLinkedinUrl,
      pentesterLinkedinImage
    }
    await this.db.collection("pentester-info").insertOne(obj);
  }

}

module.exports = (app) => async function(req,res,next) {

  const mongodb = app.get("mongodb");
  
  if ( app.get("service")===undefined ){
    app.set("service", new MongoDbService(mongodb));
  }

  // await app.get('service').addPentesterOffer("id","title","descr","price");

  next();

}


