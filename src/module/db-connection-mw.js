const mongoclient = require('mongodb').MongoClient;
const config = require("../config.js");

module.exports = (app) => function(req,res,next){
  
  if (typeof app.get('mongodb') == 'undefined') { 
    mongoclient.connect(config.mongo.url, function(_err, connection) {
        if (!_err) {
            connection.on('close', function() {
                app.set('mongodb', undefined);
            });
            app.set('mongodb', connection.db(config.mongo.database));
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
