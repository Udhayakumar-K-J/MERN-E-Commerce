import { useState, useEffect } from 'react';
import axios from 'axios';
import FingerprintJS from '@fingerprintjs/fingerprintjs';

export default function ReviewForm() {
  const [reviewText, setReviewText] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [visitorId, setVisitorId] = useState('');

  useEffect(() => {
    FingerprintJS.load().then(fp => {
      fp.get().then(result => {
        setVisitorId(result.visitorId);
      });
    });
  }, []);

  const submitReview = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/reviews/predict', {
        reviewText,
        email,
        phone,
        fingerprint: visitorId
      });
      alert("Review Status: " + res.data.label);
    } catch (err) {
      alert("Error posting review.");
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Submit Your Review</h2>
      <textarea
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        placeholder="Write review..."
      />
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Phone"
      />
      <button onClick={submitReview}>Submit Review</button>
    </div>
  );
}
