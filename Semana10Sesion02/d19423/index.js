const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://rpineda:Ysb39VAkymQPyKl4@cluster0.6znffma.mongodb.net/";
const client = new MongoClient(uri);
async function run() {
    try {
        await client.connect();
        const db = client.db('sample_mflix');
        const collection = db.collection('movies');
        const first = await collection.findOne();
        console.log(first);
    } catch (error) {
        await client.close();
    }
}

run().catch(console.error)