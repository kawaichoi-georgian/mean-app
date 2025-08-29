const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: {
    type: String,
    required: true,
    unique: true,       // ensures no duplicates at the DB level
    trim: true
  },
    createdAt: {
    type: Date,
    default: Date.now   // automatically set to current timestamp
  }
});

module.exports = mongoose.model('Item', itemSchema);