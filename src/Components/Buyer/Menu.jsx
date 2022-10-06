import "../../Styles/Menu.css";
import { NavLink } from "react-router-dom";

const Menu = () => {
    const defaultNavStyle = {
        textDecoration: "none",
    }

    return (
        <div className="Menu">
            <div className="menu-links-container">
                <div><NavLink className="menu-links" style={defaultNavStyle} to="/buyer/dashboard">Dashboard</NavLink></div>
                <div><NavLink className="menu-links" style={defaultNavStyle} to="/buyer/requests">Requests</NavLink></div>
                <div><NavLink className="menu-links" style={defaultNavStyle} to="/buyer/orders">Orders</NavLink></div>
                <div><NavLink className="menu-links" style={defaultNavStyle} to="/buyer/settings">Settings</NavLink></div>
            </div>
        </div>
    )
}

export default Menu;