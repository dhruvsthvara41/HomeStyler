// Orders.jsx
import React, { useEffect } from "react";
import { Container, Row, Col, Button, Spinner } from "reactstrap";
import useGetData from "../custom-hooks/useGetData";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";

const Orders = () => {
  const { data: orders, loading, error } = useGetData("orders");

  useEffect(() => {
    console.log("Orders fetched:", orders);
    console.log("Loading status:", loading);
    console.log("Error status:", error);
  }, [orders, loading, error]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        await deleteDoc(doc(db, "orders", id));
        toast.success("Order deleted successfully");
      } catch (error) {
        console.error("Error deleting order:", error);
        toast.error("Failed to delete order");
      }
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
        <Spinner color="primary" />
        <p style={{ marginLeft: '10px' }}>Loading orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <p>Error loading orders: {error.message}</p>
        <Button color="primary" onClick={() => window.location.reload()}>Retry</Button>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return <p style={{ textAlign: 'center', padding: '20px' }}>No orders found.</p>;
  }

  return (
    <Container style={{ padding: '20px' }}>
      <h1 style={{ color: '#333', marginBottom: '20px' }}>Orders</h1>
      <Row>
        {orders.map((order) => (
          <Col sm="12" md="6" lg="4" key={order.id} style={{ marginBottom: '20px' }}>
            <div
              style={{
                border: '1px solid #ddd',
                padding: '15px',
                borderRadius: '5px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                backgroundColor: '#f9f9f9'
              }}
            >
              <p><strong>Item:</strong> {order.productName}</p>
              <p><strong>Quantity:</strong> {order.quantity}</p>
              <p><strong>Price:</strong> {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'usd' }).format(order.price)}</p>
              <p><strong>Total:</strong> {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'usd' }).format(order.quantity * order.price)}</p>
              <Button
                color="danger"
                onClick={() => handleDelete(order.id)}
                style={{ width: '100%' }}
              >
                Delete Order
              </Button>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Orders;
