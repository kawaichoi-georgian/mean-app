const connectDB = require('../config/db');

// @desc Get all items
const getItems = async (req, res) => {
  try {
    const db = await connectDB();
    const items = await db.collection("items").find().toArray();
    res.json(items);
  } catch (err) {
    console.error("❌ Error fetching items:", err);
    res.status(500).json({ error: err.message });
  }
};

// @desc Add new item
const addItem = async (req, res) => {
  try {
    const db = await connectDB();
    const collection = db.collection('items'); // your collection name
    const { name } = req.body;

    // Check if item already exists
    const existingItem = await collection.findOne({ name });
    if (existingItem) {
      return res.status(400).json({ error: 'Duplicate item' });
    }

    const result = await collection.insertOne({ name, createdAt: new Date()  });
    res.status(201).json({ message: "Item added", savedItem: { _id: result.insertedId, name } });
  } catch (err) {
    console.error("❌ Error adding item:", err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getItems, addItem };
