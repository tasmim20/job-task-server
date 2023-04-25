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
    const sectorsCollection = client.db("jobTask").collection("sectorsSelections");
    const selectionsCollection = client.db("jobTask").collection("selections");


      //sectors get api
    app.get("/sectors", async (req, res) => {
      const query = {};
      const cursor = sectorsCollection.find(query);
      const sectors = await cursor.toArray();
      res.send(sectors);
    });

  //selections get api
  app.get('/selections', async (req, res)=>{
    const result = await selectionsCollection.find({}).toArray();
    if(result.length){
        res.send({result, success: true})
    }
    else{
        res.send({success: false, message: 'Something went wrong'})
    }
})



   //sectors selection post api
   app.post('/selections', async(req, res) =>{
    const selection = req.body;
    const result = await selectionsCollection.insertOne(selection);
    if(result.insertedId){
        res.send({result, success: true})
    }
    else{
        res.send({success: false, message : 'Something went wrong'})
    }
   })
   



  } finally {
  }
}
run().catch((error) => console.log(error));

app.get("/", async (req, res) => {
  res.send("job task server is running");
});

app.listen(port, () => console.log(`job task server running on ${port}`));
