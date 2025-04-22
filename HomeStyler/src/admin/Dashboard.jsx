import React, { useEffect } from "react";
import { Container, Row, Col, Spinner } from "reactstrap";
import '../styles/dashboard.css';
import useGetData from "../custom-hooks/useGetData";

const Dashboard = () => {
  const { data: products, loading: loadingProducts, error: errorProducts } = useGetData('products');
  const { data: orders, loading: loadingOrders, error: errorOrders } = useGetData('orders');
  const { data: users, loading: loadingUsers, error: errorUsers } = useGetData('users');
  const { data: sales, loading: loadingSales, error: errorSales } = useGetData('sales');

  useEffect(() => {
    console.log("Products:", products);
    console.log("Orders:", orders);
    console.log("Users:", users);
    console.log("Sales:", sales);
  }, [products, orders, users, sales]);

  if (loadingProducts || loadingOrders || loadingUsers || loadingSales) {
    return <Spinner color="primary" />;
  }

  if (errorProducts || errorOrders || errorUsers || errorSales) {
    return <p>Error loading dashboard data.</p>;
  }

  return (
    <section>
      <Container>
        <Row>
          <Col lg="3">
            <div className="revenue__box">
              <h5>Total Sales</h5>
              <span>10</span>
            </div>
          </Col>
          <Col lg="3">
            <div className="order__box">
              <h5>Orders</h5>
              <span>15</span>
            </div>
          </Col>
          <Col lg="3">
            <div className="products__box">
              <h5>Total Products</h5>
              <span>{products ? products.length : 0}</span>
            </div>
          </Col>
          <Col lg="3">
            <div className="users__box">
              <h5>Total Users</h5>
              <span>{users ? users.length : 0}</span>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Dashboard;
