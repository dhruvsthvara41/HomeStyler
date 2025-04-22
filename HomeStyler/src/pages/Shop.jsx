import React, { useState, useEffect } from "react";
import CommonSection from "../home-components/ui/CommonSection";
import Helmet from "../components/helmet/Helmet";
import { Container, Row, Col } from "reactstrap";
import "../styles/shop.css";

import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db, auth } from "../firebase.config"; // Firebase configuration import
import { toast } from "react-toastify";
import ProductsList from "../home-components/ui/ProductsList";
import { onAuthStateChanged } from "firebase/auth";

const Shop = () => {
  const [productsData, setProductsData] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // Track the search term
  const [originalProducts, setOriginalProducts] = useState([]); // To keep the original list for filtering/sorting
  const [user, setUser] = useState(null); // To track the authenticated user

  // Firebase Authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser); // Set the logged-in user
      } else {
        setUser(null); // No user is logged in
        toast.error("Please log in to view products.");
      }
    });

    return () => unsubscribe();
  }, []);

  // Fetch products from Firebase Firestore (if user is authenticated)
  useEffect(() => {
    if (user) {
      const fetchProducts = async () => {
        try {
          console.log("Fetching products...");
          const productsCollection = collection(db, "products");
          const productsSnapshot = await getDocs(productsCollection);
          const productsList = productsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          console.log("Fetched products: ", productsList);
          setProductsData(productsList);
          setOriginalProducts(productsList);
        } catch (error) {
          console.error("Error fetching products: ", error);
          toast.error("Failed to fetch products.");
        }
      };
      fetchProducts();
    }
  }, [user]);
  

  // Handle filtering by category
  const handleFilter = (e) => {
    const filterValue = e.target.value;
    if (filterValue === "Filter By Category") {
      setProductsData(originalProducts);
    } else {
      const filteredProducts = originalProducts.filter(
        (item) => item.category === filterValue
      );
      setProductsData(filteredProducts);
    }
  };

  // Handle delete product
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "products", id));
      toast.success("Product deleted successfully!");
      setProductsData(productsData.filter((product) => product.id !== id));
    } catch (error) {
      toast.error("Failed to delete product.");
    }
  };

  // Perform search on button click
  const handleSearchClick = () => {
    const searchedProducts = originalProducts.filter((item) =>
      item.productName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setProductsData(searchedProducts);
  };

  // Handle sorting by ascending or descending order
  const handleSort = (e) => {
    const sortValue = e.target.value;
    let sortedProducts;
    if (sortValue === "ascending") {
      sortedProducts = [...productsData].sort((a, b) =>
        a.productName.localeCompare(b.productName)
      );
    } else if (sortValue === "descending") {
      sortedProducts = [...productsData].sort((a, b) =>
        b.productName.localeCompare(a.productName)
      );
    }
    setProductsData(sortedProducts);
  };

  return (
    <Helmet title="Shop">
      <CommonSection title="Products" />
      <section>
        <Container>
          <Row>
            <Col lg="3" md="6">
              <div className="filter__widget">
                <select onChange={handleFilter}>
                  <option>Filter By Category</option>
                  <option value="sofa">Sofa</option>
                  <option value="table">Table</option>
                  <option value="chair">Chair</option>
                  <option value="bed">Bed</option>
                  <option value="decor">Decor products</option>
                </select>
              </div>
            </Col>
            <Col lg="3" md="6" className="text-end">
              <div className="filter__widget">
                <select onChange={handleSort}>
                  <option>Sort By</option>
                  <option value="ascending">Ascending</option>
                  <option value="descending">Descending</option>
                </select>
              </div>
            </Col>
            <Col lg="6" md="12">
              <div className="search__box">
                <input
                  type="text"
                  placeholder="Search..."
                  onChange={(e) => setSearchTerm(e.target.value)} // Update the search term on input change
                />
                <span onClick={handleSearchClick}>
                  <i className="ri-search-line"></i>
                </span>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="pt-0">
        <Container>
          <Row>
            {productsData.length === 0 ? (
              <h1 className="text-center fs-4">No Products are found!</h1>
            ) : (
              <ProductsList data={productsData} onDelete={handleDelete} />
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Shop;
