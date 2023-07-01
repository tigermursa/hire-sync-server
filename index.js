const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
// MONGODB CODE

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.1nqrclq.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
//important note : remove try function before vercel deploy
async function run() {
  const jobsCollection = client.db("jobs").collection("jobsCollection");

  app.get("/jobs", async (req, res) => {
    const result = await jobsCollection.find().toArray();
    res.send(result);
  });

  //  GET specific user by ID
  app.get("/jobs/:id", async (req, res) => {
    const id = req.params.id;
    console.log("fetching user", id);
    const query = { _id: new ObjectId(id) };
    const result = await jobsCollection.findOne(query);
    res.send(result);
  });

  // Send a ping to confirm a successful connection
  await client.db("admin").command({ ping: 1 });
  console.log("Pinged your deployment. You successfully connected to MongoDB!");
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("hire sync running Alhamdulillah!");
});
// starting the server
app.listen(port, () => {
  console.log(`Alhamdulillah the server running at the ${port} port`);
});
