const mongoose = require('mongoose');

const festivalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  significance: {
    type: String,
    required: true
  },
  traditions: [String],
  foods: [String],
  images: [String],
  region: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['Religious', 'Harvest', 'Seasonal', 'Cultural', 'National'],
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Festival', festivalSchema);
