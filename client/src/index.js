import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';  // You can customize the styling here
import App from './App';  // Import the App component
import reportWebVitals from './reportWebVitals';  // Optional: For performance measuring (can ignore for now)

ReactDOM.render(
  <React.StrictMode>
    <App />  {/* This renders the App component in the root element */}
  </React.StrictMode>,
  document.getElementById('root')  // This is the ID of the root div in index.html
);

// Optional: For performance measuring (can be ignored if not needed)
reportWebVitals();
