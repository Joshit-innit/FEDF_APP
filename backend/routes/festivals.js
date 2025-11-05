const express = require('express');
const router = express.Router();
const Festival = require('../models/Festival');

// GET all festivals
router.get('/', async (req, res) => {
  try {
    const festivals = await Festival.find();
    res.json(festivals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET festival by ID
// GET festivals by region (define specific routes BEFORE id route)
router.get('/region/:region', async (req, res) => {
  try {
    const festivals = await Festival.find({ region: req.params.region });
    res.json(festivals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET festivals by category
router.get('/category/:category', async (req, res) => {
  try {
    const festivals = await Festival.find({ category: req.params.category });
    res.json(festivals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET festival by ID
router.get('/:id', async (req, res) => {
  try {
    const festival = await Festival.findById(req.params.id);
    if (!festival) {
      return res.status(404).json({ message: 'Festival not found' });
    }
    res.json(festival);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST new festival
router.post('/', async (req, res) => {
  try {
    const festival = new Festival(req.body);
    const savedFestival = await festival.save();
    res.status(201).json(savedFestival);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update festival
router.put('/:id', async (req, res) => {
  try {
    const festival = await Festival.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!festival) {
      return res.status(404).json({ message: 'Festival not found' });
    }
    res.json(festival);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE festival
router.delete('/:id', async (req, res) => {
  try {
    const festival = await Festival.findByIdAndDelete(req.params.id);
    if (!festival) {
      return res.status(404).json({ message: 'Festival not found' });
    }
    res.json({ message: 'Festival deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// (moved specific routes above)

module.exports = router;
