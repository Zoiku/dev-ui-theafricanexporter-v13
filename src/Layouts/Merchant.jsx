import "../Styles/AppLayout.css";
import { Outlet } from "react-router-dom";
import Nav from "../Components/Merchant/Nav";
import Menu from "../Components/Merchant/Menu";
import AppNav from "../Components/Merchant/AppNav";
import { useEffect, useState, useReducer } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Drawer from '@mui/material/Drawer';
import { useDispatch } from "react-redux";
import { initCompany } from "../Redux/Features/Session"
import { PrimaryButton } from "../Material/Button";
import { INITIAL_STATE, formReducer } from "../Reducers/FormReducer";
import { INPUTING, SEND_REQUEST, REQUEST_SUCCESSFUL, REQUEST_FAILED } from "../Reducers/Actions";
import { setAlert } from "../Redux/Features/Alert.js"
import CloseIcon from '@mui/icons-material/Close';
import { endSession } from "../Redux/Features/Session";
import MerchantService from "../Services/Merchant";
import { inAppSmall } from "../Styles/Modal";
import Modal from '@mui/material/Modal';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

const MerchantLayout = ({ session }) => {
    const { user } = session;
    const [state, dispatch] = useReducer(formReducer, INITIAL_STATE);
    const rootDispatch = useDispatch();
    const [openDrawer, setOpenDrawer] = useState(false);

    const handleChange = (e) => { dispatch({ type: INPUTING, prop: e.target.name, value: e.target.value }); }

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: SEND_REQUEST });
        const merchantService = new MerchantService();
        try {
            const { errors } = await merchantService.postCompanyDetails(state.payload);
            if (errors.length === 0) {
                rootDispatch(initCompany(state.payload));
                dispatch({ type: REQUEST_SUCCESSFUL });
                handleSuccessfulRequest("Success", 3000);
                setOpenDrawer(false);
            } else {
                dispatch({ type: REQUEST_FAILED });
                handleFailedRequest("Could not process request, please try again", 5000);
            }
        } catch (error) { }
    };

    const handleFailedRequest = (message, timeOut) => {
        const payload = {
            severity: "error",
            message,
            timeOut
        }
        rootDispatch(setAlert(payload));
    };

    const handleSuccessfulRequest = (message, timeOut) => {
        const payload = {
            severity: "success",
            message,
            timeOut
        }
        rootDispatch(setAlert(payload));
    };

    const handleLogout = () => (open) => {
        setOpenDrawer(open);
        rootDispatch(endSession());
    };

    useEffect(() => {
        if (user.hasOwnProperty('profile')) {
            const { company } = user.profile;
            if (!company) {
                setOpenDrawer(true);
            }
        }

    }, [user]);

    const list = () => (
        <Box
            role="presentation"
            component="form"
            onSubmit={handleSubmit}
        >
            <div className="registration-form-verification-code-container">
                <div>Almost Done!</div>
                <div>Kindly fill in the following company details.</div>
            </div>
            <div className="form-controller-container">
                <div className="form-controller-input form-controller-duo-input">
                    <TextField size="small" name="year" onChange={handleChange} fullWidth label="Year Established" variant="outlined" />
                    <TextField size="small" type="number" name="noOfEmployees" onChange={handleChange} fullWidth label="Number of Employees" variant="outlined" />
                </div>

                <div className="form-controller-input">
                    <TextField size="small" type="number" onChange={handleChange} InputProps={{ endAdornment: <div style={{ width: "130px", textAlign: "right", fontSize: "12px", color: "gray" }}>20ft per month</div> }} fullWidth label="Supply Ability" name="supplyAbility" variant="outlined" />
                </div>

                <div className="form-controller-input">
                    <TextField size="small" rows={3} onChange={handleChange} multiline fullWidth label="Company History" name="introduction" variant="outlined" />
                </div>
            </div>
            <div><PrimaryButton size="small" loading={state.requestState.loading} type="submit" variant="contained" sx={{ width: "100%" }}>Complete Profile</PrimaryButton></div>
        </Box>
    );

    return (
        <div className="Merchant-Layout App-Layout">
            <div>
                <Modal
                    open={openDrawer}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    className="modal-container"
                >
                    <Box sx={inAppSmall}>
                        <div className="modal-title-container">
                            <div>Complete Company Profile</div>
                            <div><CloseRoundedIcon onClick={handleLogout(false)} /></div>
                        </div>
                        <div className="modal-body">
                            {list()}
                        </div>
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
                    <div className="drawer-title-container">
                        <div>Complete Company Profile</div>
                        <div><CloseIcon className="close-icon" onClick={handleLogout(false)} /></div>
                    </div>
                    <div className="drawer-body">
                        {list()}
                    </div>
                </Drawer>
            </div>

            <Nav session={session} />
            <div className="app-container">
                <div className="app-menu-container">
                    <Menu />
                </div>
                <div className="app-body-container">
                    <div className="app-body">
                        <Outlet />
                    </div>
                </div>
                <div className="app-bottom-navigation">
                    <AppNav />
                </div>
            </div>
        </div>
    );
}

export default MerchantLayout;