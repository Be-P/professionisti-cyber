const MongoClient = require('mongodb').MongoClient;
const config = require("./config");

const url = 'mongodb://localhost:27017';

module.exports = async function (){

  const client = new MongoClient(url);

  const connection = new Promise( (resolve, reject)=>{ 
    client.connect( function(err, connection){
      if(err){
        reject(err);
      } else {
        resolve(connection)
      }
    });
  });
  return connection;
}
