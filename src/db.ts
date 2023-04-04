import { MongoClient } from 'mongodb';

async function connect() {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri!, { authMechanism: "DEFAULT" });
  await client.connect();

  return client.db('univ');
}

export default connect;
