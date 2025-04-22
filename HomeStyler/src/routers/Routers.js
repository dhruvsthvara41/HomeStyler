import { Routes, Route, Navigate } from "react-router-dom";
import {
  Home,
  Cart,
  Checkout,
  Login,
  ProductDetails,
  Shop,
  Signup,
} from "../pages/index";
import ProtectedRouted from "./ProtectedRoute"
import AddProducts from "../admin/AddProducts";
import AllProducts from "../admin/AllProducts";
import Dashboard from "../admin/Dashboard"
import Users from "../admin/Users";
import ContactUs from "../pages/ContactUs";
import Orders from "../admin/Orders";
import Success from "../pages/Success"
import Cancel from "../pages/Cancel"
// import Update_products from "../admin/Update_products";





const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="home" />} />
      <Route path="home" element={<Home />} />
      <Route path="cart" element={<Cart />} />
      <Route path="contact" element={<ContactUs />} />
      <Route path="/*" element={<ProtectedRouted/>}>
      <Route path="checkout" element={<Checkout/>}/>
      <Route path="success" element={<Success/>}/>
      <Route path="cancel" element={<Cancel/>}/>
     
      <Route path="dashboard/all-products" element={<AllProducts/>}/>
      <Route path="dashboard/add-product" element={<AddProducts/>}/>
      <Route path="dashboard" element={<Dashboard/>}/>
      <Route path="dashboard/users" element={<Users/>}/>
      <Route path="dashboard/orders" element={<Orders/>}/>
      {/* <Route path="dashboard/update-products" element={<Update_products/>}/> */}
      

      </Route>
     
      <Route path="login" element={<Login />} />
      <Route path="shop/:id" element={<ProductDetails />} />
      <Route path="shop" element={<Shop />} />
      <Route path="signup" element={<Signup />} />
    </Routes>
  );
};

export default Routers;
