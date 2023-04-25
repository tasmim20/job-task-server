const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.izqajim.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const sectorsCollection = client
      .db("jobTask")
      .collection("sectorsSelections");

    app.get("/sectors", async (req, res) => {
      const query = {};
      const cursor = sectorsCollection.find(query);
      const sectors = await cursor.toArray();
      res.send(sectors);
    });
  } finally {
  }
}
run().catch((error) => console.log(error));

app.get("/", async (req, res) => {
  res.send("job task server is running");
});

app.listen(port, () => console.log(`job task server running on ${port}`));
