import "../Styles/RequestQuote.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useMemo, useState, useEffect } from "react";
import ProductService from "../Services/Product";
import {
  Stack,
  TextField,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  Box,
} from "@mui/material/";
import {
  EmptyButton,
  GenericPrimaryButton,
  GenericSecondary,
  SmallSecondary,
} from "../Material/Button";
import { useReducer } from "react";
import { INITIAL_STATE, formReducer } from "../Reducers/FormReducer";
import {
  INPUTING,
  REQUEST_FAILED,
  REQUEST_SUCCESSFUL,
  SEND_REQUEST,
  PUSH_FORM_DATA,
  CLEAR_FORM,
} from "../Reducers/Actions";
import axios from "axios";
import BuyerService from "../Services/Buyer";
import { setAlert } from "../Redux/Features/Alert.js";
import { useDispatch } from "react-redux";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/free-mode";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, FreeMode } from "swiper";
import PageLoadingAnimation from "../Components/PageLoadingAnimation";
import ProgressiveImage from "react-progressive-graceful-image";
import Modal from "@mui/material/Modal";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { standard } from "../Styles/Modal";
import { Puller } from "../Material/Drawer";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { KeyboardBackspaceRounded } from "@mui/icons-material/";
import { productSpecifications } from "../Components/RequestQuoteSpecs";
import { IMAGES_TO_DISPLAY } from "../Components/ProductImages";

const initPendingQuoteSession = (productId, pendingQuoteId) => {
  const session = {
    isExists: true,
    productId,
    pendingQuoteId,
  };

  sessionStorage.setItem("pq_id", JSON.stringify(session));
};

const endPendingQuoteSession = async () => {
  const pq_session = sessionStorage.getItem("pq_id");
  if (pq_session) {
    const pendingQuoteSession = JSON.parse(pq_session);
    const buyerService = new BuyerService();
    try {
      const { errors } = await buyerService.deleteQuote(
        pendingQuoteSession.pendingQuoteId
      );
      if (errors.length === 0) {
        sessionStorage.removeItem("pq_id");
      }
    } catch (error) {}
  }
  window.scrollTo(0, 0);
};

export const strictMatch = (array, key) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === key) {
      return array[i];
    }
  }
  return null;
};

const RequestQuote = ({ session }) => {
  const [errorBoxes, setErrorBoxes] = useState([]);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const navigate = useNavigate();
  const handleRedirect = (redirect) => () => {
    navigate(redirect, { replace: true });
  };
  const { isLogged } = session;
  const rootDispatch = useDispatch();
  const [state, dispatch] = useReducer(formReducer, INITIAL_STATE);
  const [countries, setCountries] = useState(null);
  const { search } = useLocation();
  const { pid } = useMemo(
    () => Object.fromEntries([...new URLSearchParams(search)]),
    [search]
  );
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
        const { errors, data } = await productService.getProduct(
          abortController.signal,
          pid
        );
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
            containerSize: unfilteredData.supportedShippingContainers[0].label,
          };
          setParsedProduct(filteredData);
        }
      } catch (error) {}
    };
    pid && fetchData();
    return () => abortController.abort();
  }, [pid]);

  const handleChange = (e) => {
    dispatch({ type: INPUTING, prop: e.target.name, value: e.target.value });
  };

  const onInvalidFunction = (e) => {
    setErrorBoxes([...errorBoxes, e.target.name]);
  };

  const onValidFunction = (e) => {
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

  const preSubmission = (e) => {
    e.preventDefault();
    setErrorBoxes([]);
    if (parsedProduct.name === "Teak Round Logs") {
      state.payload = {
        ...state.payload,
        diameterUnit: "cm",
      };
    }
    setOpenDrawer(true);
  };

  const onInvalidForm = () => {
    handleFailedRequest("Please fill all required fields correctly", 9000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: SEND_REQUEST });
    state.payload.product = pid;
    const buyerService = new BuyerService();

    try {
      if (isLogged) {
        const { errors } = await buyerService.postQuote(state.payload);
        if (errors.length === 0) {
          dispatch({ type: REQUEST_SUCCESSFUL });
          setOpenDrawer(false);
          handleSuccessfullRequest(
            "Request successful, merchants will respond shortly",
            6000
          );
          endPendingQuoteSession();
          dispatch({ type: CLEAR_FORM });
        } else {
          dispatch({ type: REQUEST_FAILED });
          handleFailedRequest("Could not process request", 5000);
        }
      } else {
        const { data, errors } = await buyerService.postPendingQuote(
          state.payload
        );
        if (errors.length === 0) {
          const { _id } = data.data.data[0];
          initPendingQuoteSession(pid, _id);
          dispatch({ type: REQUEST_SUCCESSFUL });
          setOpenDrawer(false);
          handleSuccessfullRequest(
            "Your request is pending, please log in to complete request",
            6000
          );
          navigate("/login");
        } else {
          dispatch({ type: REQUEST_FAILED });
          handleFailedRequest("Could not process request", 5000);
        }
      }
    } catch (error) {}
  };

  const handleSuccessfullRequest = (message, timeOut) => {
    const payload = {
      severity: "success",
      message,
      timeOut,
    };
    rootDispatch(setAlert(payload));
  };

  const handleFailedRequest = (message, timeOut) => {
    const payload = {
      severity: "error",
      message,
      timeOut,
    };
    rootDispatch(setAlert(payload));
  };

  const list = () =>
    state.payload &&
    parsedProduct && (
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
                <span>
                  {state.payload.length} {state.payload.lengthUnit}
                </span>
              </div>
            </div>

            {state.payload?.diameter && (
              <div>
                <div>
                  <span>Diameter: </span>
                  <span>
                    {state.payload.diameter} {state.payload.diameterUnit}
                  </span>
                </div>
              </div>
            )}

            {state.payload?.thickness && (
              <div>
                <div>
                  <span>Thickness: </span>
                  <span>
                    {state.payload.thickness} {state.payload.thicknessUnit}
                  </span>
                </div>
              </div>
            )}

            {state.payload?.width && (
              <div>
                <div>
                  <span>Width: </span>
                  <span>
                    {state.payload.width} {state.payload.widthUnit}
                  </span>
                </div>
              </div>
            )}

            <div>
              <div>
                <span>Quantity: </span>
                <span>{state.payload.quantity} 20ft container (s)</span>
              </div>
            </div>

            {state.payload?.drying && (
              <div>
                <div>
                  <span>Drying: </span>
                  <span>Air Drying</span>
                </div>
              </div>
            )}

            <div>
              <div>
                <span>Additional Information: </span>
                <span>
                  {state.payload?.information
                    ? state.payload?.information
                    : "n/a"}
                </span>
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
            <SmallSecondary
              type="submit"
              loading={state?.requestState?.loading}
              variant="contained"
            >
              Confirm Request
            </SmallSecondary>
          </div>
        </div>
      </Box>
    );

  useEffect(() => {
    const abortController = new AbortController();
    const pq_session = sessionStorage.getItem("pq_id");
    if (pq_session) {
      const sessionObject = JSON.parse(pq_session);
      const { pendingQuoteId, productId } = sessionObject;
      if (productId === pid) {
        const fetchData = async () => {
          const buyerService = new BuyerService();
          try {
            const { errors, data } = await buyerService.getQuote(
              pendingQuoteId,
              abortController.signal
            );
            if (errors.length === 0) {
              const pendingQuote = {
                ...data.data.data[0],
                ...data.data.data[0].specification,
                dryingLabel: data.data.data[0].specification?.drying?.label,
              };
              dispatch({ type: PUSH_FORM_DATA, payload: pendingQuote });
            }
          } catch (error) {}
        };
        fetchData();
      }
    }
    return () => abortController.abort();
  }, [pid]);

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
              <div>
                <CloseRoundedIcon onClick={toggleDrawer(false)} />
              </div>
            </div>
            <div className="modal-body">{list()}</div>
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
            <div>
              <Puller />
            </div>
          </div>

          <div className="drawer-body">{list()}</div>
        </SwipeableDrawer>
      </div>

      <div>
        <div className="newGoBackContainer">
          <EmptyButton
            onClick={handleRedirect("/")}
            variant="text"
            startIcon={<KeyboardBackspaceRounded />}
          >
            Go Back
          </EmptyButton>
        </div>

        <div className="request-quote-page-header">
          <div>{parsedProduct.name}</div>
          <div>{parsedProduct.description}</div>
        </div>

        <div className="swiper-container">
          {parsedProduct.name ? (
            <>
              <Swiper
                spaceBetween={5}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                className={
                  parsedProduct.name === "Teak Round Logs"
                    ? "mySwiper2 teakRoundSwipeImagesTop"
                    : parsedProduct.name === "Teak Square Logs" &&
                      "mySwiper2 teakSquareSwipeImagesTop"
                }
              >
                {IMAGES_TO_DISPLAY[parsedProduct.name].map((src, index) => (
                  <SwiperSlide key={index}>
                    <ProgressiveImage src={src}>
                      {(src, loading) => (
                        <img
                          className={`image${loading ? " loading" : " loaded"}`}
                          src={src}
                          alt=""
                        />
                      )}
                    </ProgressiveImage>
                  </SwiperSlide>
                ))}
              </Swiper>

              <Swiper
                spaceBetween={5}
                onSwiper={setThumbsSwiper}
                slidesPerView={
                  parsedProduct.name === "Teak Round Logs"
                    ? 15
                    : parsedProduct.name === "Teak Square Logs" && 10
                }
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className={
                  parsedProduct.name === "Teak Round Logs"
                    ? "mySwiper teakRoundSwipeImagesBottom"
                    : parsedProduct.name === "Teak Square Logs" &&
                      "mySwiper teakSquareSwipeImagesBottom"
                }
              >
                {IMAGES_TO_DISPLAY[parsedProduct.name].map((src, index) => (
                  <SwiperSlide key={index}>
                    <ProgressiveImage src={src}>
                      {(src, loading) => (
                        <img
                          className={`image${loading ? " loading" : " loaded"}`}
                          src={src}
                          alt=""
                        />
                      )}
                    </ProgressiveImage>
                  </SwiperSlide>
                ))}
              </Swiper>
            </>
          ) : (
            <PageLoadingAnimation />
          )}
        </div>

        <Box
          component="form"
          sx={{
            "& > :not(style)": { width: "100%", margin: "30px 0" },
          }}
          autoComplete="off"
          className="request-quote-page-form"
          onSubmit={preSubmission}
          onInvalid={onInvalidForm}
        >
          <section>
            <div className="request-quote-section-title">
              1. Product Information
            </div>
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
                  <li>
                    To specify a range: use a hyphen (-) separator. [Example:
                    25-50 ("from 25 to 50")]
                  </li>
                  <li>
                    To specify a lower bound only: add the "+" sign. [Example:
                    25+ ("25 and more")]
                  </li>
                  <li>
                    Please use a point (.) as decimal separator and NOT a comma.
                  </li>
                </ul>
              </div>
            </div>
            <div className="request-quote-section-body select-input-form">
              {parsedProduct &&
                productSpecifications[parsedProduct.name]?.map(
                  (specification, index) =>
                    (specification.type === "text") |
                    (specification.type === "number") ? (
                      <div key={index}>
                        <div>{specification.label}</div>
                        <div className="select-input-form-with-units">
                          <TextField
                            type={specification.type}
                            value={
                              state.payload
                                ? state.payload[specification.name]
                                  ? state.payload[specification.name]
                                  : ""
                                : ""
                            }
                            required={specification.required}
                            inputProps={specification.inputProps ?? {}}
                            onBlur={onValidFunction}
                            error={strictMatch(errorBoxes, specification.name)}
                            onInvalid={onInvalidFunction}
                            onChange={handleChange}
                            size="small"
                            name={specification.name}
                            label={specification.label}
                            fullWidth
                          />
                          {specification.units && (
                            <FormControl required size="small">
                              <InputLabel>Units</InputLabel>
                              <Select
                                required
                                onBlur={onValidFunction}
                                error={strictMatch(
                                  errorBoxes,
                                  specification.units.name
                                )}
                                onInvalid={onInvalidFunction}
                                onChange={handleChange}
                                name={specification.units.name}
                                label="Units"
                                value={
                                  state.payload
                                    ? state.payload[specification.units.name]
                                      ? state.payload[specification.units.name]
                                      : specification.defaultUnit
                                      ? specification.defaultUnit.value
                                      : ""
                                    : ""
                                }
                              >
                                {specification.units &&
                                  specification.units.values.length > 0 &&
                                  specification.units.values.map(
                                    (unit, index) => (
                                      <MenuItem key={index} value={unit}>
                                        {unit}
                                      </MenuItem>
                                    )
                                  )}
                              </Select>
                            </FormControl>
                          )}
                        </div>
                      </div>
                    ) : (
                      specification.type === "select" && (
                        <div key={index}>
                          <div>{specification.label}</div>
                          <div>
                            <FormControl
                              required={specification.required}
                              size="small"
                              fullWidth
                            >
                              <InputLabel>{specification.label}</InputLabel>
                              <Select
                                value={
                                  state.payload
                                    ? state.payload[specification.name]
                                      ? state.payload[specification.name]
                                      : ""
                                    : ""
                                }
                                size="small"
                                onBlur={onValidFunction}
                                error={strictMatch(
                                  errorBoxes,
                                  specification.name
                                )}
                                onInvalid={onInvalidFunction}
                                onChange={handleChange}
                                name={specification.name}
                                label={specification.label}
                              >
                                {specification.menu.map((menuItem, index) => (
                                  <MenuItem key={index} value={menuItem}>
                                    {menuItem}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </div>
                        </div>
                      )
                    )
                )}
            </div>
          </section>

          <section>
            <div className="request-quote-section-title">
              3. Pricing and Delivery Information
            </div>
            <div className="request-quote-section-body select-input-form">
              <div>
                <div>Incoterm</div>
                <div>
                  <FormControl required size="small" fullWidth>
                    <InputLabel id="demo-multiple-chip-label">
                      Incoterm
                    </InputLabel>
                    <Select
                      value={
                        state.payload
                          ? state.payload.incoterm
                            ? state.payload.incoterm
                            : ""
                          : ""
                      }
                      error={strictMatch(errorBoxes, "incoterm")}
                      onBlur={onValidFunction}
                      onInvalid={onInvalidFunction}
                      onChange={handleChange}
                      name="incoterm"
                      label="Country"
                    >
                      <MenuItem value="FOB">FOB</MenuItem>
                      <MenuItem value="CFR">CFR</MenuItem>
                      <MenuItem value="CIF">CIF</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>

              <div>
                <div>Destination</div>
                <div>
                  <FormControl required size="small" fullWidth>
                    <InputLabel id="demo-multiple-chip-label">
                      Destination
                    </InputLabel>
                    <Select
                      value={
                        state.payload
                          ? state.payload.destination
                            ? state.payload.destination
                            : ""
                          : ""
                      }
                      error={strictMatch(errorBoxes, "destination")}
                      onBlur={onValidFunction}
                      onInvalid={onInvalidFunction}
                      onChange={handleChange}
                      required
                      name="destination"
                      label="Destination"
                    >
                      {countries &&
                        countries.map((country, index) => (
                          <MenuItem key={index} value={country.name}>
                            <div
                              style={{ display: "flex", alignItems: "center" }}
                            >
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
                  </FormControl>
                </div>
              </div>

              <div>
                <div>Destination Port</div>
                <div>
                  <TextField
                    value={
                      state.payload
                        ? state.payload.port
                          ? state.payload.port
                          : ""
                        : ""
                    }
                    required
                    error={strictMatch(errorBoxes, "port")}
                    onBlur={onValidFunction}
                    onInvalid={onInvalidFunction}
                    onChange={handleChange}
                    size="small"
                    fullWidth
                    type="text"
                    name="port"
                    label="Destination Port"
                    variant="outlined"
                  />
                </div>
              </div>
            </div>
          </section>

          <section>
            <div className="request-quote-section-title">
              4. Request Settings
            </div>
            <div className="request-quote-section-body select-input-form">
              <div>
                <div>Validity</div>
                <div>
                  <FormControl required size="small" fullWidth>
                    <InputLabel id="demo-multiple-chip-label">
                      Validity
                    </InputLabel>
                    <Select
                      value={
                        state.payload
                          ? state.payload.validity
                            ? state.payload.validity
                            : ""
                          : ""
                      }
                      error={strictMatch(errorBoxes, "validity")}
                      onBlur={onValidFunction}
                      onInvalid={onInvalidFunction}
                      onChange={handleChange}
                      required
                      name="validity"
                      label="Validity"
                    >
                      <MenuItem value="7">7 Days</MenuItem>
                      <MenuItem value="14">14 Days</MenuItem>
                      <MenuItem value="21">21 Days</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
            </div>
          </section>

          <Stack spacing={2} direction="row">
            <GenericPrimaryButton type="submit" variant="contained">
              Request Quote
            </GenericPrimaryButton>
            <GenericSecondary onClick={() => navigate("/")} variant="text">
              Back
            </GenericSecondary>
          </Stack>
        </Box>
      </div>
    </div>
  );
};

export default RequestQuote;
