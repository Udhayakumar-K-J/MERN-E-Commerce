import { useState } from 'react';
import axios from 'axios';

export default function ReviewForm({ productId, userId, buyerId }) {
  const [text, setText] = useState('');
  const [rating, setRating] = useState(5);

  const submitReview = async () => {
    try {
      const res = await axios.post('/api/reviews', {
        reviewText: text,
        rating,
        userId,
        buyerId
      });
      alert(`Review submitted as ${res.data.label}`);
    } catch (err) {
      alert('Failed to submit review');
    }
  };

  return (
    <div>
      <textarea value={text} onChange={e => setText(e.target.value)} />
      <select value={rating} onChange={e => setRating(+e.target.value)}>
        {[1,2,3,4,5].map(n=> <option key={n} value={n}>{n}★</option>)}
      </select>
      <button onClick={submitReview}>Submit Review</button>
    </div>
  );
}
