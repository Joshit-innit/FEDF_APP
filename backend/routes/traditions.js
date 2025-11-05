const express = require('express');
const router = express.Router();
const Tradition = require('../models/Tradition');

// GET all traditions
router.get('/', async (req, res) => {
  try {
    const traditions = await Tradition.find();
    res.json(traditions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET tradition by ID
// GET traditions by region
router.get('/region/:region', async (req, res) => {
  try {
    const traditions = await Tradition.find({ region: req.params.region });
    res.json(traditions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET traditions by category
router.get('/category/:category', async (req, res) => {
  try {
    const traditions = await Tradition.find({ category: req.params.category });
    res.json(traditions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET tradition by ID
router.get('/:id', async (req, res) => {
  try {
    const tradition = await Tradition.findById(req.params.id);
    if (!tradition) {
      return res.status(404).json({ message: 'Tradition not found' });
    }
    res.json(tradition);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST new tradition
router.post('/', async (req, res) => {
  try {
    const tradition = new Tradition(req.body);
    const savedTradition = await tradition.save();
    res.status(201).json(savedTradition);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update tradition
router.put('/:id', async (req, res) => {
  try {
    const tradition = await Tradition.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!tradition) {
      return res.status(404).json({ message: 'Tradition not found' });
    }
    res.json(tradition);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE tradition
router.delete('/:id', async (req, res) => {
  try {
    const tradition = await Tradition.findByIdAndDelete(req.params.id);
    if (!tradition) {
      return res.status(404).json({ message: 'Tradition not found' });
    }
    res.json({ message: 'Tradition deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// (moved specific routes above)

module.exports = router;
