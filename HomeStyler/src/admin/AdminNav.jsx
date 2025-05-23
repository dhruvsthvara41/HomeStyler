import React from "react";
import { Container, Row, } from "reactstrap";
import { NavLink } from "react-router-dom"; // corrected import
import useAuth from "../custom-hooks/useAuth";
import "../styles/admin-nav.css";

const admin__nav = [
  {
    display: "Dashboard", // corrected typo (from dispaly to display)
    path: "/dashboard",
  },
  {
    display: "All-Products",
    path: "/dashboard/all-products",
  },
  {
    display: "Orders",
    path: "/dashboard/orders",
  },
  {
    display: "Users",
    path: "/dashboard/users",
  },
];

const AdminNav = () => {
  const { currentUser } = useAuth();
  return (
    <>
      <header className="admin__header">
        <div className="admin__nav-top">
          <Container>
            <div className="admin__nav-wrapper-top">
              <div className="logo">
                <h2>HomeStyler</h2>
              </div>
              <div className="search__box">
                <input type="text" placeholder="Search...." />
                <span>
                  <i className="ri-search-line"></i> {/* corrected class */}
                </span>
              </div>
              <div className="admin__nav-top-right">
                <span>
                  <i className="ri-notification-3-line"></i>{" "}
                  {/* corrected class */}
                </span>
                <span>
                  <i className="ri-settings-2-line"></i> {/* corrected class */}
                </span>
                <img src={ currentUser && currentUser.photoURL} alt="Profile" />
              </div>
            </div>
          </Container>
        </div>
      </header>
      <section className="admin__menu p-0">
        <Container>
          <Row>
            <div className="admin__navigation">
              <ul className="admin__menu-list">
                {admin__nav.map((item, index) => (
                  <li className="admin__menu-item" key={index}>
                    <NavLink
                      to={item.path}
                      className={(navClass) =>
                        navClass.isActive ? 'active__admin__menu' : ""
                      }
                    >
                      {item.display}
                    </NavLink>{" "}
                    {/* corrected typo */}
                  </li>
                ))}
              </ul>
            </div>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default AdminNav;