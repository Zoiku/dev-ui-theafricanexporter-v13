import "../Styles/v2/AppLayout.css";
import Nav from "../Components/Merchant/Nav";
import { Outlet } from "react-router-dom";
import { useEffect, useState, useReducer } from "react";
import { useDispatch } from "react-redux";
import { initCompany } from "../Redux/Features/Session";
import { INITIAL_STATE, formReducer } from "../Reducers/FormReducer";
import {
  INPUTING,
  SEND_REQUEST,
  REQUEST_SUCCESSFUL,
  REQUEST_FAILED,
} from "../Reducers/Actions";
import { setAlert } from "../Redux/Features/Alert.js";
import AppLayout from "./AppLayout";
import MerchantService from "../Services/Merchant";
import Tutorial from "../Components/v2/components/Tutorial";
import DrawerModal from "../Components/v2/components/DrawerModal";
import { xMediumBox } from "../Styles/v2/box";
import { Box, TextField, Stack } from "@mui/material";
import MuiButton from "../Components/v2/components/MuiButtons";

const CompanyInputRow = ({ children }) => {
  return (
    <Stack direction="row" justifyContent="space-between" spacing={1}>
      {children}
    </Stack>
  );
};

const MerchantLayout = ({ session }) => {
  const user = session?.user;
  const rootDispatch = useDispatch();
  const [openTutorialView, setOpenTutorialView] = useState(false);
  const [state, dispatch] = useReducer(formReducer, INITIAL_STATE);
  const [openCompanyFormView, setOpenCompanyFormView] = useState(false);
  const toggleOpenCompanyFormView = (open) => () => {
    setOpenCompanyFormView(open);
  };

  const triggerSnackBarAlert = (message, severity) => {
    const payload = {
      severity,
      message,
    };
    rootDispatch(setAlert(payload));
  };

  const handleChange = (e) => {
    dispatch({ type: INPUTING, prop: e.target.name, value: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: SEND_REQUEST });
    const merchantService = new MerchantService();
    try {
      const { errors } = await merchantService.postCompanyDetails(
        state.payload
      );
      if (errors.length === 0) {
        dispatch({ type: REQUEST_SUCCESSFUL });
        rootDispatch(initCompany(state.payload));
        setOpenCompanyFormView(false);
        triggerSnackBarAlert("Company details updated successfully", "success");
      } else {
        dispatch({ type: REQUEST_FAILED });
        triggerSnackBarAlert(
          "Could not process request, please try again",
          "error"
        );
      }
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    if (user.hasOwnProperty("profile")) {
      const isLoggedBefore = user.profile.user?.isLoggedBefore;
      if (isLoggedBefore !== undefined) {
        if (isLoggedBefore) {
          setOpenTutorialView(false);
        } else {
          setOpenTutorialView(true);
        }
      }
    }
  }, [user]);

  useEffect(() => {
    if (user.hasOwnProperty("profile")) {
      const { company } = user.profile;
      if (!company) {
        setOpenCompanyFormView(true);
      }
    }
  }, [user]);

  const companyFormView = () => {
    return (
      <Box component="form" onSubmit={handleSubmit}>
        <div>
          <div style={{ fontWeight: 600, fontSize: "x-large" }}>
            Almost Done!
          </div>
          <small>Kindly fill in the following company details</small>
        </div>
        <Stack marginY={3} spacing={2}>
          <CompanyInputRow>
            <TextField
              name="year"
              label="Year Established"
              onChange={handleChange}
              inputProps={{ pattern: ".{4}" }}
              required
              fullWidth
            />
            <TextField
              required
              inputProps={{ min: 1 }}
              type="number"
              name="noOfEmployees"
              onChange={handleChange}
              label="No of Employees"
              fullWidth
            />
          </CompanyInputRow>
          <CompanyInputRow>
            <TextField
              name="supplyAbility"
              type="number"
              label="Supply Ability"
              inputProps={{ min: 1 }}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <div
                    style={{
                      width: "280px",
                      textAlign: "right",
                      fontSize: "12px",
                      color: "gray",
                    }}
                  >
                    20ft container per month
                  </div>
                ),
              }}
              fullWidth
              required
            />
          </CompanyInputRow>
          <CompanyInputRow>
            <TextField
              name="introduction"
              label="Company History"
              placeholder="Write something about your company, its founders, mission, vision, achievements, etc"
              onChange={handleChange}
              rows={3}
              multiline
              required
              fullWidth
            />
          </CompanyInputRow>
        </Stack>
        <MuiButton
          label="Complete Profile"
          buttonType="100"
          loading={state.requestState.loading}
        />
      </Box>
    );
  };

  return openTutorialView ? (
    <Tutorial
      openTutorialView={openTutorialView}
      setOpenTutorialView={setOpenTutorialView}
    />
  ) : (
    <div>
      <DrawerModal
        openState={openCompanyFormView}
        boxStyle={xMediumBox}
        toggleOpenState={toggleOpenCompanyFormView}
        title="Fill the Form"
        showCloseButton={false}
      >
        {companyFormView()}
      </DrawerModal>

      <AppLayout nav={<Nav session={session} />} userType="merchant">
        <Outlet />
      </AppLayout>
    </div>
  );
};

export default MerchantLayout;
