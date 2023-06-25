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
import NotificationsIcon from "@mui/icons-material/Notifications";
import { StyledBadge } from "../../Material/Badge";
import AdminService from "../../Services/Admin";
import { useEffect } from "react";
import { useReducer } from "react";
import {
  SEND_REQUEST,
  REQUEST_FAILED,
  REQUEST_SUCCESSFUL,
} from "../../Reducers/Actions";
import { formReducer, INITIAL_STATE } from "../../Reducers/FormReducer";

const AdminNav = () => {
  const navigate = useNavigate();
  const rootDispatch = useDispatch();
  const [unValidatedUsers, dispatchUnValidatedUsers] = useReducer(
    formReducer,
    INITIAL_STATE
  );
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

  useEffect(() => {
    dispatchUnValidatedUsers({ type: SEND_REQUEST });
    const abortController = new AbortController();
    const fecthData = async () => {
      const adminService = new AdminService();
      try {
        const { errors, data } = await adminService.getUnValidatedUsers(
          abortController.signal
        );
        if (errors.length === 0) {
          dispatchUnValidatedUsers({
            type: REQUEST_SUCCESSFUL,
            payload: { value: data?.data?.totalCount },
          });
        } else {
          dispatchUnValidatedUsers({ type: REQUEST_FAILED, error: errors[0] });
        }
      } catch (error) {}
    };

    fecthData();
    return () => abortController.abort();
    // eslint-disable-next-line
  }, []);

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
            <Tooltip sx={{ marginRight: 0.5 }} title="Unvalidated Users">
              <IconButton
                className="notification-toggle-animation"
                aria-label="cart"
              >
                <StyledBadge
                  max={10}
                  showZero
                  badgeContent={
                    unValidatedUsers.requestState.data?.value
                      ? unValidatedUsers.requestState.data?.value
                      : 0
                  }
                  color="primary"
                >
                  <NotificationsIcon />
                </StyledBadge>
              </IconButton>
            </Tooltip>

            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 0.5 }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <Avatar src="/" sx={{ background: "#ee9b00" }}></Avatar>
              </IconButton>
            </Tooltip>
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
              style={{ marginRight: 10, fontWeight: 650, fontSize: 14 }}
            >
              <span>Hello, Admin</span>{" "}
            </div>
            <Tooltip title="Unvalidated Users">
              <IconButton
                className="notification-toggle-animation"
                aria-label="cart"
              >
                <StyledBadge
                  max={10}
                  showZero
                  badgeContent={
                    unValidatedUsers.requestState.data?.value
                      ? unValidatedUsers.requestState.data?.value
                      : 0
                  }
                  color="primary"
                >
                  <NotificationsIcon />
                </StyledBadge>
              </IconButton>
            </Tooltip>
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 0.5 }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <Avatar src="/" alt="a" sx={{ background: "#ee9b00" }}></Avatar>
              </IconButton>
            </Tooltip>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default AdminNav;
