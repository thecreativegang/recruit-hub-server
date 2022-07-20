const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

//middle wire

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.uofdyvi.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run() {
  try {
    await client.connect();
    // const collection = client.db("database").collection("collection");
    console.log('DB Connected');

    //get requests
  } catch (error) {}
}
run().catch(console.dir);
app.get('/', async (req, res) => {
  res.json({ message: 'Server Running' });
});

app.listen(port, async (req, res) => {
  console.log('Listening to ', port);
});
