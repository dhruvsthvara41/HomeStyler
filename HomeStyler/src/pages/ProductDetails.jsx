import React, { useState, useRef, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { useParams } from "react-router-dom";
import Helmet from "../components/helmet/Helmet";
import CommonSection from "../home-components/ui/CommonSection";
import "../styles/product-details.css";
import { motion } from "framer-motion";
import ProductsList from "../home-components/ui/ProductsList";
import { useDispatch } from "react-redux";
import { cartActions } from "../routers/slices/cartSlice";
import { toast } from "react-toastify";
import { db } from "../firebase.config";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import useGetData from "../custom-hooks/useGetData";

const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const [tab, setTab] = useState("desc");
  const reviewUser = useRef("");
  const reviewMsg = useRef("");
  const dispatch = useDispatch();
  const [rating, setRating] = useState(null);
  const { id } = useParams();
  const { data: products } = useGetData("products");

  // Fetch product data from Firestore
  useEffect(() => {
    const docRef = doc(db, "products", id);

    const getProduct = async () => {
      try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProduct(docSnap.data());
        } else {
          console.log("No product found!");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        toast.error("Error fetching product details");
      }
    };

    getProduct();
  }, [id]);

  const { imgUrl, productName, price, description, shortDesc, category } = product;

  const submitHandler = async (e) => {
    e.preventDefault();
    const reviewUserName = reviewUser.current.value;
    const reviewUserMsg = reviewMsg.current.value;

    const reviewObj = {
      userName: reviewUserName,
      text: reviewUserMsg,
      rating,
      date: new Date().toISOString(),
    };

    try {
      const docRef = doc(db, "products", id);
      await updateDoc(docRef, {
        reviews: arrayUnion(reviewObj),
      });
      toast.success("Review submitted");
      reviewUser.current.value = "";
      reviewMsg.current.value = "";
      setRating(null);

      // Reload the page to show the newly added review
      window.location.reload();
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Failed to submit review");
    }
  };

  const addToCart = () => {
    dispatch(
      cartActions.addItem({
        id,
        image: imgUrl,
        productName,
        price,
      })
    );
    toast.success("Product added successfully");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [product]);

  const relatedProducts = products.filter((item) => item.category === category);

  return (
    <Helmet title={productName || "Product Details"}>
      <CommonSection title={productName || "Product Details"} />

      <section className="pt-0">
        <Container>
          <Row>
            <Col lg="6">
              <img src={imgUrl} alt={productName} className="product__image" />
            </Col>
            <Col lg="6">
              <div className="product__details">
                <h2>{productName}</h2>
                <div className="product__rating d-flex align-items-center gap-5 mb-3">
                  <div>
                    {[...Array(5)].map((_, index) => (
                      <i className="ri-star-s-fill" key={index}></i>
                    ))}
                  </div>
                </div>
                <div className="d-flex align-items-center gap-5">
                  <span className="product__price">{price}</span>
                  <span>Category: {category}</span>
                </div>
                <p className="mt-3">{shortDesc}</p>

                <motion.button
                  whileTap={{ scale: 1.2 }}
                  className="buy__btn"
                  onClick={addToCart}
                >
                  Add to cart
                </motion.button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section>
        <Container>
          <Row>
            <Col lg="12">
              <div className="tab__wrapper d-flex align-items-center gap-5">
                <h6
                  className={`${tab === "desc" ? "active_tab" : ""}`}
                  onClick={() => setTab("desc")}
                >
                  Description
                </h6>
                <h6
                  className={`${tab === "rev" ? "active_tab" : ""}`}
                  onClick={() => setTab("rev")}
                >
                  Review
                </h6>
              </div>
              {tab === "desc" ? (
                <div className="tab_content mt-5">
                  <p>{description}</p>
                </div>
              ) : (
                <div className="product__review mt-5">
                  <div className="review__wrapper">
                    <div className="review__form">
                      <h4>Leave your experience</h4>
                      <form onSubmit={submitHandler}>
                        <div className="form__group">
                          <input
                            type="text"
                            placeholder="Enter name"
                            ref={reviewUser}
                            required
                          />
                        </div>
                        <div className="form__group d-flex align-items-center gap-5 rating__group">
                          {[1, 2, 3, 4, 5].map((num) => (
                            <motion.span
                              whileTap={{ scale: 1.2 }}
                              onClick={() => setRating(num)}
                              key={num}
                            >
                              {num} <i className="ri-star-s-fill"></i>
                            </motion.span>
                          ))}
                        </div>
                        <div className="form__group">
                          <textarea
                            ref={reviewMsg}
                            rows={4}
                            placeholder="Review Message..."
                            required
                          />
                        </div>
                        <motion.button
                          whileTap={{ scale: 1.2 }}
                          type="submit"
                          className="buy__btn"
                        >
                          Submit
                        </motion.button>
                      </form>
                    </div>
                  </div>
                </div>
              )}
            </Col>
            <Col lg="12" className="mt-5">
              <h2 className="related_title">You might also like</h2>
              <ProductsList data={relatedProducts} />
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default ProductDetails;
