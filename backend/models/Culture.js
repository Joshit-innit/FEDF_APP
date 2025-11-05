const mongoose = require('mongoose');

const cultureSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    enum: ['Art', 'Music', 'Dance', 'Literature', 'Architecture', 'Philosophy', 'Language'],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  region: {
    type: String,
    required: true
  },
  historicalPeriod: String,
  significance: {
    type: String,
    required: true
  },
  notableFigures: [String],
  examples: [String],
  images: [String],
  videos: [String],
  relatedFestivals: [String]
}, {
  timestamps: true
});

module.exports = mongoose.model('Culture', cultureSchema);
