const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  cuisine: {
    type: String,
    required: true
  },
  region: {
    type: String,
    required: true
  },
  ingredients: [{
    name: String,
    quantity: String,
    unit: String
  }],
  instructions: [String],
  prepTime: {
    type: String,
    required: true
  },
  cookTime: {
    type: String,
    required: true
  },
  servings: {
    type: Number,
    required: true
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    required: true
  },
  images: [String],
  tags: [String],
  occasion: {
    type: String,
    enum: ['Festival', 'Wedding', 'Daily', 'Special', 'Street Food', 'Breakfast', 'Lunch', 'Dinner', 'Snack']
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Recipe', recipeSchema);
