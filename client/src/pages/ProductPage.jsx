import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import ReviewForm from '../components/ReviewForm';
import { AuthContext } from '../context/AuthContext';  // wherever you store user info

export default function ProductPage() {
  // 1️⃣ Get productId from URL
  const { id: productId } = useParams();

  // 2️⃣ Get current user from your auth context
  const { user } = useContext(AuthContext);  
  const userId = user?._id;   // or however you store it

  // 3️⃣ Determine buyerId — for now let’s assume the user has bought if there’s an order flag
  //    In reality you’d fetch “hasBought” from your backend. Here we default to true so reviews show genuine.
  const [hasBought, setHasBought] = useState(false);
  
  useEffect(() => {
    // example fetch to check if user bought this product
    axios.get(`/api/orders/hasBought?productId=${productId}&userId=${userId}`)
      .then(res => setHasBought(res.data.hasBought))
      .catch(() => setHasBought(false));
  }, [productId, userId]);

  // buyerId only set if user really bought
  const buyerId = hasBought ? userId : null;

  // 4️⃣ Fetch reviews
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    axios.get(`/api/reviews?productId=${productId}`)
      .then(res => setReviews(res.data))
      .catch(console.error);
  }, [productId]);

  return (
    <div>
      {/* … product details here … */}

      {/* 5️⃣ Review form */}
      <ReviewForm
        productId={productId}
        userId={userId}
        buyerId={buyerId}
      />

      {/* 6️⃣ Display reviews */}
      <h3>Customer Reviews</h3>
      {reviews.map(r => (
        <div key={r._id} style={{ border: '1px solid #ccc', padding: '8px' }}>
          <div><strong>{r.rating}★</strong> &nbsp; {r.text}</div>
          <div style={{ color: r.label==='Fake' ? 'red' : 'green' }}>
            {r.label} {r.fakeProbability!=null && `(${(r.fakeProbability*100).toFixed(0)}%)`}
          </div>
        </div>
      ))}
    </div>
  );
}
