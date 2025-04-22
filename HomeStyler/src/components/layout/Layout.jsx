import Header from "../header/Header";
import Footer from "../footer/Footer";
import { Routers } from "../../routers/index";
import AdminNav from "../../admin/AdminNav";
import { useLocation } from "react-router-dom";

const Layout = () => {
  const location = useLocation();

  return (
    <>
      {
        location.pathname.startsWith('/dashboard') ? <AdminNav /> : <Header /> 
      }
      {/* <Header /> */}
      <div>
        <Routers />
      </div>
      <Footer />
    </>
  );
};

export default Layout;

