import "../../Styles/Register.css";
import { capitalizeString, strictMatch } from "../../Components/Functions/";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useEffect, useReducer, useState, useRef } from "react";
import { INITIAL_STATE, formReducer } from "../../Reducers/FormReducer";
import {
  INPUTING,
  SEND_REQUEST,
  REQUEST_SUCCESSFUL,
  REQUEST_FAILED,
} from "../../Reducers/Actions";
import AuthService from "../../Services/Auth";
import { useDispatch } from "react-redux";
import { setAlert } from "../../Redux/Features/Alert.js";
import axios from "axios";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Drawer from "@mui/material/Drawer";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import background from "../../Assets/background-1.png";
import { useNavigate, NavLink } from "react-router-dom";
import Modal from "@mui/material/Modal";
import { fillScreen } from "../../Styles/Modal";
import OtpInput from "react-otp-input";
import successImg from "../../Assets/Charco - High Five.png";
import MuiButton from "../../Components/v2/components/MuiButtons";
import { Stack } from "@mui/material";

const Register = () => {
  const [errorBoxes, setErrorBoxes] = useState([]);
  const navLinkStyle = {
    color: "inherit",
    fontSize: "inherit",
    fontWeight: "inherit",
    textDecoration: "inherit",
  };
  const resendCodeTimerInterval = useRef(null);
  const [resendCodeTimer, setResendCodeTimer] = useState({
    minutes: 5,
    seconds: 0,
  });
  const resendCodeTimerRef = useRef(resendCodeTimer);
  resendCodeTimerRef.current = resendCodeTimer;
  const defaultCountryData = { country: "India", countryCode: "91" };
  const navigate = useNavigate();
  const [consent, setConsent] = useState(false);
  const rootDispatch = useDispatch();
  const [state, dispatch] = useReducer(formReducer, INITIAL_STATE);
  const [countries, setCountries] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleChange = (e) => {
    if (e.target.name === "country") {
      countries.map((country) => {
        if (country.name === e.target.value) {
          const callingCode = country.callingCodes[0];
          handleManualChange("countryCode", callingCode);
        }
        return 1;
      });
    }
    dispatch({ type: INPUTING, prop: e.target.name, value: e.target.value });
  };

  const handleManualChange = (prop, value) => {
    dispatch({ type: INPUTING, prop, value });
  };

  const handleSubmit = async (e) => {
    dispatch({ type: SEND_REQUEST });
    e.preventDefault();
    state.payload = {
      ...state.payload,
      username: state.payload.email,
      mobileNo: state.payload.countryCode
        ? `${state.payload.countryCode} ${state.payload.telephone}`
        : `${defaultCountryData.countryCode} ${state.payload.telephone}`,
      country: state.payload.country
        ? state.payload.country
        : defaultCountryData.country,
      role: "BUYER",
    };
    const authService = new AuthService();
    try {
      const { errors } = await authService.register(state.payload);
      if (errors.length === 0) {
        setOpenDrawer(true);
        dispatch({ type: REQUEST_SUCCESSFUL });
        initCounddown();
      } else {
        dispatch({
          type: REQUEST_FAILED,
          error: errors[0].response.data.message,
        });
        triggerSnackBarAlert(
          capitalizeString(errors[0].response.data.message),
          "error"
        );
      }
    } catch (error) {
      throw error;
    }
  };

  const initCounddown = () => {
    if (!resendCodeTimerInterval.current) {
      resendCodeTimerInterval.current = setInterval(() => {
        if (resendCodeTimerRef.current.seconds > 0) {
          setResendCodeTimer(({ seconds }) => ({
            ...resendCodeTimerRef.current,
            seconds: seconds - 1,
          }));
        }

        if (resendCodeTimerRef.current.seconds === 0) {
          if (resendCodeTimerRef.current.minutes === 0) {
            setResendCodeTimer({ minutes: 5, seconds: 0 });
            clearInterval(resendCodeTimerInterval.current);
            resendCodeTimerInterval.current = null;
          } else {
            setResendCodeTimer(({ minutes }) => ({
              minutes: minutes - 1,
              seconds: 59,
            }));
          }
        }
      }, 1000);
    }
  };

  const handleResend = async () => {
    const authService = new AuthService();
    try {
      const { errors } = await authService.resendVerificationCode(
        state.payload.email
      );
      if (errors.length === 0) {
        initCounddown();
      } else {
        triggerSnackBarAlert(
          "Problem processing request, please try again",
          "error"
        );
      }
    } catch (error) {
      throw error;
    }
  };

  const handleCodeVerification = async (e) => {
    e.preventDefault();
    dispatch({ type: SEND_REQUEST });
    const authService = new AuthService();
    try {
      const { email, role, verificationCode } = state.payload;
      const { errors } = await authService.verifyCode(
        verificationCode,
        email,
        role
      );
      if (errors.length === 0) {
        setOpenDrawer(false);
        triggerSnackBarAlert("Email address verified, please login", "success");
        dispatch({ type: REQUEST_SUCCESSFUL });
        navigate("/login");
      } else {
        triggerSnackBarAlert("Could not verify code", "error");
        dispatch({ type: REQUEST_FAILED, error: "Could not verify code" });
      }
    } catch (error) {}
  };

  const triggerSnackBarAlert = (message, severity) => {
    const payload = {
      message,
      severity,
    };
    rootDispatch(setAlert(payload));
  };

  const toggleConsent = () => {
    setConsent((prev) => !prev);
  };

  useEffect(() => {
    const abortController = new AbortController();
    const fetchData = async () => {
      try {
        const { data } = await axios.get("https://restcountries.com/v2/all", {
          signal: abortController.signal,
        });
        setCountries(data);
      } catch (error) {}
    };
    fetchData();
    return () => abortController.abort();
  }, []);

  const onFormInvalid = (e) => {
    setErrorBoxes([...errorBoxes, e.target.name]);
    triggerSnackBarAlert("Please fill all required fields correctly", "error");
  };

  const onFormValid = (e) => {
    setErrorBoxes((prevErrors) => {
      const index = prevErrors.indexOf(e.target.name);
      if (index > -1) {
        const updatedErrors = [...prevErrors];
        updatedErrors.splice(index, 1);
        return updatedErrors;
      }
      return prevErrors;
    });
  };

  const list = () => (
    <Box
      component="form"
      role="presentation"
      onSubmit={handleCodeVerification}
      autoComplete="off"
      className="otp-password-container-container"
    >
      <div className="otp-content-container">
        <div className="otp-password-container">
          <div className="clip-art-image-container">
            <img src={successImg} alt="" />
          </div>

          <div className="otp-verification-text">
            <div>OTP Verification</div>
            <div>
              Enter the code sent to{" "}
              <span className="bold-bold-bold">{state.payload?.email}</span>
            </div>
          </div>
        </div>

        <div className="otp-controller-container">
          <div className="otp-controller">
            <OtpInput
              numInputs={6}
              placeholder="000000"
              renderInput={(props) => <input {...props} />}
              onChange={(e) => handleManualChange("verificationCode", e)}
              inputStyle={
                state.requestState?.error !== null
                  ? "errorInputStyle"
                  : "inputStyle"
              }
              shouldAutoFocus={true}
              name="verificationCode"
              value={state.payload?.verificationCode}
            />
          </div>
        </div>

        <div className="resend-otp-container">
          <div>
            Didn't receive OTP?{" "}
            <span
              className={
                resendCodeTimerInterval.current
                  ? "registration-resend-container-active"
                  : "registration-resend-container-not-active"
              }
              onClick={handleResend}
            >
              resend (
              {resendCodeTimer.minutes > 10
                ? resendCodeTimer.minutes
                : `0${resendCodeTimer.minutes}`}
              m{" "}
              {resendCodeTimer.seconds > 10
                ? resendCodeTimer.seconds
                : `0${resendCodeTimer.seconds}`}
              s)
            </span>
          </div>
        </div>

        <Stack>
          <MuiButton
            label="Verify"
            buttonType="111"
            loading={state.requestState.loading}
            disabled={
              state.payload?.verificationCode?.length === 6 ? false : true
            }
          />
        </Stack>
      </div>
    </Box>
  );

  return (
    <div className="Register">
      <div>
        <Modal
          open={openDrawer}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className="modal-container"
        >
          <Box sx={fillScreen}>
            <div className="modal-body">{list()}</div>
          </Box>
        </Modal>
      </div>

      <div>
        <Drawer
          className="drawer-container"
          variant="temporary"
          anchor="bottom"
          open={openDrawer}
        >
          <div className="drawer-body">{list()}</div>
        </Drawer>
      </div>

      <div className="register-form-container">
        <div className="left-container">
          <img src={background} alt="tae tae tea" />
        </div>
        <div className="right-container">
          <div className="register-form-desc">
            <div>Sign Up</div>
            <div>Buyer</div>
          </div>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { width: "100%", margin: "15px 0" },
            }}
            autoComplete="off"
            onSubmit={handleSubmit}
            onInvalid={onFormInvalid}
          >
            <div className="form-controller-duo-input">
              <TextField
                required
                helperText="Enter your First Name"
                fullWidth
                onChange={handleChange}
                type="text"
                name="firstName"
                label="First Name"
                variant="outlined"
                error={strictMatch(errorBoxes, "firstName")}
                onBlur={onFormValid}
              />
              <TextField
                required
                helperText="Enter your Last Name"
                fullWidth
                onChange={handleChange}
                type="text"
                name="lastName"
                label="Last Name"
                variant="outlined"
                error={strictMatch(errorBoxes, "lastName")}
                onBlur={onFormValid}
              />
            </div>
            <div className="form-controller-input">
              <TextField
                required
                helperText="Enter valid Email Address"
                fullWidth
                onChange={handleChange}
                type="email"
                name="email"
                label="Email"
                variant="outlined"
                error={strictMatch(errorBoxes, "email")}
                onBlur={onFormValid}
              />
            </div>
            <div className="form-controller-input">
              <TextField
                required
                inputProps={{ pattern: ".{8,}" }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={toggleShowPassword}
                        onMouseDown={toggleShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                helperText="Your password must be at least 8 characters long"
                fullWidth
                onChange={handleChange}
                type={showPassword ? "text" : "password"}
                name="password"
                label="Password"
                variant="outlined"
                error={strictMatch(errorBoxes, "password")}
                onBlur={onFormValid}
              />
            </div>
            <div className="form-controller-input">
              <TextField
                required
                helperText="Enter your Company Name"
                fullWidth
                onChange={handleChange}
                type="text"
                name="companyName"
                label="Company Name"
                variant="outlined"
                error={strictMatch(errorBoxes, "companyName")}
                onBlur={onFormValid}
              />
            </div>

            <div className="form-controller-input">
              <FormControl fullWidth>
                <InputLabel id="demo-multiple-chip-label">Country</InputLabel>
                <Select
                  required
                  name="country"
                  label="Country"
                  onChange={handleChange}
                  value={
                    state.payload.country
                      ? state.payload.country
                      : defaultCountryData.country
                  }
                >
                  {countries &&
                    countries.map((country) => (
                      <MenuItem key={country.name} value={country.name}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <img
                            style={{ marginRight: 10 }}
                            alt={country.name}
                            width={30}
                            src={country.flags.svg}
                          />{" "}
                          {country.name}
                        </div>
                      </MenuItem>
                    ))}
                </Select>
                <FormHelperText sx={{ marginLeft: "20px" }}>
                  Select Country
                </FormHelperText>
              </FormControl>
            </div>

            <div className="form-controller-input">
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      +
                      {state.payload.countryCode
                        ? state.payload.countryCode
                        : defaultCountryData.countryCode}
                    </InputAdornment>
                  ),
                }}
                fullWidth
                required
                helperText="8-15 characters (without 0 prefix)"
                onChange={handleChange}
                inputProps={{ pattern: "[^0][0-9]{8,15}" }}
                name="telephone"
                label="Phone Number"
                variant="outlined"
                error={strictMatch(errorBoxes, "telephone")}
                onBlur={onFormValid}
              />
            </div>

            <div>
              <FormGroup>
                <FormControlLabel
                  size="small"
                  control={
                    <Checkbox
                      required
                      checked={consent}
                      onChange={toggleConsent}
                      size="small"
                    />
                  }
                  label="Agree to terms and conditions"
                />
              </FormGroup>
            </div>

            <div className="captcha-container"></div>

            <MuiButton
              label="Sign up"
              buttonType="111"
              disabled={!consent}
              loading={state.requestState.loading}
            />

            <div className="quick-links-container">
              <div>
                <NavLink style={navLinkStyle} to="/login">
                  Login
                </NavLink>{" "}
              </div>
              <div>
                <NavLink style={navLinkStyle} to="/legal#privacy-policy">
                  Privacy Policy
                </NavLink>{" "}
              </div>
              <div>
                <NavLink style={navLinkStyle} to="/legal#tos">
                  Terms of Service
                </NavLink>{" "}
              </div>
            </div>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Register;
