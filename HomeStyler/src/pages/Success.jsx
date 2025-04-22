import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import '../styles/success.css';  // Import the CSS file

const Success = () => {
  return (
    <div className="success-container">
      <h1>Payment is Successful</h1>
      <button className="buy__btn1 w-100 mt-3">
        <Link to="/shop">Continue Shopping</Link>
      </button>
    </div>
  );
};

export default Success;
