import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // 1) Send a GET request to your backend
    axios.get('http://localhost:5000/api/products')
      .then(response => {
        // 2) Store the returned products in React state
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []); // empty array = run once on component load

  return (
    <div style={{ padding: 20 }}>
      <h1>Products</h1>
      <ul>
        {products.map(prod => (
          <li key={prod._id}>
            {prod.name} — ₹{prod.price}
          </li>
        ))}
      </ul>
    </div>
  );
}