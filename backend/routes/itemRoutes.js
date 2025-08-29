const express = require('express');
const { getItems, addItem } = require('../controllers/itemController');
const router = express.Router();

// GET all items
router.get('/', getItems);

// POST new item
router.post('/', addItem);

module.exports = router;
