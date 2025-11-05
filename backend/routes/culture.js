const express = require('express');
const router = express.Router();
const Culture = require('../models/Culture');

// GET all culture items
router.get('/', async (req, res) => {
  try {
    const cultureItems = await Culture.find();
    res.json(cultureItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET culture item by ID
router.get('/:id', async (req, res) => {
  try {
    const cultureItem = await Culture.findById(req.params.id);
    if (!cultureItem) {
      return res.status(404).json({ message: 'Culture item not found' });
    }
    res.json(cultureItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST new culture item
router.post('/', async (req, res) => {
  try {
    const cultureItem = new Culture(req.body);
    const savedCultureItem = await cultureItem.save();
    res.status(201).json(savedCultureItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update culture item
router.put('/:id', async (req, res) => {
  try {
    const cultureItem = await Culture.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!cultureItem) {
      return res.status(404).json({ message: 'Culture item not found' });
    }
    res.json(cultureItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE culture item
router.delete('/:id', async (req, res) => {
  try {
    const cultureItem = await Culture.findByIdAndDelete(req.params.id);
    if (!cultureItem) {
      return res.status(404).json({ message: 'Culture item not found' });
    }
    res.json({ message: 'Culture item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET culture items by category
router.get('/category/:category', async (req, res) => {
  try {
    const cultureItems = await Culture.find({ category: req.params.category });
    res.json(cultureItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET culture items by region
router.get('/region/:region', async (req, res) => {
  try {
    const cultureItems = await Culture.find({ region: req.params.region });
    res.json(cultureItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
