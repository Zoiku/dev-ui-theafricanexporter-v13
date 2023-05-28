import "../../Styles/Menu.css";
import { NavLink } from "react-router-dom";

const Menu = () => {
  const defaultNavStyle = {
    textDecoration: "none",
  };

  return (
    <div className="Menu">
      <div className="menu-links-container">
        <div>
          <NavLink
            className="menu-links"
            style={defaultNavStyle}
            to="/merchant/dashboard"
          >
            Dashboard
          </NavLink>
        </div>
        <div>
          <NavLink
            className="menu-links"
            style={defaultNavStyle}
            to="/merchant/requests"
          >
            Request Timeline
          </NavLink>
        </div>
        <div>
          <NavLink
            className="menu-links"
            style={defaultNavStyle}
            to="/merchant/quotations"
          >
            Quotations
          </NavLink>
        </div>
        <div>
          <NavLink
            className="menu-links"
            style={defaultNavStyle}
            to="/merchant/orders"
          >
            Orders
          </NavLink>
        </div>
        <div>
          <NavLink
            className="menu-links"
            style={defaultNavStyle}
            to="/merchant/settings"
          >
            Settings
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Menu;
