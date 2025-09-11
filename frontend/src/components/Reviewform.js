import React, { useState } from 'react';
import axios from 'axios';

function ReviewForm() {
  const [review, setReview] = useState('');
  const [result, setResult] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5000/predict', {
        review: review,
      });
      setResult(response.data.prediction);
    } catch (error) {
      console.error('Prediction error:', error);
      setResult('Error occurred');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Enter your review"
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Check Review
        </button>
      </form>
      {result && (
        <div className="mt-4 text-lg font-semibold">
          Result: {result === 1 ? 'Fake Review ❌' : 'Genuine Review ✅'}
        </div>
      )}
    </div>
  );
}

export default ReviewForm;
