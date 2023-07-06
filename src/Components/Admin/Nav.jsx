import "../../Styles/Nav.css";
import { useState } from "react";
import {
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Stack,
  Popover,
} from "@mui/material/";
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

const AdminNav = () => {
  const navigate = useNavigate();
  const rootDispatch = useDispatch();
  const [unValidatedUsers, dispatchUnValidatedUsers] = useReducer(
    formReducer,
    INITIAL_STATE
  );

  const [anchorElPopOver, setAnchorElPopOver] = useState(null);
  const handleClickPopOver = (event) => {
    setAnchorElPopOver(event.currentTarget);
  };
  const handleClosePopOver = () => {
    setAnchorEl(null);
  };
  const openPopOver = Boolean(anchorElPopOver);
  const popOverId = openPopOver ? "simple-popover" : undefined;

  //

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
      <Popover
        sx={{ boxShadow: "none" }}
        id={popOverId}
        open={openPopOver}
        anchorEl={anchorElPopOver}
        onClose={handleClosePopOver}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <div style={{ padding: 10, width: 200 }}>
          {unValidatedUsers.requestState.data?.value ? (
            <>
              {unValidatedUsers.requestState.data?.value} merchant users
              unvalidated
            </>
          ) : (
            <>Good work! There are no unvalidated merchants</>
          )}
        </div>
      </Popover>

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
          <Stack direction="row" alignItems="center" spacing={1}>
            <IconButton aria-label="cart">
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

            <IconButton
              onClick={handleClick}
              size="small"
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
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

            <IconButton onClick={handleClickPopOver} aria-label="cart">
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

            <IconButton
              onClick={handleClick}
              size="small"
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
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
