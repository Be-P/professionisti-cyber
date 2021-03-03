const mongoclient = require('mongodb').MongoClient;
const config = require("../config.js");

// Maybe move this function into its own middleware
async function addUniqueIndexes(mongodb){
  
  await mongodb.collection("pentester-offers").createIndex( { offerTitle:1, pentesterId:1 }, {unique:true });
  await mongodb.collection("pentester-info").createIndex( { pentesterId:1}, {unique:true });
  await mongodb.collection("pentester-info").createIndex( { pentesterLinkedinId:1}, {unique:true });

}


module.exports = (app) => function(req,res,next){
  
  if (typeof app.get('mongodb') == 'undefined') { 
    mongoclient.connect(config.mongo.url, function(_err, connection) {
        if (!_err) {
            connection.on('close', function() {
                app.set('mongodb', undefined);
            });
            app.set('mongodb', connection.db(config.mongo.database));

            // TODO maybe move this function in its own middleware
            addUniqueIndexes(app.get('mongodb'));

            next()
        } else {
            console.error(_err);
            app.set('mongodb', undefined);
            err = new Error(`Unable to connect to the database url ${config.mongo.url}`);
            next(err);
        }
    });
  } else { 
    next()
  }

}
