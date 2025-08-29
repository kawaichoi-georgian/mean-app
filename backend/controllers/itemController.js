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
    const { name } = req.body;
    const result = await db.collection("items").insertOne({ name });
    res.status(201).json({ message: "Item added", savedItem: result.ops ? result.ops[0] : { _id: result.insertedId, name } });
  } catch (err) {
    console.error("❌ Error adding item:", err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getItems, addItem };
