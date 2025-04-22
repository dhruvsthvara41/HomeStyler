import React from "react";
import { Container, Row, Col, FormGroup, Form } from "reactstrap";
import Helmet from "../components/helmet/Helmet";
import CommonSection from "../home-components/ui/CommonSection";
import "../styles/checkout.css";
import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";

const Checkout = () => {
  // Access the cart state from Redux
  const cartState = useSelector((state) => state.cart);
  console.log("Full Cart State:", JSON.stringify(cartState, null, 2));

  // Access cart items, total quantity, and total amount
  const carts = cartState?.cartItems || []; // Updated to match the cartSlice state structure
  console.log("Cart items:", carts); // Log the cart items to verify data
  const totalQty = useSelector((state) => state.cart.totalQuantity);
  const totalAmount = useSelector((state) => state.cart.totalAmount);

  const makePayment = async () => {
    console.log("Executing makePayment function");
    try {
      const stripe = await loadStripe("pk_test_51QAPs7Br9cbBKTyg3eHRQ0oiGl0CyFoUQrU4QIkm6PmgS5NZBOpFe3WRunP8JfgGDuhgHlEN3Kvx1VoeHXB2jXfs00ygQpRi1m"); // Replace with your actual Stripe publishable key
      if (!stripe) {
        console.error("Stripe failed to load.");
        return;
      }

      if (carts.length === 0) {
        console.error("Cart is empty, cannot proceed to payment");
        return;
      }

      const body = { products: carts }; // Send cart items to backend
      console.log("Sending request to backend:", body);

      const headers = { "Content-Type": "application/json" };
      const response = await fetch("http://localhost:7000/api/create-checkout-session", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Server error:", response.status, errorData);
        return;
      }

      const session = await response.json();
      console.log("Session response:", session);

      if (session.id) {
        const result = await stripe.redirectToCheckout({ sessionId: session.id });
        if (result.error) {
          console.error("Error redirecting to checkout:", result.error.message);
        }
      } else {
        console.error("No session ID returned from the server");
      }
    } catch (error) {
      console.error("Error in makePayment:", error);
    }
  };

  return (
    <Helmet title="Checkout">
      <CommonSection title="Checkout" />
      <section>
        <Container>
          <Row>
            <Col lg="8">
              <h6 className="mb-4 fw-bold">Billing Information</h6>
              <Form className="billing__form">
                <FormGroup className="form__group">
                  <input type="text" placeholder="Enter your Name" required />
                </FormGroup>
                <FormGroup className="form__group">
                  <input type="email" placeholder="Enter your Email" required />
                </FormGroup>
                <FormGroup className="form__group">
                  <input type="number" placeholder="Phone Number" required />
                </FormGroup>
                <FormGroup className="form__group">
                  <input type="text" placeholder="Street address" required />
                </FormGroup>
                <FormGroup className="form__group">
                  <input type="text" placeholder="City" required />
                </FormGroup>
                <FormGroup className="form__group">
                  <input type="text" placeholder="Postal code" required />
                </FormGroup>
                <FormGroup className="form__group">
                  <input type="text" placeholder="Country" required />
                </FormGroup>
              </Form>
            </Col>
            <Col lg="4">
              <div className="checkout__cart">
                <h6>Total Qty: <span>{totalQty} items</span></h6>
                <h6>Subtotal: <span>{totalAmount}</span></h6>
                <h6>Shipping: <span>Free Shipping</span></h6>
                <h4>Total cost: <span>{totalAmount}</span></h4>
                <button
                  onClick={makePayment}
                  className={`buy__btn auth__btn w-100 ${carts.length === 0 ? "disabled" : ""}`}
                  disabled={carts.length === 0}
                >
                  Place Order
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Checkout;
