import "../Styles/Login.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useEffect, useReducer } from "react";
import { INITIAL_STATE, formReducer } from "../Reducers/FormReducer";
import {
  INPUTING,
  SEND_REQUEST,
  REQUEST_SUCCESSFUL,
  REQUEST_FAILED,
} from "../Reducers/Actions";
import AuthService from "../Services/Auth";
import { useDispatch, useSelector } from "react-redux";
import { clearPath, startSession } from "../Redux/Features/Session.js";
import { setAlert, clearAlerts } from "../Redux/Features/Alert.js";
import { useNavigate, NavLink } from "react-router-dom";
import { capitalizeString } from "../Components/Functions";
import MuiButton from "../Components/v2/components/MuiButtons";

const ROLES = {
  ADMIN: "/admin/dashboard",
  MERCHANT: "/merchant/dashboard",
  BUYER: "/",
};

const Login = () => {
  const navLinkStyle = {
    fontWeight: 700,
    textDecoration: "none",
    color: "var(--tae-orange)",
  };
  const navLinkStyle2 = {
    fontWeight: 700,
    textDecoration: "none",
    color: "#c5c5c5",
    fontSize: 11,
  };
  const navigate = useNavigate();
  const rootDispatch = useDispatch();
  const { session } = useSelector((state) => state);
  const [state, dispatch] = useReducer(formReducer, INITIAL_STATE);

  const handleChange = (e) => {
    dispatch({ type: INPUTING, prop: e.target.name, value: e.target.value });
  };

  const triggerSnackBarAlert = (message, severity) => {
    const payload = {
      message,
      severity,
    };
    rootDispatch(setAlert(payload));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: SEND_REQUEST });
    const authService = new AuthService();
    try {
      const { data, errors } = await authService.signIn(state.payload);
      if (errors.length === 0) {
        dispatch({ type: REQUEST_SUCCESSFUL, payload: data.data });
        rootDispatch(startSession(data.data));
        rootDispatch(clearAlerts());
      } else {
        dispatch({ type: REQUEST_FAILED, error: errors });
        triggerSnackBarAlert(capitalizeString(errors[0]), "error");
      }
    } catch (error) {
      dispatch({ type: REQUEST_FAILED, error: error });
      triggerSnackBarAlert(error, "error");
    }
  };

  useEffect(() => {
    if (session.isLogged) {
      const role = session.user.role;
      if (session.path) {
        const to = session.path;
        rootDispatch(clearPath());
        navigate(to);
      } else {
        const pd_id = sessionStorage.getItem("pq_id");
        if (role === "BUYER" && pd_id) {
          const pendingQuoteStorage = JSON.parse(pd_id);
          navigate(`/requestquote?pid=${pendingQuoteStorage.productId}`);
        } else {
          navigate(ROLES[role]);
        }
      }
    }
    // eslint-disable-next-line
  }, [session.isLogged, navigate]);

  return (
    <div className="Login">
      <div className="login-form-container">
        <div className="left-container"></div>
        <div className="right-container">
          <div className="login-form-desc">
            <div>Login</div>
            <div>Login to access membership area</div>
          </div>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { width: "100%", margin: "10px 0" },
            }}
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <TextField
              required
              error={state.requestState.error != null}
              onChange={handleChange}
              type="email"
              name="username"
              label="Email"
              variant="outlined"
            />
            <TextField
              required
              InputProps={{
                endAdornment: (
                  <div style={{ width: "180px", textAlign: "right" }}>
                    <NavLink style={navLinkStyle2} to="/forgotpassword">
                      Forgot Password?
                    </NavLink>
                  </div>
                ),
              }}
              error={state.requestState.error != null}
              onChange={handleChange}
              type="password"
              name="password"
              label="Password"
              variant="outlined"
            />
            <div style={{ fontSize: "small", color: "gray" }}>
              <span>Don't have an account? </span>
              <span>
                <NavLink style={navLinkStyle} to="/buyer/register">
                  Click here to register
                </NavLink>
              </span>
            </div>
            <div className="captcha-container"></div>
            <MuiButton
              label="Login"
              buttonType="111"
              loading={state.requestState.loading}
            />
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Login;
