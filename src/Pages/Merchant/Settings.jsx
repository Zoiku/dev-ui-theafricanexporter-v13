import "../../Styles/Settings.css";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import { StyledBadge } from "../../Material/Avatar";
import { SettingsPageUpdateButton, SettingsPageCancelButton, SettingsPageUpdateButtonSecondary } from "../../Material/Button";
import { useEffect, useState, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputLabel from '@mui/material/InputLabel';
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import { getStyles, MenuProps } from "../../Material/Select";
import { useTheme } from "@mui/material/styles";
import ProductService from "../../Services/Product";
import OutlinedInput from '@mui/material/OutlinedInput';
import { INITIAL_STATE, formReducer } from "../../Reducers/FormReducer";
import { INPUTING, SEND_REQUEST, REQUEST_SUCCESSFUL, REQUEST_FAILED, PUSH_FORM_DATA } from "../../Reducers/Actions";
import MerchantService from "../../Services/Merchant";
import { setAlert } from "../../Redux/Features/Alert.js";

const Settings = () => {
    const [state, dispatch] = useReducer(formReducer, INITIAL_STATE);
    const theme = useTheme();
    const rootDispatch = useDispatch();
    const getFirstWord = (string) => string.split(' ').shift();
    const { profile } = useSelector(state => state.session.user);
    const [updateProfileButton, setUpdateProfileButton] = useState(false);
    const toggleUpdate = (open) => (_event) => {
        setUpdateProfileButton(open);
    };

    const refreshPage = () => {
        window.location.reload(false);
    }

    useEffect(() => {
        const filteredData = {
            id: profile.user.id,
            companyIntroduction: profile?.company?.introduction,
            companyNoEmployees: profile?.company?.noOfEmployees,
            companyAddress: profile?.address,
            supplyAbility: profile?.company?.supplyAbility,
            businessType: profile?.type?.label,
            year: profile?.company?.year,
            subscription: profile?.subscription
        }
        dispatch({ type: PUSH_FORM_DATA, payload: filteredData });
    }, [profile]);

    // subscriptions
    const [selectedSubscriptions, setSelectedSubscription] = useState([]);
    const [subscriptions, setSubscriptions] = useState([]);
    const [products, setProducts] = useState([]);
    const handleMultipleSelectChange = (event) => {
        const { target: { value }, } = event;
        setSelectedSubscription(typeof value === 'string' ? value.split(',') : value,);
    };

    const handleChange = (e) => {
        if (e.target.name === "category") {
            const _subscriptions = products.filter(product => product.category === e.target.value).map(product => product.name);
            setSubscriptions(_subscriptions);
        }
        dispatch({ type: INPUTING, prop: e.target.name, value: e.target.value });
    };

    useEffect(() => {
        const abortController = new AbortController();
        const fetchData = async () => {
            const productService = new ProductService();
            try {
                const { errors, data } = await productService.getProducts(abortController.signal);
                if (errors.length === 0) {
                    const _products = data.data.data.map(data => {
                        return {
                            category: data.category.label,
                            product: data.name
                        };
                    });

                    setProducts(_products);
                    const _subscriptions = _products.map(product => product.product);
                    setSubscriptions(_subscriptions);
                    const _selectedSubscriptions = profile.subscription.map(subscription => subscription.product);
                    setSelectedSubscription(_selectedSubscriptions);
                }
            } catch (error) { }
        }
        fetchData();
        return () => abortController.abort();
        // eslint-disable-next-line 
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: SEND_REQUEST });
        const merchantService = new MerchantService();
        state.payload.subscription = products.filter(product => selectedSubscriptions.includes(product.product));

        try {
            const { errors } = await merchantService.update(state.payload);
            if (errors.length === 0) {
                dispatch({ type: REQUEST_SUCCESSFUL });
                handleSuccessfullRequest("Successfully updated your profile", 3000);
                setUpdateProfileButton(false);
                refreshPage();
            } else {
                dispatch({ type: REQUEST_FAILED });
                handleFailedRequest("Could not process your order", 5000);
            }
        } catch (error) { }
    }

    const handleSuccessfullRequest = (message, timeOut) => {
        const payload = {
            severity: "success",
            message,
            timeOut
        }
        rootDispatch(setAlert(payload));
    }

    const handleFailedRequest = (message, timeOut) => {
        const payload = {
            severity: "error",
            message,
            timeOut
        }
        rootDispatch(setAlert(payload));
    }

    return (
        <div className="Settings-Page">
            <div className="user-profile-container">
                <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="dot"
                >
                    <Avatar className="user-avatar" alt={profile.user.firstName} src="/" />
                </StyledBadge>
                <div className="user-short-desc-container">
                    <div>{profile.user.firstName} {profile.user.lastName}</div>
                    <div>{profile.user.email}</div>
                </div>
            </div>

            <div className="user-profile-sections-container">
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { width: '100%', margin: "50px 0" },
                    }}
                    autoComplete="off"
                    onSubmit={handleSubmit}
                >

                    <section>
                        <div className="user-profile-section-title">Personal Details</div>
                        <div className="form-controller-input-duo form-controller">
                            <TextField value={profile.user.firstName} disabled fullWidth label="First Name" variant="outlined" />
                            <TextField value={profile.user.lastName} disabled fullWidth label="Last Name" variant="outlined" />
                        </div>
                        <div className="form-controller-input form-controller">
                            <TextField value={profile.user.email} disabled fullWidth type="text" name="email" label="Email" variant="outlined" />
                        </div>
                    </section>

                    <section>
                        <div className="user-profile-section-title">Company Details</div>
                        <div className="form-controller-input form-controller">
                            <TextField onChange={handleChange} disabled={!updateProfileButton} value={state.payload?.companyIntroduction ? state.payload?.companyIntroduction : ''} multiline rows={5} fullWidth type="text" name="companyIntroduction" label="Company Introduction" variant="outlined" />
                        </div>
                        <div className="form-controller-input-duo form-controller">
                            <TextField disabled value={profile.user.companyName} fullWidth type="text" name="companyName" label="Company Name" variant="outlined" />
                            <TextField onChange={handleChange} disabled={!updateProfileButton} value={state.payload.companyAddress} fullWidth type="text" name="companyAddress" label="Company Address" variant="outlined" />
                        </div>
                        <div className="form-controller-input-duo form-controller">
                            <TextField disabled value={profile.company.year} fullWidth type="text" name="companyYear" label="Company Year" variant="outlined" />
                            <TextField onChange={handleChange} disabled={!updateProfileButton} value={state.payload?.companyNoEmployees ? state.payload?.companyNoEmployees : ''} fullWidth type="text" name="companyNoEmployees" label="Number of Employees" variant="outlined" />
                        </div>
                        <div className="form-controller-input form-controller">
                            <FormControl disabled={!updateProfileButton} required fullWidth>
                                <InputLabel>Business Type</InputLabel>
                                <Select onChange={handleChange} name="businessType" label="Business Type" value={state.payload?.businessType ? state.payload?.businessType : ''}>
                                    <MenuItem value="Manufacturer/Producer">Manufacturer/Producer</MenuItem>
                                    <MenuItem value="Trader">Trader</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div className="form-controller-input form-controller">
                            <TextField onChange={handleChange} disabled={!updateProfileButton} value={state.payload?.supplyAbility ? getFirstWord(state.payload?.supplyAbility) : ''} InputProps={{ endAdornment: <InputAdornment position="end"> <div>20ft Container per Month</div> </InputAdornment> }} fullWidth type="text" name="supplyAbility" label="Supply Ability" variant="outlined" />
                        </div>
                    </section>

                    <section>
                        <div className="user-profile-section-title">Subscription</div>
                        <div className="form-controller-input form-controller">
                            <div className="form-controller-input form-controller">
                                <FormControl disabled={!updateProfileButton} required fullWidth>
                                    <InputLabel>Category</InputLabel>
                                    <Select value={profile?.subscription.map(subscription => subscription.category).at(0)} name="category" label="Category" onChange={handleChange}>
                                        {
                                            products &&
                                            products.length > 0 &&
                                            [...new Set(products.map(product => product.category))].map(category => <MenuItem key={category} value={category}>{category}</MenuItem>)
                                        }
                                    </Select>
                                </FormControl>
                            </div>
                        </div>
                        <div className="form-controller-input form-controller">
                            <FormControl disabled={!updateProfileButton} required fullWidth>
                                <InputLabel id="demo-multiple-chip-label">Subscriptions</InputLabel>
                                <Select
                                    labelId="demo-multiple-chip-label"
                                    id="demo-multiple-chip"
                                    multiple
                                    value={selectedSubscriptions}
                                    onChange={handleMultipleSelectChange}
                                    input={<OutlinedInput id="select-multiple-chip" label="Subscriptions" />}
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
                        </div>
                    </section>

                    <div className="settings-button-controller-container">
                        {
                            updateProfileButton ?
                                <>
                                    <SettingsPageUpdateButtonSecondary type="submit" loading={state.requestState.loading} className="settings-button-controller" variant="contained">Save Changes</SettingsPageUpdateButtonSecondary>
                                    <SettingsPageCancelButton onClick={toggleUpdate(false)} className="settings-button-controller" variant="text">Cancel</SettingsPageCancelButton>
                                </>
                                :
                                <>
                                    <SettingsPageUpdateButton onClick={toggleUpdate(true)} className="settings-button-controller" variant="contained">Update Profile</SettingsPageUpdateButton>
                                </>
                        }
                    </div>
                </Box>
            </div>
        </div>
    )
}

export default Settings;