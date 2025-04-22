const express = require("express");
const cors = require("cors");
const Stripe = require("stripe");
const bodyParser = require("body-parser");

const app = express();
const stripe = new Stripe("sk_test_51QAPs7Br9cbBKTyg5wh6VBjoGYSCOicjnjRth1NXNCzvsLClkCBNkPOv4ZWv4P16UdUUAVBDiVWO9Gvt5Z3kVvi100h3Y9dwsc"); // Ensure this is correct

app.use(cors({ origin: "http://localhost:3000" }));
app.use(bodyParser.json());

app.post("/api/create-checkout-session", async (req, res) => {
  try {
    const { products } = req.body;

    const lineItems = products.map((product) => ({
      price_data: {
        currency: "usd",
        product_data: { name: product.productName },
        unit_amount: parseInt(product.price, 10) * 100, // Ensure it's a number in cents
      },
      quantity: product.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
});

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
