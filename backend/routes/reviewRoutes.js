const express = require('express');
const axios = require('axios');
const router = express.Router();
const Review = require('../models/Review');

// POST /api/reviews
router.post('/', async (req, res) => {
  try {
    const { reviewText, rating, userId, buyerId } = req.body;

    // 1️⃣ Call your Flask API
    const response = await axios.post('http://localhost:5000/predict', {
      review: reviewText,
      rating,
      user_id: userId,
      original_buyer_id: buyerId
    });

    const { prediction, fake_probability } = response.data;

    // 2️⃣ Save review + label into MongoDB
    const review = await Review.create({
      text: reviewText,
      rating,
      user: userId,
      label: prediction,            // “Fake” or “Genuine”
      fakeProbability: fake_probability
    });

    res.status(201).json(review);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Review submission failed' });
  }
});

module.exports = router;



// ── Add this GET route to fetch reviews by productId ──
router.get('/', async (req, res) => {
  try {
    const { productId } = req.query;
    if (!productId) {
      return res.status(400).json({ error: 'Missing productId' });
    }
    const reviews = await Review.find({ productId });
    res.json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

// ── Your existing POST route to submit & label reviews ──
router.post('/', async (req, res) => {
  try {
    const { reviewText, rating, userId, buyerId, productId } = req.body;

    // Call Flask API...
    // Save Review.create({ productId, text: reviewText, ... })

    // (your existing code here)
  } catch (err) {
    // existing error handling...
  }
});

module.exports = router;
