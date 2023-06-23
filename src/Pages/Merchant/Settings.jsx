import "../../Styles/v2/SettingsPage.css";
import { useDispatch } from "react-redux";
import { useReducer, useState, useEffect } from "react";
import MerchantService from "../../Services/Merchant";
import { INITIAL_STATE, formReducer } from "../../Reducers/FormReducer";
import {
  INPUTING,
  SEND_REQUEST,
  REQUEST_SUCCESSFUL,
  REQUEST_FAILED,
  PUSH_FORM_DATA,
} from "../../Reducers/Actions";
import { initUser } from "../../Redux/Features/Session";
import { setAlert } from "../../Redux/Features/Alert.js";
import {
  Box,
  Stack,
  TextField,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";
import {
  SettingsPageUpdateButton,
  SettingsPageCancelButton,
  SettingsPageUpdateButtonSecondary,
} from "../../Material/Button";
import AvatarProfile from "../../Components/AvatarProfile";
import { ProfileSection, ProfileSectionRow } from "../SettingsPageSections";
import { capitalizeFirstLetter } from "../../Components/Functions";
import { getStyles, MenuProps } from "../../Material/Select";
import { useTheme } from "@mui/material/styles";
import ProductService from "../../Services/Product";

const Settings = ({ profile }) => {
  const theme = useTheme();
  const rootDispatch = useDispatch();
  const [state, dispatch] = useReducer(formReducer, INITIAL_STATE);

  const [selectedSubscriptions, setSelectedSubscription] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [products, setProducts] = useState([]);

  const handleMultipleSelectChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedSubscription(
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleChange = (e) => {
    if (e.target.name === "category") {
      const _subscriptions = products
        .filter((product) => product.category === e.target.value)
        .map((product) => product.name);
      setSubscriptions(_subscriptions);
    }
    dispatch({ type: INPUTING, prop: e.target.name, value: e.target.value });
  };

  const [updateProfileButton, setUpdateProfileButton] = useState(false);
  const toggleUpdate = (open) => (_event) => {
    setUpdateProfileButton(open);
  };

  const triggerSnackBarAlert = (message, severity) => {
    const payload = {
      severity,
      message,
    };
    rootDispatch(setAlert(payload));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: SEND_REQUEST });
    const merchantService = new MerchantService();
    state.payload.subscription = products.filter((product) =>
      selectedSubscriptions.includes(product.product)
    );
    const sessionProfile = {
      company: {
        introduction: state.payload.companyIntroduction,
        noOfEmployees: state.payload.companyNoEmployees,
        supplyAbility: state.payload.supplyAbility,
        year: state.payload.year,
      },
      address: state.payload.companyAddress,
      subscription: state.payload.subscription,
      type: {
        label: state.payload.businessType,
      },
    };
    try {
      const { errors } = await merchantService.update(state.payload);
      if (errors.length === 0) {
        window.scrollTo(0, 0);
        setUpdateProfileButton(false);
        dispatch({ type: REQUEST_SUCCESSFUL });
        rootDispatch(initUser(sessionProfile));
        triggerSnackBarAlert("Profile updated successfully", "success");
      } else {
        dispatch({ type: REQUEST_FAILED });
        triggerSnackBarAlert("Could not update your profile", "error");
      }
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    const filteredData = {
      id: profile?.user?.id,
      companyIntroduction: profile?.company?.introduction,
      companyNoEmployees: profile?.company?.noOfEmployees,
      companyAddress: profile?.address,
      supplyAbility: profile?.company?.supplyAbility,
      businessType: profile?.type?.label,
      year: profile?.company?.year,
      subscription: profile?.subscription,
    };
    dispatch({ type: PUSH_FORM_DATA, payload: filteredData });
  }, [profile]);

  useEffect(() => {
    const abortController = new AbortController();
    const fetchData = async () => {
      const productService = new ProductService();
      try {
        const { errors, data } = await productService.getProducts(
          abortController.signal
        );
        if (errors.length === 0) {
          const _products = data.data.data.map((data) => {
            return { category: data.category.label, product: data.name };
          });
          const _subscriptions = _products.map((product) => product.product);
          const _selectedSubscriptions = profile.subscription.map(
            (subscription) => subscription.product
          );
          setProducts(_products);
          setSubscriptions(_subscriptions);
          setSelectedSubscription(_selectedSubscriptions);
        }
      } catch (error) {}
    };
    fetchData();
    return () => abortController.abort();
    // eslint-disable-next-line
  }, []);

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Stack direction="row" alignItems="center" spacing={2}>
        <AvatarProfile
          variant="circular"
          overlap="circular"
          height={180}
          width={180}
          fontSize={70}
          fullName={profile?.user?.firstName}
        />
        <div>
          <div style={{ fontSize: 40, fontWeight: 700 }}>
            {profile?.user?.firstName} {profile?.user?.lastName}
          </div>
          <div>{profile?.user?.email}</div>
        </div>
      </Stack>

      <div className="profile_sections">
        <ProfileSection title="Personal Details">
          <ProfileSectionRow>
            <TextField
              fullWidth
              label="First Name"
              value={profile?.user?.firstName}
              disabled={true}
            />
            <TextField
              fullWidth
              label="Last Name"
              value={profile?.user?.lastName}
              disabled={true}
            />
          </ProfileSectionRow>
          <ProfileSectionRow>
            <TextField
              fullWidth
              label="Email"
              value={profile?.user?.email}
              disabled={true}
            />
          </ProfileSectionRow>
        </ProfileSection>

        <ProfileSection title="Company Details">
          <ProfileSectionRow>
            <TextField
              name="companyIntroduction"
              label="Company Introduction"
              multiline
              rows={4}
              onChange={handleChange}
              value={state.payload?.companyIntroduction}
              disabled={!updateProfileButton}
              fullWidth
            />
          </ProfileSectionRow>
          <ProfileSectionRow>
            <TextField
              name="companyName"
              label="Company Name"
              value={profile.user.companyName}
              disabled={true}
              fullWidth
            />
            <TextField
              name="companyAddress"
              label="Company Address"
              onChange={handleChange}
              value={state?.payload?.companyAddress}
              disabled={!updateProfileButton}
              fullWidth
            />
          </ProfileSectionRow>
          <ProfileSectionRow>
            <TextField
              name="companyYear"
              label="Company Year"
              value={profile?.company?.year}
              disabled={true}
              fullWidth
            />
            <TextField
              name="companyNoEmployees"
              label="Number of Employees"
              onChange={handleChange}
              value={state?.payload?.companyNoEmployees}
              disabled={!updateProfileButton}
              fullWidth
            />
          </ProfileSectionRow>
          <ProfileSectionRow>
            <FormControl fullWidth disabled={!updateProfileButton}>
              <InputLabel>Business Type</InputLabel>
              <Select
                onChange={handleChange}
                name="businessType"
                label="Business Type"
                value={
                  state.payload?.businessType ? state.payload?.businessType : ""
                }
              >
                <MenuItem value="Manufacturer/Producer">
                  Manufacturer/Producer
                </MenuItem>
                <MenuItem value="Trader">Trader</MenuItem>
              </Select>
            </FormControl>
          </ProfileSectionRow>
          <ProfileSectionRow>
            <TextField
              name="supplyAbility"
              label="Supply Ability"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    20ft Container per Month
                  </InputAdornment>
                ),
              }}
              onChange={handleChange}
              value={state?.payload?.supplyAbility}
              disabled={!updateProfileButton}
              fullWidth
            />
          </ProfileSectionRow>
        </ProfileSection>

        <ProfileSection title="Subscription">
          <ProfileSectionRow>
            <FormControl fullWidth disabled={!updateProfileButton}>
              <InputLabel>Category</InputLabel>
              <Select
                value={profile?.subscription
                  .map((subscription) => subscription.category)
                  .at(0)}
                name="category"
                label="Category"
                onChange={handleChange}
              >
                {products &&
                  products.length > 0 &&
                  [...new Set(products.map((product) => product.category))].map(
                    (category) => (
                      <MenuItem key={category} value={category}>
                        {capitalizeFirstLetter(String(category).toLowerCase())}
                      </MenuItem>
                    )
                  )}
              </Select>
            </FormControl>
          </ProfileSectionRow>
          <ProfileSectionRow>
            <FormControl fullWidth disabled={!updateProfileButton}>
              <InputLabel id="demo-multiple-chip-label">
                Subscriptions
              </InputLabel>
              <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                value={selectedSubscriptions}
                onChange={handleMultipleSelectChange}
                input={
                  <OutlinedInput
                    id="select-multiple-chip"
                    label="Subscriptions"
                  />
                }
                MenuProps={MenuProps}
              >
                {subscriptions.map((subscription) => (
                  <MenuItem
                    key={subscription}
                    value={subscription}
                    style={getStyles(subscription, subscriptions, theme)}
                  >
                    {subscription}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </ProfileSectionRow>
        </ProfileSection>

        {updateProfileButton ? (
          <Stack direction="row" spacing={1}>
            <SettingsPageUpdateButtonSecondary
              type="submit"
              loading={state.requestState.loading}
              className="settings-button-controller"
              variant="contained"
            >
              Save Changes
            </SettingsPageUpdateButtonSecondary>
            <SettingsPageCancelButton
              disabled={state.requestState.loading}
              onClick={toggleUpdate(false)}
              className="settings-button-controller"
              variant="text"
            >
              Cancel
            </SettingsPageCancelButton>
          </Stack>
        ) : (
          <>
            <SettingsPageUpdateButton
              onClick={toggleUpdate(true)}
              className="settings-button-controller"
              variant="contained"
            >
              Update Profile
            </SettingsPageUpdateButton>
          </>
        )}
      </div>
    </Box>
  );
};

export default Settings;
