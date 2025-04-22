import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { Helmet } from "../components/index";
import heroImg from "../assets/images/hero-img.png";
import "../styles/home.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ProductsList, Services, Clock } from "../home-components/index";
// import products from "../assets/data/products";
import counterImg from "../assets/images/counter-timer-img.png";
import useGetData from "../custom-hooks/useGetData";

const Home = () => {
  const { data: products, loading } = useGetData("products");

  const [trendingProducts, setTrendingProducts] = useState([]);
  const [bestSalesProducts, setBestSalesProducts] = useState([]);
  const [mobileProducts, setMobileProducts] = useState([]);
  const [wirelessProducts, setWirelessProducts] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);

  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const filteredTrendingProducts = products.filter(
      (item) => item.category === "chair"
    );

    const filteredBestSalesProducts = products.filter(
      (item) => item.category === "sofa"
    );

    const filteredMobileProducts = products.filter(
      (item) => item.category === "table"
    );

    const filteredWirelessProducts = products.filter(
      (item) => item.category === "decor"
    );

    const filteredPopularProducts = products.filter(
      (item) => item.category === "bed"
    );

    setTrendingProducts(filteredTrendingProducts);
    setBestSalesProducts(filteredBestSalesProducts);
    setMobileProducts(filteredMobileProducts);
    setWirelessProducts(filteredWirelessProducts);
    setPopularProducts(filteredPopularProducts);
  }, [products]);

  return (
    <div>
      <Helmet title={"Home"}>
        {/* hero */}
        <section className="hero__section">
          <Container>
            <Row>
              <Col lg="6" md="6">
                <div className="hero__content">
                  <p className="hero__subtitle">
                    Trending Product in {currentYear}
                  </p>
                  <h2>Make Your Interior More Minimalistic & Modern</h2>
                  <p>
                    At HomeStyler, we are dedicated to helping you
                    create the perfect living space with beautiful, eco-friendly
                    furniture that combines sustainability with modern design.
                    Whether you're updating your bedroom, living room, or
                    office, we offer a curated collection of stylish,
                    high-quality furniture pieces that not only look great but
                    also help preserve the environment.
                  </p>
                  <motion.button whileTap={{ scale: 1.2 }} className="buy__btn">
                    <Link to="/shop">SHOP NOW</Link>
                  </motion.button>
                </div>
              </Col>

              <Col lg="6" md="6">
                <div className="hero__img">
                  <img src={heroImg} alt="hero-chair" />
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        {/* services */}
        <Services />

        {/* trending products */}
        <section className="trending__products">
          <Container>
            <Row>
              <Col lg="12" className="text-center">
                <h2 className="section__title">Trending Products</h2>
              </Col>
              {loading ? (
                <h5 className="fw-bold">Loading...</h5>
              ) : (
                <ProductsList data={trendingProducts} />
              )}
            </Row>
          </Container>
        </section>

        {/* best sales */}
        <section className="best__sales">
          <Container>
            <Row>
              <Col lg="12" className="text-center">
                <h2 className="section__title">Best Sales</h2>
              </Col>
              {loading ? (
                <h5 className="fw-bold">Loading...</h5>
              ) : (
                <ProductsList data={bestSalesProducts} />
              )}
            </Row>
          </Container>
        </section>

        {/* timer count */}
        <section className="timer__count">
          <Container>
            <Row>
              <Col lg="6" md="12" className="count__down-col">
                <div className="clock__top-content">
                  <h4 className="text-white fs-6 mb-2">Limited Offers</h4>
                  <h3 className="text-white fs-5 mb-3">Quality Armchair</h3>
                </div>
                <Clock />
                <motion.button
                  whileTap={{ scale: 1.2 }}
                  className="buy__btn store__btn"
                >
                  <Link to="/shop">Visit Store</Link>
                </motion.button>
              </Col>

              <Col lg="6" md="12" className="text-end counter__img">
                <img src={counterImg} alt="counter" />
              </Col>
            </Row>
          </Container>
        </section>

        {/* new arrivals */}
        <section className="new__arrivals">
          <Container>
            <Row>
              <Col lg="12" className="text-center mb-5">
                <h2 className="section__title">New Arrivals</h2>
              </Col>
              {loading ? (
                <h5 className="fw-bold">Loading...</h5>
              ) : (
                <ProductsList data={mobileProducts} />
              )}
              {loading ? (
                <h5 className="fw-bold">Loading...</h5>
              ) : (
                <ProductsList data={wirelessProducts} />
              )}
            </Row>
          </Container>
        </section>

        {/* popular category */}
        <section className="popular__category">
          <Container>
            <Row>
              <Col lg="12" className="text-center mb-5">
                <h2 className="section__title">Popular in Category</h2>
              </Col>
              {loading ? (
                <h5 className="fw-bold">Loading...</h5>
              ) : (
                <ProductsList data={popularProducts} />
              )}
            </Row>
          </Container>
        </section>
      </Helmet>
    </div>
  );
};

export default Home;
