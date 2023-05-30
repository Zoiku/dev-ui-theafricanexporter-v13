import { useEffect, useState, useReducer, useMemo } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import AuthService from "./Services/Auth";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import ForgotPassword from "./Pages/ForgotPassword";
import RequestQuote from "./Pages/RequestQuote";
import AboutPage from "./Pages/About";
import LegalPage from "./Pages/Legal";
import AdminDashboard from "./Pages/Admin/Dashboard";
import AdminUsers from "./Pages/Admin/Users";
import AdminRequests from "./Pages/Admin/Requests";
import AdminOrders from "./Pages/Admin/Orders";
import BuyerRegistration from "./Pages/Buyer/Register";
import BuyerDashboard from "./Pages/Buyer/Dashboard";
import BuyerRequests from "./Pages/Buyer/Requests";
import BuyerOrders from "./Pages/Buyer/Orders";
import BuyerSettings from "./Pages/Buyer/Settings";
import MerchantRegistration from "./Pages/Merchant/Register";
import MerchantDashboard from "./Pages/Merchant/Dashboard";
import MerchantRequests from "./Pages/Merchant/Requests";
import MerchantOrders from "./Pages/Merchant/Orders";
import MerchantQuotations from "./Pages/Merchant/Quotations";
import MerchantSettings from "./Pages/Merchant/Settings";
import SessionTimeout from "./Components/SessionTimeout";
import DefaultLayout from "./Layouts/Default";
import AdminLayout from "./Layouts/Admin";
import BuyerLayout from "./Layouts/Buyer";
import MerchantLayout from "./Layouts/Merchant";
import ProtectedAdminRoutes from "./Protected/AdminRoutes";
import ProtectedBuyerRoutes from "./Protected/BuyerRoutes";
import ProtectedMerchantRoutes from "./Protected/MerchantRoutes";
import { useDispatch, useSelector } from "react-redux";
import { clearAlerts } from "./Redux/Features/Alert";
import { initPath, initUser } from "./Redux/Features/Session";
import { MaterialAlert } from "./Material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { formReducer, INITIAL_STATE } from "./Reducers/FormReducer";
import {
  REQUEST_FAILED,
  REQUEST_SUCCESSFUL,
  SEND_REQUEST,
} from "./Reducers/Actions";
import AOS from "aos";
import "aos/dist/aos.css";
// import FAQ from "./Pages/FAQ";
import FAQ2 from "./Pages/FAQ2";

AOS.init();

const App = () => {
  // eslint-disable-next-line
  const [state, dispatch] = useReducer(formReducer, INITIAL_STATE);
  const navigate = useNavigate();
  const rootDispatch = useDispatch();
  const { search } = useLocation();
  const { redirect } = useMemo(
    () => Object.fromEntries([...new URLSearchParams(search)]),
    [search]
  );
  const { profile } = useSelector((state) => state.session.user);
  const { session } = useSelector((state) => state);
  const { alert } = useSelector((state) => state);
  const [openSnackBar, setOpenSnackBar] = useState(alert.active);
  const handleOpenSnackBar = () => setOpenSnackBar(true);
  const handleCloseSnackBar = (_event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackBar(false);
    rootDispatch(clearAlerts());
  };

  useEffect(() => {
    if (redirect) {
      if (session.isLogged) {
        navigate(redirect);
      } else {
        rootDispatch(initPath(redirect));
        navigate("/login");
      }
    }
    // eslint-disable-next-line
  }, [redirect]);

  useEffect(() => {
    dispatch({ type: SEND_REQUEST });
    const abortController = new AbortController();
    const fetchData = async () => {
      const authService = new AuthService();
      try {
        const { errors, data } = await authService.getUserProfile(
          abortController.signal
        );
        if (errors.length === 0) {
          const profile = data.data.data.at(0);
          dispatch({ type: REQUEST_SUCCESSFUL, payload: profile });
          rootDispatch(initUser(profile));
        } else {
          dispatch({ type: REQUEST_FAILED });
        }
      } catch (error) { }
    };

    session.isLogged && fetchData();

    return () => abortController.abort();
    // eslint-disable-next-line
  }, [session.isLogged]);

  useEffect(() => {
    alert.active && alert.severity && handleOpenSnackBar();
  }, [alert]);

  return (
    <div>
      <SessionTimeout session={session} />

      {alert.active && (
        <Snackbar
          open={openSnackBar}
          autoHideDuration={alert.timeOut}
          onClose={handleCloseSnackBar}
        >
          <MaterialAlert
            onClose={handleCloseSnackBar}
            severity={alert.severity}
            sx={{ width: "100%" }}
          >
            {alert.message}
          </MaterialAlert>
        </Snackbar>
      )}

      <Routes>
        <Route element={<DefaultLayout session={session} />}>
          <Route path="/" element={<Home session={session} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/buyer/register" element={<BuyerRegistration />} />
          <Route path="/merchant/register" element={<MerchantRegistration />} />
          <Route
            path="/requestquote"
            element={<RequestQuote session={session} />}
          />
          <Route exact path="/about" element={<AboutPage />} />
          <Route exact path="/legal" element={<LegalPage />} />
          <Route exact path="/faq" element={<FAQ2 />} />
          {/* <Route exact path="/faq2" element={<FAQ2 />} /> */}
        </Route>

        <Route element={<ProtectedAdminRoutes session={session} />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/requests" element={<AdminRequests />} />
            <Route path="/admin/orders" element={<AdminOrders />} />
          </Route>
        </Route>

        <Route element={<ProtectedMerchantRoutes session={session} />}>
          <Route element={<MerchantLayout session={session} />}>
            <Route
              path="/merchant/dashboard"
              element={<MerchantDashboard session={session} />}
            />
            <Route path="/merchant/requests" element={<MerchantRequests />} />
            <Route
              path="/merchant/quotations"
              element={<MerchantQuotations />}
            />
            <Route path="/merchant/orders" element={<MerchantOrders />} />
            <Route
              path="/merchant/settings"
              element={<MerchantSettings profile={profile} />}
            />
          </Route>
        </Route>

        <Route element={<ProtectedBuyerRoutes session={session} />}>
          <Route element={<BuyerLayout session={session} />}>
            <Route
              path="/buyer/dashboard"
              element={<BuyerDashboard session={session} />}
            />
            <Route path="/buyer/requests" element={<BuyerRequests />} />
            <Route path="/buyer/orders" element={<BuyerOrders />} />
            <Route path="/buyer/settings" element={<BuyerSettings />} />
          </Route>
        </Route>

        <Route element={<DefaultLayout session={session} />}>
          <Route path="*" element={<Home session={session} />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
