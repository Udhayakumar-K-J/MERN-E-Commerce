const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  productId: {      // ← new field
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  text: String,
  rating: Number,
  user: String,
  label: String,        // “Fake” or “Genuine”
  fakeProbability: Number
});

module.exports = mongoose.model('Review', reviewSchema);
