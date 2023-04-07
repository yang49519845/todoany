const { MongoClient } = require('mongodb');

exports.connect = async function connect() {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri!, { authMechanism: "DEFAULT" });
  await client.connect();

  return client.db('todo');
};
