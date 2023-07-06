import "../../Styles/Nav.css";
import { useState } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import Logout from "@mui/icons-material/Logout";
import { endSession } from "../../Redux/Features/Session";
import { useDispatch } from "react-redux";
import logo from "../../Assets/logo.png";
import { useNavigate } from "react-router-dom";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";

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
  const handleRedirect = () => {
    navigate("/");
  };
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    rootDispatch(endSession());
    handleRedirect();
  };
  const toggleRedirect = (link) => () => {
    navigate(link);
  };

  return (
    <div className="Nav">
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={toggleRedirect("/buyer/settings")}>
          <ListItemIcon>
            <PersonRoundedIcon fontSize="small" />
          </ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>

      <div className="Mobile-Nav">
        <div className="Nav-logo-tae-container">
          <img onClick={handleRedirect} src={logo} alt="" />
        </div>
        <div>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              textAlign: "center",
              textTransform: "capitalize",
            }}
          >
            <div
              className="nav-hello"
              style={{ marginLeft: 10, fontWeight: 650, fontSize: 14 }}
            >
              <span>Hello, {session.user?.profile?.firstName}</span>{" "}
            </div>
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 0.5 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Avatar
                src="/"
                alt={session.user?.profile?.firstName}
                sx={{ background: "#ee9b00", textTransform: "uppercase" }}
              ></Avatar>
            </IconButton>
          </Box>
        </div>
      </div>

      <div className="Default">
        <div className="logo-container">
          <img
            style={{ cursor: "pointer" }}
            onClick={handleRedirect}
            src={logo}
            alt="tae logo"
          />
        </div>
        <div>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              textAlign: "center",
              textTransform: "capitalize",
            }}
          >
            <div
              className="nav-hello"
              style={{ marginLeft: 10, fontWeight: 650, fontSize: 14 }}
            >
              <span>Hello, {session.user?.profile?.firstName}</span>{" "}
            </div>
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 0.5 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Avatar
                src="/"
                alt={session.user?.profile?.firstName}
                sx={{ background: "#ee9b00", textTransform: "uppercase" }}
              ></Avatar>
            </IconButton>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default BuyerNav;
