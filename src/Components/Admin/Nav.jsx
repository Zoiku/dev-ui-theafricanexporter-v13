import "../../Styles/Nav.css";
import { useState } from "react";
import { Avatar, MenuItem, ListItemIcon, Stack } from "@mui/material/";
import IconButton from "@mui/material/IconButton";
import Logout from "@mui/icons-material/Logout";
import { endSession } from "../../Redux/Features/Session";
import { useDispatch } from "react-redux";
import logo from "../../Assets/logo.png";
import { useNavigate } from "react-router-dom";
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
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import MuiPopover from "../v2/components/Popover";
import MuiMenu from "../v2/components/Menu";

const AdminNav = () => {
  const navigate = useNavigate();
  const rootDispatch = useDispatch();
  const [unValidatedUsers, dispatchUnValidatedUsers] = useReducer(
    formReducer,
    INITIAL_STATE
  );

  const [popoverAnchorEl, setPopoverAnchorEl] = useState(null);
  const togglePopoverAnchorEl = (open) => (event) => {
    if (open) {
      setPopoverAnchorEl(event.currentTarget);
    } else {
      setPopoverAnchorEl(null);
    }
  };

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
      <MuiPopover
        anchorEl={popoverAnchorEl}
        toggleAnchorEl={togglePopoverAnchorEl}
        title="Unvalidated Users"
      >
        {unValidatedUsers.requestState.data?.value ? (
          <Stack>
            <div style={{ color: "gray" }}>
              You have{" "}
              <strong style={{ color: "black" }}>
                {unValidatedUsers.requestState.data?.value}
              </strong>{" "}
              unvalidated merchant(s)
            </div>
          </Stack>
        ) : (
          <Stack>
            <div style={{ color: "gray" }}>No new notifications</div>
          </Stack>
        )}
      </MuiPopover>

      <MuiMenu anchorEl={menuAnchorEl} toggleAnchorEl={toggleMenuAchnorEl}>
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
          <Stack direction="row" alignItems="center" spacing={1}>
            <IconButton onClick={togglePopoverAnchorEl(true)} aria-label="cart">
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
                <NotificationsNoneRoundedIcon fontSize="medium" />
              </StyledBadge>
            </IconButton>

            <IconButton onClick={toggleMenuAchnorEl(true)} size="small">
              <Avatar
                src="/"
                alt="a"
                sx={{ background: "#ee9b00", textTransform: "uppercase" }}
              />
            </IconButton>
          </Stack>
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
          <Stack direction="row" alignItems="center" spacing={1}>
            <div style={{ fontWeight: 650, fontSize: 14 }}>Hello, Admin</div>
            <IconButton onClick={togglePopoverAnchorEl(true)} aria-label="cart">
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
                <NotificationsNoneRoundedIcon fontSize="medium" />
              </StyledBadge>
            </IconButton>

            <IconButton onClick={toggleMenuAchnorEl(true)} size="small">
              <Avatar
                src="/"
                alt="a"
                sx={{ background: "#ee9b00", textTransform: "uppercase" }}
              />
            </IconButton>
          </Stack>
        </div>
      </div>
    </div>
  );
};

export default AdminNav;
