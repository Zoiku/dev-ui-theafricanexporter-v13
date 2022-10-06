import "../../Styles/Menu.css";
import { NavLink } from "react-router-dom";

const Menu = () => {
    const defaultNavStyle = {
        textDecoration: "none",
    }

    return (
        <div className="Menu">
            <div className="menu-links-container">
                <div><NavLink className="menu-links" style={defaultNavStyle} to="/admin/dashboard">Dashboard</NavLink></div>
                <div><NavLink className="menu-links" style={defaultNavStyle} to="/admin/users">Users</NavLink></div>
                <div><NavLink className="menu-links" style={defaultNavStyle} to="/admin/requests">Requests</NavLink></div>
                <div><NavLink className="menu-links" style={defaultNavStyle} to="/admin/orders">Orders</NavLink></div>
            </div>
        </div>
    )
}

export default Menu;