const { MongoClient } = require('mongodb'); 

const uri = process.env.MONGO_URI;  // pulled from .env
let db;

console.log("MONGO_URI:", process.env.MONGO_URI ? "Loaded ✅" : "Not found ❌");

async function connectDB() {
  if (db) return db;

  try {
    console.log("⏳ Connecting to MongoDB Atlas...");
    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await client.connect();
    db = client.db("meanapp");  // replace with your DB name
    console.log("✅ MongoDB Atlas Connected");
    return db;
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    throw err;
  }
}

module.exports = connectDB;
