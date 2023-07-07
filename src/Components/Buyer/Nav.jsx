import "../../Styles/Nav.css";
import { useState } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import Logout from "@mui/icons-material/Logout";
import { endSession } from "../../Redux/Features/Session";
import { useDispatch } from "react-redux";
import logo from "../../Assets/logo.png";
import { useNavigate } from "react-router-dom";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import MuiMenu from "../v2/components/Menu";

const BuyerNav = ({ session }) => {
  const navigate = useNavigate();
  const rootDispatch = useDispatch();

  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const toggleMenuAchnorEl = (open) => (event) => {
    if (open) {
      setMenuAnchorEl(event.currentTarget);
    } else {
      setMenuAnchorEl(null);
    }
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
      <MuiMenu anchorEl={menuAnchorEl} toggleAnchorEl={toggleMenuAchnorEl}>
        <MenuItem onClick={toggleRedirect("/buyer/settings")}>
          <ListItemIcon>
            <SettingsRoundedIcon fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </MuiMenu>

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
              onClick={toggleMenuAchnorEl(true)}
              size="small"
              sx={{ ml: 0.5 }}
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
              onClick={toggleMenuAchnorEl(true)}
              size="small"
              sx={{ ml: 0.5 }}
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
