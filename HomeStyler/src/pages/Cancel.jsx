import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import '../styles/cancel.css';  // Import the CSS file

const Cancel = () => {
  return (
    <div className="cancel-container">
      <h1>Payment was Cancelled</h1>
      <button className="retry-btn w-100 mt-3">
        <Link to="/shop">Return to Shop</Link>
      </button>
    </div>
  );
};

export default Cancel;
