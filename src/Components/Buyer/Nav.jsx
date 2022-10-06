import "../../Styles/Nav.css";
import { useState } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import { endSession } from "../../Redux/Features/Session";
import { useDispatch } from "react-redux";
import logo from "../../Assets/logo.png";
import { useNavigate } from "react-router-dom";

const BuyerNav = ({ session }) => {
    const navigate = useNavigate();
    const rootDispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleLogout = () => {
        rootDispatch(endSession());
    }
    const handleRedirect = () => {
        navigate("/");
    };

    return (
        <div className="Nav">
            <div className="Nav-logo-tae-container logged-mobile-nav-logo-container">
                <img onClick={handleRedirect} src={logo} alt="tae tae" />
            </div>
            <div>
                <Box
                    sx={{ display: "flex", alignItems: "center", textAlign: "center", textTransform: "capitalize" }}
                >
                    <div style={{ marginLeft: 10, fontWeight: 650, fontSize: 14 }}><span>Hello, {session.user?.profile?.firstName}</span> </div>
                    <Tooltip title="Account settings">
                        <IconButton
                            onClick={handleClick}
                            size="small"
                            sx={{ ml: .5 }}
                            aria-controls={open ? "account-menu" : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? "true" : undefined}
                        >
                            <Avatar src="/" alt={session.user?.profile?.firstName} sx={{ background: "#ee9b00" }}>
                            </Avatar>
                        </IconButton>
                    </Tooltip>
                </Box>
            </div>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </div>
    )
}

export default BuyerNav;