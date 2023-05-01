import "../Styles/Nav.css";
import "../Styles/Hamburger.css";
import logo from "../Assets/logo.png";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { stack as Menu } from 'react-burger-menu';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { endSession } from "../Redux/Features/Session";

const ROLE_PATH = {
    ADMIN: "/admin/dashboard",
    MERCHANT: "/merchant/dashboard",
    BUYER: "/buyer/dashboard",
}

const toLowerCase = (string) => {
    return string.toLowerCase();
}

const Nav = ({ session }) => {
    const location = useLocation();
    const rootDispatch = useDispatch();
    const [openMenu, setOpenMenu] = useState(false);
    const navigate = useNavigate();
    const defaultNavStyle = {
        textDecoration: "none",
        color: "inherit",
    };
    const handleRedirect = () => {
        navigate("/");
    };
    const toggleMenu = (open) => () => {
        setOpenMenu(open);
    };
    const handleLogout = (open) => () => {
        setOpenMenu(open);
        rootDispatch(endSession());
    };

    return (
        <div className={location.pathname.substring(1) === "legal" ? "Nav no-sticky-Nav" : "Nav"}>
            <div className="Mobile-Nav">
                <div className="Nav-logo-tae-container">
                    <img onClick={handleRedirect} src={logo} alt="" />
                </div>
                {
                    session.isLogged ?
                        <Menu isOpen={openMenu} width={"100%"}>
                            <NavLink onClick={toggleMenu(false)} className="hamburger-menu-links" style={defaultNavStyle} to="/">
                                <span>Home</span>
                            </NavLink>

                            <NavLink onClick={toggleMenu(false)} className="hamburger-menu-links" style={defaultNavStyle} to={ROLE_PATH[session.user.role]}>
                                <span>Dashboard</span>
                            </NavLink>

                            <div onClick={handleLogout(false)} className="hamburger-menu-links">
                                <span>Exit Application</span>
                            </div>

                            <div className="hamburger-menu-logo-container">
                                <span>menu</span>
                            </div>
                        </Menu>
                        :
                        <Menu isOpen={openMenu} width={"100%"}>
                            <NavLink onClick={toggleMenu(false)} className="hamburger-menu-links" style={defaultNavStyle} to="/">
                                <span>Home</span>
                            </NavLink>

                            <NavLink onClick={toggleMenu(false)} className="hamburger-menu-links" style={defaultNavStyle} to="/login">
                                <span>Login</span>
                            </NavLink>

                            <NavLink onClick={toggleMenu(false)} className="hamburger-menu-links" style={defaultNavStyle} to="/buyer/register">
                                <span>Create Account</span>
                            </NavLink>

                            <NavLink onClick={toggleMenu(false)} className="hamburger-menu-links" style={defaultNavStyle} to="/merchant/register">
                                <span>Become A Merchant</span>
                            </NavLink>

                            <div className="hamburger-menu-logo-container">
                                <span>menu</span>
                            </div>
                        </Menu>
                }
            </div>

            <div className="Default">
                <div className="logo-container">
                    <img style={{ cursor: "pointer" }} onClick={handleRedirect} src={logo} alt="tae logo" />
                </div>
                <ul className="nav-links-container">
                    {
                        session.isLogged ?
                            <>
                                <li className="nav-links"><NavLink style={defaultNavStyle} to={`${toLowerCase(session.user.role)}/dashboard`}>Dashboard</NavLink></li>
                                <li style={{ cursor: "pointer" }} className="nav-links" onClick={handleLogout(false)}>Logout</li>
                            </> :
                            <>
                                <li className="nav-links"><NavLink style={defaultNavStyle} to="/merchant/register">Become a Merchant</NavLink></li>
                                <li className="nav-links"><NavLink style={defaultNavStyle} to="/buyer/register">Sign Up</NavLink></li>
                                <li className="nav-links"><NavLink style={defaultNavStyle} to="/login">Login</NavLink></li>
                            </>
                    }
                </ul>
            </div>
        </div >
    )
}

export default Nav;