import "../Styles/RequestQuote.css"
import { useLocation, useNavigate } from "react-router-dom";
import { useMemo, useState, useEffect } from "react";
import ProductService from "../Services/Product";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { GenericPrimaryButton, GenericSecondary, SmallSecondary } from "../Material/Button";
import { useReducer } from "react";
import { INITIAL_STATE, formReducer } from "../Reducers/FormReducer";
import { INPUTING, REQUEST_FAILED, REQUEST_SUCCESSFUL, SEND_REQUEST, PUSH_FORM_DATA } from "../Reducers/Actions";
import axios from "axios";
import BuyerService from "../Services/Buyer";
import { setAlert } from "../Redux/Features/Alert.js";
import { useDispatch } from "react-redux";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import PageLoadingAnimation from "../Components/PageLoadingAnimation";
import ProgressiveImage from "react-progressive-graceful-image";
import Modal from '@mui/material/Modal';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { standard } from "../Styles/Modal";
import { Puller } from "../Material/Drawer";
import SwipeableDrawer from '@mui/material/SwipeableDrawer';

import tr11 from "../Assets/Logs/t11.jpg";
import tr12 from "../Assets/Logs/t12.jpg";
import tr13 from "../Assets/Logs/t13.jpg";
import tr14 from "../Assets/Logs/t14.jpg";
import tr15 from "../Assets/Logs/t15.jpg";
import tr16 from "../Assets/Logs/t16.jpg";
import tr17 from "../Assets/Logs/t17.jpg";
import tr18 from "../Assets/Logs/t18.jpg";
import tr19 from "../Assets/Logs/t19.jpg";
import tr20 from "../Assets/Logs/t20.jpg";
import tre from "../Assets/Logs/te.jpg";
import tre1 from "../Assets/Logs/te1.jpg";
import tre2 from "../Assets/Logs/te2.jpg";
import tre3 from "../Assets/Logs/te4.jpg";

import ts1 from "../Assets/Logs/t1.jpg";
import ts2 from "../Assets/Logs/t2.jpg";
import ts3 from "../Assets/Logs/t3.jpg";
import ts4 from "../Assets/Logs/t4.jpg";
import ts5 from "../Assets/Logs/t5.jpg";
import ts6 from "../Assets/Logs/t6.jpg";
import ts7 from "../Assets/Logs/t7.jpg";
import ts8 from "../Assets/Logs/t8.jpg";
import ts9 from "../Assets/Logs/t9.jpg";
import ts10 from "../Assets/Logs/t10.jpg";


const SPECIFICATION_DETAILS = {
    "Teak Round Logs": [{ name: "length", label: "Length", units: [{ name: "lengthUnit", values: ["cm", "m"] }] }, { name: "diameter", label: "Diameter", defaultUnit: "cm", units: [{ name: "diameterUnit", values: ["cm"] }] }, { name: "quantity", label: "Quantity", defaultUnit: "20ft Container", units: [{ name: "quantityUnit", values: ["20ft Container"] }] }],
    "Teak Square Logs": [{ name: "length", label: "Length", units: [{ name: "lengthUnit", values: ["cm", "m"] }] }, { name: "thickness", label: "Thickness", units: [{ name: "thicknessUnit", values: ["mm", "cm"] }] }, { name: "quantity", label: "Quantity", defaultUnit: "20ft Container", units: [{ name: "quantityUnit", values: ["20ft Container"] }] }, { name: "width", label: "Width", units: [{ name: "widthUnit", values: ["mm", "cm"] }] }, { name: "dryingLabel", label: "Drying", menu: ["Air Drying", "Kiln Drying", "Fresh Sawn"] },],
};

const IMAGES_TO_DISPLAY = {
    "Teak Round Logs": [tr11, tr13, tr15, tr17, tre, tre1, tre2, tre3],
    "Teak Square Logs": [ts2, ts4, ts5, ts7, ts8, ts10]
}

const RequestQuote = ({ session }) => {
    const { isLogged } = session;
    const rootDispatch = useDispatch();
    const [state, dispatch] = useReducer(formReducer, INITIAL_STATE)
    const [countries, setCountries] = useState(null);
    const navigate = useNavigate();
    const { search } = useLocation();
    const { pid } = useMemo(() => Object.fromEntries([...new URLSearchParams(search)]), [search]);
    const [parsedProduct, setParsedProduct] = useState({});
    const [openDrawer, setOpenDrawer] = useState(false);
    const toggleDrawer = (open) => (_event) => {
        setOpenDrawer(open);
    };

    useEffect(() => {
        const abortController = new AbortController();
        const fetchData = async () => {
            const productService = new ProductService();
            try {
                const { errors, data } = await productService.getProduct(abortController.signal, pid);
                if (errors.length === 0) {
                    const unfilteredData = data.data.data[0];
                    const filteredData = {
                        id: unfilteredData.id,
                        description: unfilteredData.description,
                        name: unfilteredData.name,
                        speciesType: unfilteredData.species.type.label,
                        species: unfilteredData.species.label,
                        volume: unfilteredData.volume.value,
                        volumeUnit: unfilteredData.volume.unit,
                        origin: unfilteredData.origin.country,
                        containerSize: unfilteredData.supportedShippingContainers[0].label
                    }
                    setParsedProduct(filteredData);
                }
            } catch (error) { }
        }
        pid && fetchData();
        return () => abortController.abort();
    }, [pid]);

    const handleChange = (e) => { dispatch({ type: INPUTING, prop: e.target.name, value: e.target.value }); }

    const removePendingQuote = async () => {
        const id = sessionStorage.getItem(`${parsedProduct.name}_pqid`);
        if (id) {
            const buyerService = new BuyerService();
            try {
                const { errors } = await buyerService.deleteQuote(id);
                if (errors.length === 0) {
                    sessionStorage.removeItem(`${parsedProduct.name}_pqid`);
                    document.location.reload();
                }
            } catch (error) { }
        } else {
            document.location.reload();
        }
    }

    const preSubmission = (e) => {
        e.preventDefault();

        if (parsedProduct.name === "Teak Round Logs") {
            state.payload = {
                ...state.payload,
                diameterUnit: "cm"
            }
        }

        setOpenDrawer(true);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: SEND_REQUEST });
        state.payload.product = pid;
        const buyerService = new BuyerService();

        try {
            if (isLogged) {
                const { errors } = await buyerService.postQuote(state.payload);
                if (errors.length === 0) {
                    removePendingQuote();
                    dispatch({ type: REQUEST_SUCCESSFUL });
                    setOpenDrawer(false);
                    handleSuccessfullRequest("Request successful, merchants will respond shortly", 6000);
                } else {
                    dispatch({ type: REQUEST_FAILED });
                    handleFailedRequest("Could not process request", 5000);
                }
            } else {
                const { data, errors } = await buyerService.postPendingQuote(state.payload);
                if (errors.length === 0) {
                    const { _id } = data.data.data[0];
                    sessionStorage.setItem(`${parsedProduct.name}_pqid`, _id);
                    dispatch({ type: REQUEST_SUCCESSFUL });
                    setOpenDrawer(false);
                    handleSuccessfullRequest("Your request is pending, please log in to complete request", 6000);
                    navigate("/login");
                } else {
                    dispatch({ type: REQUEST_FAILED });
                    handleFailedRequest("Could not process request", 5000);
                }
            }
        } catch (error) { }
    };

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

    const list = () => (
        state.payload && parsedProduct &&
        <Box
            component="form"
            role="presentation"
            onSubmit={handleSubmit}
            autoComplete="off"
        >
            <div className="request-summary-container">
                <div>
                    <div>1. Product Introduction</div>
                    <div>
                        <div>
                            <span>Type of Species: </span>
                            <span>{parsedProduct.speciesType}</span>
                        </div>
                    </div>

                    <div>
                        <div>
                            <span>Container size: </span>
                            <span>20ft Container</span>
                        </div>
                    </div>

                    <div>
                        <div>
                            <span>Species: </span>
                            <span>{parsedProduct.species}</span>
                        </div>
                    </div>

                    <div>
                        <div>
                            <span>Origin: </span>
                            <span>{parsedProduct.origin}</span>
                        </div>
                    </div>
                </div>

                <div>
                    <div>2. Specifications</div>
                    <div>
                        <div>
                            <span>Length: </span>
                            <span>{state.payload.length} {state.payload.lengthUnit}</span>
                        </div>
                    </div>

                    {
                        state.payload?.diameter &&
                        <div>
                            <div>
                                <span>Diameter: </span>
                                <span>{state.payload.diameter} {state.payload.diameterUnit}</span>
                            </div>
                        </div>
                    }

                    {
                        state.payload?.thickness &&
                        <div>
                            <div>
                                <span>Thickness: </span>
                                <span>{state.payload.thickness} {state.payload.thicknessUnit}</span>
                            </div>
                        </div>
                    }

                    {
                        state.payload?.width &&
                        <div>
                            <div>
                                <span>Width: </span>
                                <span>{state.payload.width} {state.payload.widthUnit}</span>
                            </div>
                        </div>
                    }

                    <div>
                        <div>
                            <span>Quantity: </span>
                            <span>{state.payload.quantity} 20ft container (s)</span>
                        </div>
                    </div>

                    {
                        state.payload?.drying &&
                        <div>
                            <div>
                                <span>Drying: </span>
                                <span>Air Drying</span>
                            </div>
                        </div>
                    }

                    <div>
                        <div>
                            <span>Additional Information: </span>
                            <span>{state.payload?.information ? state.payload?.information : "n/a"}</span>
                        </div>
                    </div>
                </div>

                <div>
                    <div>3. Pricing and Delivery Information</div>
                    <div>
                        <div>
                            <span>Incoterm: </span>
                            <span>{state.payload.incoterm}</span>
                        </div>
                    </div>

                    <div>
                        <div>
                            <span>Destination: </span>
                            <span>{state.payload.destination}</span>
                        </div>
                    </div>

                    <div>
                        <div>
                            <span>Destination Port: </span>
                            <span>{state.payload.port}</span>
                        </div>
                    </div>
                </div>

                <div>
                    <div>4. Request Settings</div>
                    <div>
                        <div>
                            <span>Validity: </span>
                            <span>{state.payload.validity} days</span>
                        </div>
                    </div>
                </div>

                <div>
                    <SmallSecondary type="submit" loading={state.requestState.loading} variant="contained">Confirm Quote</SmallSecondary>
                </div>
            </div>
        </Box >
    );

    useEffect(() => {
        const abortController = new AbortController();
        const pendingQuoteId = sessionStorage.getItem(`${parsedProduct.name}_pqid`);

        if (pendingQuoteId) {
            const fetchData = async () => {
                const buyerService = new BuyerService();
                try {
                    const { errors, data } = await buyerService.getQuote(pendingQuoteId, abortController.signal);
                    if (errors.length === 0) {
                        const _pendingQuote = {
                            ...data.data.data[0],
                            ...data.data.data[0].specification,
                            dryingLabel: data.data.data[0].specification?.drying?.label
                        };

                        dispatch({ type: PUSH_FORM_DATA, payload: _pendingQuote });
                    }
                } catch (error) { }
            }
            fetchData();
        }
        return () => abortController.abort();
    }, [parsedProduct.name]);

    useEffect(() => {
        const abortController = new AbortController();
        const fetchData = async () => {
            try {
                const { data } = await axios.get("https://restcountries.com/v2/all", { signal: abortController.signal });
                setCountries(data);
            } catch (error) { }
        }
        fetchData();
        return () => abortController.abort();
    }, []);

    return (
        <div className="RequestQuote-Page">
            <div>
                <Modal
                    open={openDrawer}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    className="modal-container"
                >
                    <Box sx={standard}>
                        <div className="modal-title-container">
                            <div>Request Summary</div>
                            <div><CloseRoundedIcon onClick={toggleDrawer(false)} /></div>
                        </div>
                        <div className="modal-body">
                            {list()}
                        </div>
                    </Box>
                </Modal>
            </div>

            <div>
                <SwipeableDrawer
                    className="drawer-container"
                    variant="temporary"
                    anchor="bottom"
                    open={openDrawer}
                    onOpen={toggleDrawer(true)}
                    onClose={toggleDrawer(false)}
                >
                    <div className="drawer-title-container">
                        <div>Request Summary</div>
                        <div><Puller /></div>
                    </div>

                    <div className="drawer-body">
                        {list()}
                    </div>
                </SwipeableDrawer>
            </div>

            <div>
                <div className="request-quote-page-header">
                    <div>{parsedProduct.name}</div>
                    <div>{parsedProduct.description}</div>
                </div>

                <div className="swiper-container">
                    {
                        parsedProduct.name ?
                            <Swiper
                                navigation={true}
                                pagination={true}
                                modules={[Pagination, Navigation]}
                                className="mySwiper"
                                lazy={true}
                            >
                                {IMAGES_TO_DISPLAY[parsedProduct.name].map((src, index) =>
                                    <SwiperSlide key={index}>
                                        <ProgressiveImage src={src} >
                                            {(src, loading) => (
                                                <img
                                                    className={`image${loading ? " loading" : " loaded"}`}
                                                    src={src}
                                                    alt=""
                                                />
                                            )}
                                        </ProgressiveImage>
                                    </SwiperSlide>
                                )}
                            </Swiper>
                            :
                            <PageLoadingAnimation />
                    }
                </div>

                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { width: '100%', margin: "30px 0" },
                    }}
                    autoComplete="off"
                    className="request-quote-page-form"
                    onSubmit={preSubmission}
                >
                    <section>
                        <div className="request-quote-section-title">1. Product Information</div>
                        <div className="request-quote-section-body profile-information-body">
                            <div>Types of Species: {parsedProduct.speciesType}</div>
                            <div>Container size: {parsedProduct.containerSize}</div>
                            <div>Species: {parsedProduct.species}</div>
                            <div>Origin: {parsedProduct.origin}</div>
                        </div>
                    </section>

                    <section>
                        <div className="request-quote-section-title">2. Specifications</div>
                        <div className="request-quote-specification-note-container">
                            <div>
                                <div>How to specify dimensions</div>
                                <ul>
                                    <li>To specify a range: use a hyphen (-) separator. [Example: 25-50 ("from 25 to 50")]</li>
                                    <li>To specify a lower bound only: add the "+" sign. [Example: 25+ ("25 and more")]</li>
                                    <li>Please use a point (.) as decimal separator and NOT a comma.</li>
                                </ul>
                            </div>
                        </div>
                        <div className="request-quote-section-body select-input-form">
                            {
                                parsedProduct && SPECIFICATION_DETAILS[parsedProduct.name]?.map((specification, index) =>
                                    specification.name === "dryingLabel" ?
                                        <div key={index}>
                                            <div>Drying</div>
                                            <div>
                                                <FormControl required size="small" fullWidth>
                                                    <InputLabel id="demo-multiple-chip-label">Drying</InputLabel>
                                                    <Select value={state.payload[specification.name] ? state.payload[specification.name] : ''} onChange={handleChange} name={specification.name} label={specification.label}>
                                                        {
                                                            specification.menu.map((menuItem, index) =>
                                                                <MenuItem key={index} value={menuItem}>{menuItem}</MenuItem>
                                                            )
                                                        }
                                                    </Select>
                                                </FormControl>
                                            </div>
                                        </div>
                                        :
                                        <div key={index}>
                                            <div>{specification.label}</div>
                                            <div className="select-input-form-with-units">
                                                <TextField value={state.payload[specification.name] ? state.payload[specification.name] : ''} inputProps={specification.name === "quantity" ? { min: 1, pattern: '[0-9+.-]{1,}' } : {}} required onChange={handleChange} size="small" fullWidth name={specification.name} type={specification.name === "quantity" ? "number" : "text"} label={specification.label} variant="outlined" />
                                                {
                                                    specification.units &&
                                                    specification.units.length > 0 &&
                                                    specification.units.map((specificationUnits, index) =>
                                                        <FormControl required key={index} size="small" fullWidth>
                                                            <InputLabel>Units</InputLabel>
                                                            <Select value={state.payload[specificationUnits.name] ? state.payload[specificationUnits.name] : (specification.defaultUnit ? specification.defaultUnit : '')} key={specificationUnits.name} size="small" onChange={handleChange} name={specificationUnits.name} label="Units">
                                                                {
                                                                    specificationUnits.values &&
                                                                    specificationUnits.values.length > 0 &&
                                                                    specificationUnits.values.map(value =>
                                                                        <MenuItem key={value} value={value}>
                                                                            {value}
                                                                        </MenuItem>
                                                                    )
                                                                }
                                                            </Select>
                                                        </FormControl>
                                                    )
                                                }
                                            </div>
                                        </div>
                                )
                            }
                            <div>
                                <div>Additional Information</div>
                                <div>
                                    <TextField value={state.payload.information ? state.payload.information : ''} onChange={handleChange} multiline rows={1} size="small" fullWidth type="text" name="information" label="Additional Information" variant="outlined" />
                                </div>
                            </div>
                        </div>
                    </section>

                    <section>
                        <div className="request-quote-section-title">3. Pricing and Delivery Information</div>
                        <div className="request-quote-section-body select-input-form">
                            <div>
                                <div>Incoterm</div>
                                <div>
                                    <FormControl required size="small" fullWidth>
                                        <InputLabel id="demo-multiple-chip-label">Incoterm</InputLabel>
                                        <Select value={state.payload.incoterm ? state.payload.incoterm : ''} onChange={handleChange} name="incoterm" label="Country">
                                            <MenuItem value="FOB">
                                                FOB
                                            </MenuItem>
                                            <MenuItem value="CFR">
                                                CFR
                                            </MenuItem>
                                            <MenuItem value="CIF">
                                                CIF
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                            </div>

                            <div>
                                <div>Destination</div>
                                <div>
                                    <FormControl required size="small" fullWidth>
                                        <InputLabel id="demo-multiple-chip-label">Destination</InputLabel>
                                        <Select value={state.payload.destination ? state.payload.destination : ''} onChange={handleChange} required name="destination" label="Destination">
                                            {
                                                countries &&
                                                countries.map((country, index) =>
                                                    <MenuItem key={index} value={country.name}>
                                                        <div style={{ display: "flex", alignItems: "center" }}><img style={{ marginRight: 10 }} alt={country.name} width={30} src={country.flags.svg} /> {country.name}</div>
                                                    </MenuItem>
                                                )
                                            }
                                        </Select>
                                    </FormControl>
                                </div>
                            </div>

                            <div>
                                <div>Destination Port</div>
                                <div>
                                    <TextField value={state.payload.port ? state.payload.port : ''} required onChange={handleChange} size="small" fullWidth type="text" name="port" label="Destination Port" variant="outlined" />
                                </div>
                            </div>
                        </div>
                    </section>

                    <section>
                        <div className="request-quote-section-title">4. Request Settings</div>
                        <div className="request-quote-section-body select-input-form">
                            <div>
                                <div>Validity</div>
                                <div>
                                    <FormControl required size="small" fullWidth>
                                        <InputLabel id="demo-multiple-chip-label">Validity</InputLabel>
                                        <Select value={state.payload.validity ? state.payload.validity : ''} onChange={handleChange} required name="validity" label="Validity">
                                            <MenuItem value="7">
                                                7 Days
                                            </MenuItem>
                                            <MenuItem value="14">
                                                14 Days
                                            </MenuItem>
                                            <MenuItem value="21">
                                                21 Days
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                            </div>
                        </div>
                    </section>

                    <Stack spacing={2} direction="row">
                        <GenericPrimaryButton type="submit" variant="contained">Request Quote</GenericPrimaryButton>
                        <GenericSecondary onClick={() => navigate("/")} variant="text">Back</GenericSecondary>
                    </Stack>
                </Box>
            </div>
        </div>
    );
};

export default RequestQuote;