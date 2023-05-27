const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.sb5ycdx.mongodb.net/?retryWrites=true&w=majority`;



const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        
        const orderCollection = client.db('stockPrice').collection('priceEmail')




        app.post('/orders', async (req, res) => {
            const order = req.body;
            const result = await orderCollection.insertOne(order)
            res.send(result)
        })


        app.get("/allEmail", async (req, res) => {
            const email = req.query.email;
      
            const allEmailData = await orderCollection.find({ email }).toArray();
            res.send(allEmailData);
          });


    }
    finally {

    }
}
run().catch(err => console.error(err));

app.get('/', (req, res) => {
    res.send('car server is running')
})

app.listen(port, () => {
    console.log(`genius car server is running ${port}`);
})