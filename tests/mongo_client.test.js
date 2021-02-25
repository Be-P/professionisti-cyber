const mongo_connection = require("mongo_client")
const config = require("config")

test('should import mongo_connection',async ()=>{
  const connection = await mongo_connection();
  const db = connection.db(config.databaseName);
  /*
  await db.collection("test").insertMany([
    {
      item:'test1',
      tag: ['pentest','incident response']
    },
    {
      item:'test2',
      tag: ['VA']
    }
  ]);
  */
  const cursor = db.collection("test").find({});
  
  await cursor.forEach(console.log);

  connection.close();
});
