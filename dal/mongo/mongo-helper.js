const { MongoClient, ServerApiVersion } = require('mongodb');


class MongoHelper {
  initConnection = async () => {
    const uri = process.env.mongoURL;
    const database = process.env.database
    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });

    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      const connection = client.db(database);
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
      return connection
    } finally {
      // Ensures that the client will close when you finish/error
      // await client.close();
    }
  }
}


module.exports = MongoHelper