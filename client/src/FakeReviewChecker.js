import React, { useState } from 'react';

const FakeReviewChecker = () => {
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [result, setResult] = useState(null);

  const handleReviewChange = (e) => setReview(e.target.value);
  const handleRatingChange = (e) => setRating(Number(e.target.value));

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ review, rating }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error:', error);
      setResult({ prediction: 'Error', fake_probability: 0 });
    }
  };

  return (
    <div>
      <h2>Fake Review Detection</h2>

      <textarea
        value={review}
        onChange={handleReviewChange}
        placeholder="Enter a review"
        rows="5"
        cols="50"
      />
      <br />

      <label>Select rating (1 to 5 stars): </label>
      <select value={rating} onChange={handleRatingChange}>
        <option value="0">--Select--</option>
        {[1, 2, 3, 4, 5].map((val) => (
          <option key={val} value={val}>{val}</option>
        ))}
      </select>
      <br />

      <button onClick={handleSubmit}>Check Review</button>

      {result && (
        <div style={{ marginTop: '20px' }}>
          <h3 style={{ color: result.prediction === 'Fake' ? 'red' : 'green' }}>
            {result.prediction === 'Fake' ? '❌ Fake Review' : '✅ Genuine Review'}
          </h3>
          <p>🔍 Probability of being fake: {(result.fake_probability * 100).toFixed(2)}%</p>
        </div>
      )}
    </div>
  );
};

export default FakeReviewChecker;
