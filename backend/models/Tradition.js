const mongoose = require('mongoose');

const traditionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  region: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['Wedding', 'Birth', 'Death', 'Religious', 'Social', 'Artistic', 'Spiritual', 'Festive', 'Clothing'],
    required: true
  },
  practices: [String],
  significance: {
    type: String,
    required: true
  },
  images: [String],
  videos: [String]
}, {
  timestamps: true
});

module.exports = mongoose.model('Tradition', traditionSchema);
