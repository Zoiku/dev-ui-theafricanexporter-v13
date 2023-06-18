import React from "react";
import { useEffect, useState } from "react";
import MerchantService from "../../../Services/Merchant";
import { Box, Stack, Pagination, TextField } from "@mui/material";
import "../../../Styles/v2/Requests.css";
import "../../../Styles/v2/Pagination.css";
import DrawerModal from "../../v2/components/DrawerModal";
import { widerBox } from "../../../Styles/v2/box";
import { SectionItem, StackItem } from "../../v2/components/Lists";
import { incotermNote } from "../../v2/components/IncotermNotes";
import { SmallSecondary } from "../../../Material/Button";
import { OfferTableV1 } from "../../v2/components/OfferTable";
import {
  AddCircleOutlineRounded,
  RemoveCircleOutline,
} from "@mui/icons-material/";

const Requests = () => {
  const [page, setPage] = useState(1);
  const [paginationCount, setPagination] = useState(0);
  const handlePaginationChange = (_e, value) => {
    setPage(value);
    window.scroll(0, 0);
  };

  const [rows, setRows] = useState([]);
  const [rowsLoading, setRowsLoading] = useState(false);

  const [selectedRequest, setSelectedRequest] = useState(null);
  const [openRequestView, setOpenRequestView] = useState(false);
  const toggleOpenRequestView = (open) => () => {
    setOpenRequestView(open);
  };
  const handleOpenRequestView = (id) => () => {
    const request = rows.find((row) => row.id === id);
    setSelectedRequest(request);
    setOpenRequestView(true);
  };

  useEffect(() => {
    const abortController = new AbortController();
    const fetchData = async () => {
      setRowsLoading(true);
      const merchantService = new MerchantService();
      try {
        const { data, errors } = await merchantService.getRequests(
          abortController.signal
        );
        if (errors.length === 0) {
          const updatedPaginationCount = Math.ceil(data.data.totalCount / 5);
          setPagination(updatedPaginationCount);
          const filteredData = data.data.data.map((request, index) => {
            const quotationProduct = request?.quotationProducts?.at(0);
            return {
              index: index + 1,
              id: request?._id,
              requestNo: request?.requestNo,
              productName: quotationProduct?.product?.name,
              terms: request?.buyerQuotationIncoterm?.label,
              quantity: quotationProduct?.specification?.quantity,
              createdOn: new Date(request?.createdOn).toDateString(),
              species: quotationProduct?.product?.species?.label,
              speciesType: quotationProduct?.product?.species?.type?.label,
              origin: quotationProduct?.product?.origin?.country,
              destination: request?.destination,
              port: request?.port,
              validity: request?.validity,
              containerSize:
                quotationProduct?.product?.supportedShippingContainers[0]
                  ?.label,
              volume: quotationProduct?.product?.volume?.value,
              volumeUnit: quotationProduct?.product?.volume?.unit,
              specification: {
                diameter: quotationProduct?.specification?.diameter,
                diameterUnit: quotationProduct?.specification?.diameterUnit,
                drying: quotationProduct?.specification?.drying?.label,
                length: quotationProduct?.specification?.length,
                lengthUnit: quotationProduct?.specification?.lengthUnit,
                thickness: quotationProduct?.specification?.thickness,
                thicknessUnit: quotationProduct?.specification?.thicknessUnit,
                width: quotationProduct?.specification?.width,
                widthUnit: quotationProduct?.specification?.widthUnit,
              },
            };
          });

          filteredData.sort((a, b) => b.requestNo - a.requestNo);
          setRows(filteredData);
        }
      } catch (error) {
        throw error;
      }
      setRowsLoading(false);
    };
    fetchData();
  }, []);

  const RequestsView = () => {
    return (
      <Box className="request_rows_container">
        {rows && rows.length > 0 ? (
          rows.slice(5 * page - 5, page * 5 - 1).map((request, index) => (
            <Stack
              onClick={handleOpenRequestView(request?.id)}
              className="request_row_container"
              direction="column"
              key={index}
              spacing={2}
            >
              <Stack
                className="request_row_inner_container"
                direction="row"
                justifyContent="space-between"
              >
                <div>Request Number {request?.requestNo}</div>
                <div>{request?.destination}</div>
              </Stack>
              <Stack
                className="request_row_inner_container"
                direction="row"
                justifyContent="space-between"
              >
                <div>{request?.createdOn}</div>
                <div>{request?.productName}</div>
              </Stack>
            </Stack>
          ))
        ) : (
          <div></div>
        )}
      </Box>
    );
  };

  const RequestView = () => {
    const requestID = selectedRequest?.id;
    const [offerRows, setOfferRows] = useState(1);
    const [quotation, setQuotation] = useState({
      quantity: null,
      requestID,
      incotermArray: [],
    });

    const handleChangeOfferRows = (type) => () => {
      switch (type) {
        case "MORE":
          setOfferRows((previousOfferRows) => previousOfferRows + 1);
          break;
        case "LESS":
          setOfferRows((previousOfferRows) => previousOfferRows - 1);
          break;
        default:
          break;
      }
    };

    const handleChange = (e) => {
      setQuotation({ ...quotation, [e.target.name]: e.target.value });
    };

    const handleQuotationSubmit = (e) => {
      e.preventDefault();
      console.log(quotation);
    };

    return (
      selectedRequest && (
        <Box>
          <div>
            <SectionItem sectionTitle="Product Information">
              <StackItem title="Product" value={selectedRequest?.productName} />
              <StackItem title="Species" value={selectedRequest?.species} />
              <StackItem
                title="Type of Species"
                value={selectedRequest?.speciesType}
              />
              <StackItem title="Origin" value={selectedRequest?.origin} />
              <StackItem
                title="Container size"
                value={selectedRequest?.containerSize}
              />
            </SectionItem>
            <SectionItem sectionTitle="Specifications">
              <StackItem
                title="Length"
                value={`${selectedRequest?.specification?.length} ${selectedRequest?.specification?.lengthUnit}`}
              />
              <StackItem
                title="Diameter"
                value={`${selectedRequest?.specification?.diameter} ${selectedRequest?.specification?.diameterUnit}`}
              />
              <StackItem
                title="Quantity"
                value={`${selectedRequest?.quantity} ${selectedRequest?.containerSize}`}
              />
            </SectionItem>
            <SectionItem sectionTitle="Pricing and Delivery Information">
              <StackItem title="Incoterm" value={selectedRequest?.terms} />
              <StackItem
                title="Destination"
                value={selectedRequest?.destination}
              />
              <StackItem
                title="Destination Port"
                value={selectedRequest?.port}
              />
            </SectionItem>
            <SectionItem sectionTitle="Request Settings">
              <StackItem
                title="Validity"
                value={`${selectedRequest?.validity} Days`}
              />
            </SectionItem>

            <Box
              onSubmit={handleQuotationSubmit}
              component="form"
              className="request_quotation_box_container"
            >
              <div className="request_quotation_box">
                <div className="request_quotation_box_title_container">
                  <div className="request_quotation_box_title">
                    Please Provide Your Quote For This Request
                  </div>
                </div>

                <Stack direction="column" marginTop={2} spacing={2}>
                  <TextField
                    name="quantity"
                    label="Quantity"
                    type="number"
                    size="small"
                    variant="outlined"
                    placeholder={`Allowed maximum is ${selectedRequest?.quantity}`}
                    helperText="Kindly indicate the quantity you can supply for this request"
                    InputProps={{
                      inputProps: {
                        min: 0,
                      },
                    }}
                    onChange={handleChange}
                    required
                  />

                  <OfferTableV1
                    product={selectedRequest?.productName}
                    incoterm={selectedRequest?.terms}
                    offerRows={offerRows}
                    setQuotation={setQuotation}
                    quotation={quotation}
                  />
                  <Stack direction="column" spacing={0.5}>
                    <Stack
                      onClick={handleChangeOfferRows("MORE")}
                      spacing={1}
                      className="request_quote_managae_rows"
                      direction="row"
                      alignContent="center"
                    >
                      <AddCircleOutlineRounded fontSize="small" />
                      <Box>Add new row</Box>
                    </Stack>
                    {offerRows > 1 && (
                      <Stack
                        onClick={handleChangeOfferRows("LESS")}
                        spacing={1}
                        className="request_quote_managae_rows"
                        direction="row"
                        alignContent="center"
                      >
                        <RemoveCircleOutline fontSize="small" />
                        <Box>Remove last row</Box>
                      </Stack>
                    )}
                  </Stack>

                  <Box>{incotermNote(selectedRequest.terms)}</Box>

                  <SmallSecondary type="submit" variant="contained">
                    Post Quote
                  </SmallSecondary>
                </Stack>
              </div>
            </Box>
          </div>
        </Box>
      )
    );
  };

  return (
    <main>
      <RequestsView />
      <DrawerModal
        boxStyle={widerBox}
        openState={openRequestView}
        toggleOpenState={toggleOpenRequestView}
        title="Request Details"
      >
        <RequestView />
      </DrawerModal>
      <Pagination
        className="request_pagination"
        showFirstButton
        showLastButton
        onChange={handlePaginationChange}
        siblingCount={2}
        boundaryCount={0}
        count={paginationCount}
      />
    </main>
  );
};

export default Requests;

// import "../../../Styles/Requests.css";
// import "../../../Styles/Pagination.css";
// import { useState, useEffect, useRef, useReducer } from "react";
// import MerchantService from "../../../Services/Merchant";
// import CircularProgress from "@mui/material/CircularProgress";
// import Pagination from "@mui/material/Pagination";
// import SwipeableDrawer from "@mui/material/SwipeableDrawer";
// import Box from "@mui/material/Box";
// import { Puller } from "../../../Material/Drawer";
// import { SmallSecondary } from "../../../Material/Button";
// import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
// import RemoveCircleOutlineRoundedIcon from "@mui/icons-material/RemoveCircleOutlineRounded";
// import { INITIAL_STATE, formReducer } from "../../../Reducers/FormReducer.js";
// import {
//   REQUEST_FAILED,
//   REQUEST_SUCCESSFUL,
//   SEND_REQUEST,
// } from "../../../Reducers/Actions";
// import TextField from "@mui/material/TextField";
// import { setAlert } from "../../../Redux/Features/Alert.js";
// import { useDispatch } from "react-redux";
// import { inAppWider } from "../../../Styles/Modal";
// import Modal from "@mui/material/Modal";
// import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogTitle from "@mui/material/DialogTitle";
// import { Transition } from "../../../Material/Dialog";
// import {
//   GenericSecondary,
//   GenericPrimaryButton,
// } from "../../../Material/Button";
// import { inAppDialog } from "../../../Styles/Dialog";
// import NoRowsOverlay from "../../../Material/Overlay";

// const PRODUCTS = {
//   TEAK_SQUARE_LOGS: "Teak Square Logs",
//   TEAK_ROUND_LOGS: "Teak Round Logs",
// };

// const TYPE = {
//   INCREASE: "increase",
//   DECREASE: "decrease",
// };

// const Requests = () => {
//   const [quantity, setQuantity] = useState(0);
//   const [refreshTable, setRefreshTable] = useState(false);
//   const rootDispatch = useDispatch();
//   const [state, dispatch] = useReducer(formReducer, INITIAL_STATE);
//   const incotermRef = useRef([]);
//   const [incotermSettings, setIncotermSettings] = useState([]);
//   const iOS =
//     typeof navigator !== "undefined" &&
//     /iPad|iPhone|iPod/.test(navigator.userAgent);
//   const [rows, setRows] = useState(null);
//   const [rowsLoading, setRowsLoading] = useState(false);
//   const [page, setPage] = useState(1);
//   const [paginationCount, setPagination] = useState(null);
//   const [incotermRows, setIncotermRows] = useState(1);
//   const [selectedRequestId, setSelectedRequestId] = useState(null);
//   const selectRequest = (id) => setSelectedRequestId(id);
//   const selectedRequest =
//     rows && rows.find((row) => row.id === selectedRequestId);
//   const [openDrawer, setOpenDrawer] = useState(false);
//   const toggleDrawer = (open) => (_event) => {
//     setOpenDrawer(open);
//   };

//   const [openDialogConfirm, setOpenDialogConfirm] = useState(false);
//   const handleClickOpenDialogConfirm = (e) => {
//     e.preventDefault();
//     setOpenDialogConfirm(true);
//   };
//   const handleCloseDialogConfirm = () => {
//     setOpenDialogConfirm(false);
//   };

//   const handleCloseDrawer = () => {
//     setOpenDrawer(false);
//     setIncotermRows(1);
//     incotermRef.current = [];
//     setIncotermSettings([]);
//     setSelectedRequestId(null);
//     setQuantity(0);
//   };

// const handlePaginationChange = (_event, value) => {
//   setPage(value);
//   window.scroll(0, 0);
// };

//   const handleIncotermSize = (type) => {
//     if (type === TYPE.INCREASE) {
//       setIncotermRows((prev) => prev + 1);
//     } else if (type === TYPE.DECREASE) {
//       setIncotermRows((prev) => prev - 1);
//     }
//   };

//   const handleChange = (e, index) => {
//     const terms = selectedRequest?.terms;
//     if (e.target.name === "quantity") {
//       setQuantity(e.target.value);
//       incotermRef.current.map((incoterm) => {
//         incoterm.totalPrice = incoterm?.price
//           ? incoterm.price * e.target.value
//           : 0;
//         if (terms === "CIF") {
//           incoterm.insurance = incoterm?.price
//             ? incoterm.price * e.target.value * 0.0025
//             : 0;
//           incoterm.freight = incoterm?.freightRate
//             ? e.target.value * incoterm?.freightRate
//             : 0;
//           incoterm.totalAmount = incoterm?.freight
//             ? incoterm?.price * e.target.value * 0.0025 +
//               incoterm?.price * e.target.value +
//               e.target.value * incoterm?.freightRate
//             : 0;
//         } else if (terms === "FOB") {
//           incoterm.totalAmount = incoterm?.price
//             ? incoterm.price * e.target.value
//             : 0;
//         } else if (terms === "CFR") {
//           incoterm.freight = incoterm?.freightRate
//             ? e.target.value * incoterm?.freightRate
//             : 0;
//           incoterm.totalAmount = incoterm?.freight
//             ? incoterm?.price * e.target.value +
//               e.target.value * incoterm?.freightRate
//             : 0;
//         }
//         return 1;
//       });
//     } else {
//       incotermRef.current[index] = {
//         ...incotermRef.current[index],
//         [e.target.name]: e.target.value,
//       };
//     }

//     if (terms === "FOB") {
//       if (e.target.name === "cbm") {
//         incotermRef.current[index] = {
//           ...incotermRef.current[index],
//           price: incotermSettings[index]?.cbmprice
//             ? e.target.value * incotermSettings[index]?.cbmprice
//             : 0,
//           totalPrice:
//             e.target.value * incotermSettings[index]?.cbmprice * quantity,
//           totalAmount: incotermSettings[index]?.price
//             ? e.target.value * incotermSettings[index]?.cbmprice * quantity
//             : 0,
//         };
//       } else if (e.target.name === "cbmprice") {
//         incotermRef.current[index] = {
//           ...incotermRef.current[index],
//           price: incotermSettings[index]?.cbm
//             ? e.target.value * incotermSettings[index]?.cbm
//             : 0,
//           totalPrice: e.target.value * incotermSettings[index]?.cbm * quantity,
//           totalAmount: incotermSettings[index]?.price
//             ? e.target.value * incotermSettings[index]?.cbm * quantity
//             : 0,
//         };
//       }
//     } else if (terms === "CFR") {
//       if (e.target.name === "cbm") {
//         incotermRef.current[index] = {
//           ...incotermRef.current[index],
//           price: incotermSettings[index]?.cbmprice
//             ? e.target.value * incotermSettings[index]?.cbmprice
//             : 0,
//           totalPrice:
//             e.target.value * incotermSettings[index]?.cbmprice * quantity,
//           totalAmount: incotermSettings[index]?.freight
//             ? +(e.target.value * incotermSettings[index]?.cbmprice * quantity) +
//               incotermSettings[index]?.freight
//             : 0,
//         };
//       } else if (e.target.name === "cbmprice") {
//         incotermRef.current[index] = {
//           ...incotermRef.current[index],
//           price: incotermSettings[index]?.cbm
//             ? e.target.value * incotermSettings[index]?.cbm
//             : 0,
//           totalPrice: e.target.value * incotermSettings[index]?.cbm * quantity,
//           totalAmount: incotermSettings[index]?.freight
//             ? e.target.value * incotermSettings[index]?.cbm * quantity +
//               incotermSettings[index]?.freight
//             : 0,
//         };
//       } else if (e.target.name === "freightRate") {
//         incotermRef.current[index] = {
//           ...incotermRef.current[index],
//           freight: e.target.value * quantity,
//           totalAmount: incotermSettings[index]?.price
//             ? e.target.value * quantity + incotermSettings[index].totalPrice
//             : 0,
//         };
//       }
//     } else if (terms === "CIF") {
//       if (e.target.name === "cbm") {
//         incotermRef.current[index] = {
//           ...incotermRef.current[index],
//           price: incotermSettings[index]?.cbmprice
//             ? e.target.value * incotermSettings[index]?.cbmprice
//             : 0,
//           totalPrice:
//             e.target.value * incotermSettings[index]?.cbmprice * quantity,
//           insurance:
//             e.target.value *
//             incotermSettings[index]?.cbmprice *
//             quantity *
//             0.0025,
//           totalAmount: incotermSettings[index]?.freight
//             ? e.target.value *
//                 incotermSettings[index]?.cbmprice *
//                 quantity *
//                 0.0025 +
//               e.target.value * incotermSettings[index]?.cbmprice * quantity +
//               incotermSettings[index]?.freight
//             : 0,
//         };
//       } else if (e.target.name === "cbmprice") {
//         incotermRef.current[index] = {
//           ...incotermRef.current[index],
//           price: incotermSettings[index]?.cbm
//             ? e.target.value * incotermSettings[index]?.cbm
//             : 0,
//           totalPrice: e.target.value * incotermSettings[index]?.cbm * quantity,
//           insurance:
//             e.target.value * incotermSettings[index]?.cbm * quantity * 0.0025,
//           totalAmount: incotermSettings[index]?.freight
//             ? e.target.value *
//                 incotermSettings[index]?.cbm *
//                 quantity *
//                 0.0025 +
//               e.target.value * incotermSettings[index]?.cbm * quantity +
//               incotermSettings[index]?.freight
//             : 0,
//         };
//       } else if (e.target.name === "freightRate") {
//         incotermRef.current[index] = {
//           ...incotermRef.current[index],
//           freight: e.target.value * quantity,
//           totalAmount: incotermSettings[index]?.price
//             ? e.target.value * quantity +
//               incotermSettings[index].insurance +
//               incotermSettings[index].totalPrice
//             : 0,
//         };
//       }
//     }

//     setIncotermSettings([...incotermRef.current]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     dispatch({ type: SEND_REQUEST });
//     const merchantService = new MerchantService();

//     try {
//       const payload = {
//         incotermArray: incotermSettings,
//         requestID: selectedRequestId,
//         quantity,
//       };
//       const { errors } = await merchantService.postOffer(payload);
//       if (errors.length === 0) {
//         dispatch({ type: REQUEST_SUCCESSFUL });
//         handleCloseDrawer();
//         handleSuccessfulRequest(
//           "You will be notified immediately the buyer accepts your quotation",
//           3000
//         );
//         handleCloseDialogConfirm();
//         setRefreshTable((prev) => !prev);
//       } else {
//         dispatch({ type: REQUEST_FAILED });
//         handleFailedRequest("Problem completing request", 5000);
//       }
//     } catch (error) {
//       dispatch({ type: REQUEST_FAILED });
//       handleFailedRequest("Problem completing request", 5000);
//     }
//   };

//   const handleSuccessfulRequest = (message, timeOut) => {
//     const payload = {
//       severity: "success",
//       message,
//       timeOut,
//     };
//     rootDispatch(setAlert(payload));
//   };

//   const handleFailedRequest = (message, timeOut) => {
//     const payload = {
//       severity: "error",
//       message,
//       timeOut,
//     };
//     rootDispatch(setAlert(payload));
//   };

//   useEffect(() => {
//     selectedRequest && setOpenDrawer(true);
//   }, [selectedRequest]);

//   const list = () =>
//     selectedRequest && (
//       <Box
//         component="form"
//         role="presentation"
//         onSubmit={handleClickOpenDialogConfirm}
//         autoComplete="off"
//       >
//         <div className="requests-sections-body">
//           <div className="requests-title-container">
//             <div>Request {selectedRequest.requestNo}</div>
//           </div>
//           <div className="requests-sections-container">
//             <section>
//               <div className="requests-section-title">Product Information</div>
//               <div className="request-section-body">
//                 <div>
//                   <span>Product:</span>
//                   <span>{selectedRequest.product}</span>
//                 </div>
//                 <div>
//                   <span>Species:</span>
//                   <span>{selectedRequest.species}</span>
//                 </div>
//                 <div>
//                   <span>Type Of Species:</span>
//                   <span>{selectedRequest.speciesType}</span>
//                 </div>
//                 <div>
//                   <span>Origin:</span>
//                   <span>{selectedRequest.origin}</span>
//                 </div>
//                 <div>
//                   <span>Container size:</span>
//                   <span>{selectedRequest.containerSize}</span>
//                 </div>
//               </div>
//             </section>

//             <section>
//               <div className="requests-section-title">Specifications</div>
//               <div className="request-section-body">
//                 <div>
//                   <span>Length:</span>
//                   <span className="toLower">
//                     {selectedRequest.length} {selectedRequest.lengthUnit}
//                   </span>
//                 </div>
//                 {selectedRequest.product === PRODUCTS.TEAK_SQUARE_LOGS && (
//                   <>
//                     <div>
//                       <span>Thickness:</span>
//                       <span className="toLower">
//                         {selectedRequest.thickness}{" "}
//                         {selectedRequest.thicknessUnit}
//                       </span>
//                     </div>
//                     <div>
//                       <span>Width:</span>
//                       <span className="toLower">
//                         {selectedRequest.width} {selectedRequest.widthUnit}
//                       </span>
//                     </div>
//                     <div>
//                       <span>Drying:</span>
//                       <span>{selectedRequest.drying}</span>
//                     </div>
//                   </>
//                 )}
//                 {selectedRequest.product === PRODUCTS.TEAK_ROUND_LOGS && (
//                   <>
//                     <div>
//                       <span>Diameter:</span>
//                       <span className="toLower">
//                         {selectedRequest.diameter}{" "}
//                         {selectedRequest.diameterUnit}
//                       </span>
//                     </div>
//                   </>
//                 )}
//                 <div>
//                   <span>Quantity:</span>
//                   <span>
//                     {selectedRequest?.quantity} {selectedRequest.containerSize}
//                   </span>
//                 </div>
//               </div>
//             </section>

//             <section>
//               <div className="requests-section-title">
//                 Pricing and Delivery Information
//               </div>
//               <div className="request-section-body">
//                 <div>
//                   <span>Incoterm:</span>
//                   <span>{selectedRequest.terms}</span>
//                 </div>
//                 <div>
//                   <span>Destination:</span>
//                   <span>{selectedRequest.destination}</span>
//                 </div>
//                 <div>
//                   <span>Destination Port:</span>
//                   <span>{selectedRequest.port}</span>
//                 </div>
//               </div>
//             </section>

//             <section>
//               <div className="requests-section-title">Request Settings</div>
//               <div className="request-section-body request-section-body-validity">
//                 <div>
//                   <span>Validity:</span>
//                   <span>{selectedRequest.validity} days</span>
//                 </div>
//               </div>
//             </section>

//             <hr
//               style={{ margin: "80px 0 40px 0", border: "1px solid #efefef" }}
//             />

//             <section>
//               <div
//                 style={{ fontWeight: 700 }}
//                 className="requests-section-title"
//               >
//                 PLEASE PROVIDE YOUR QUOTE FOR THIS REQUEST
//               </div>
//               <div style={{ border: 0, margin: "20px 0" }}>
//                 <TextField
//                   fullWidth
//                   size="small"
//                   onChange={(e) => handleChange(e)}
//                   helperText={
//                     <strong>
//                       Kindly indicate the quantity you can supply for this
//                       request
//                     </strong>
//                   }
//                   InputProps={{
//                     inputProps: { max: selectedRequest?.quantity, min: 1 },
//                   }}
//                   label="Quantity"
//                   name="quantity"
//                   type="number"
//                   variant="filled"
//                   placeholder={`Allowed maximum: ${selectedRequest?.quantity}`}
//                   required
//                 />
//               </div>
//               <div>
//                 <div className="incoterm-settings-table-container">
//                   <table>
//                     <thead>
//                       <tr className="incoterm-setting-heading-container">
//                         <th>Number</th>
//                         {selectedRequest.product ===
//                           PRODUCTS.TEAK_ROUND_LOGS && <th>Diameter (cm)</th>}
//                         <th>Pieces/container</th>
//                         <th>CBM</th>
//                         <th>Price per CBM</th>
//                         <th>Price/container</th>
//                         <th>Total price</th>
//                         {selectedRequest.terms === "CIF" && <th>Insurance</th>}
//                         {selectedRequest.terms !== "FOB" && (
//                           <th>Freight Rate</th>
//                         )}
//                         {selectedRequest.terms !== "FOB" && (
//                           <th>Total Freight</th>
//                         )}
//                         <th>Total amount</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {Array.from(Array(incotermRows)).map((_row, index) => (
//                         <tr key={index}>
//                           <td>
//                             <input
//                               placeholder="eg 40-50"
//                               required
//                               type="text"
//                               onChange={(e) => handleChange(e, index)}
//                               name="number"
//                               value={index + 1}
//                               disabled
//                             />
//                           </td>
//                           {selectedRequest.product ===
//                             PRODUCTS.TEAK_ROUND_LOGS && (
//                             <td>
//                               <input
//                                 placeholder="eg 40-50"
//                                 required
//                                 type="text"
//                                 onChange={(e) => handleChange(e, index)}
//                                 name="diameter"
//                               />
//                             </td>
//                           )}
//                           <td>
//                             <input
//                               placeholder="eg 40-50"
//                               required
//                               type="text"
//                               onChange={(e) => handleChange(e, index)}
//                               name="noOfPieces"
//                             />
//                           </td>
//                           <td>
//                             <input
//                               placeholder="0"
//                               required
//                               type="number"
//                               onChange={(e) => handleChange(e, index)}
//                               name="cbm"
//                             />
//                           </td>
//                           <td>
//                             <input
//                               placeholder="0"
//                               required
//                               type="number"
//                               onChange={(e) => handleChange(e, index)}
//                               name="cbmprice"
//                             />
//                           </td>
//                           <td>
//                             <input
//                               placeholder="0"
//                               disabled
//                               required
//                               type="number"
//                               name="price"
//                               value={
//                                 incotermSettings[index]?.price
//                                   ? incotermSettings[index]?.price
//                                   : 0
//                               }
//                             />
//                           </td>
//                           <td>
//                             <input
//                               placeholder="0"
//                               required
//                               type="number"
//                               disabled
//                               onChange={(e) => handleChange(e, index)}
//                               name="totalPrice"
//                               value={
//                                 incotermSettings[index]?.totalPrice
//                                   ? incotermSettings[index]?.totalPrice
//                                   : 0
//                               }
//                             />
//                           </td>
//                           {selectedRequest.terms === "CIF" && (
//                             <td>
//                               <input
//                                 placeholder="0"
//                                 required
//                                 type="number"
//                                 disabled
//                                 onChange={(e) => handleChange(e, index)}
//                                 name="insurance"
//                                 value={
//                                   incotermSettings[index]?.insurance
//                                     ? incotermSettings[index]?.insurance
//                                     : 0
//                                 }
//                               />
//                             </td>
//                           )}
//                           {selectedRequest.terms !== "FOB" && (
//                             <td>
//                               <input
//                                 placeholder="0"
//                                 required
//                                 type="number"
//                                 onChange={(e) => handleChange(e, index)}
//                                 name="freightRate"
//                               />
//                             </td>
//                           )}
//                           {selectedRequest.terms !== "FOB" && (
//                             <td>
//                               <input
//                                 placeholder="0"
//                                 required
//                                 type="number"
//                                 disabled
//                                 value={
//                                   incotermSettings[index]?.freight
//                                     ? incotermSettings[index]?.freight
//                                     : 0
//                                 }
//                                 onChange={(e) => handleChange(e, index)}
//                                 name="freight"
//                               />
//                             </td>
//                           )}
//                           <td>
//                             <input
//                               required
//                               type="number"
//                               disabled
//                               value={
//                                 incotermSettings[index]?.totalAmount
//                                   ? incotermSettings[index]?.totalAmount
//                                   : 0
//                               }
//                             />
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//                 <div className="incoterm-settings-table-note-container">
//                   Kindly note that all prices are quoted in ($)
//                 </div>
//               </div>
//             </section>

//             <section>
//               <div className="incoterm-settings-size-container">
//                 <div onClick={() => handleIncotermSize(TYPE.INCREASE)}>
//                   <span>
//                     <AddCircleOutlineRoundedIcon />
//                   </span>
//                   <span>add new field</span>
//                 </div>
//                 {incotermRows > 1 && (
//                   <div
//                     className={incotermRows > 1 ? "something-cool" : ""}
//                     onClick={() => handleIncotermSize(TYPE.DECREASE)}
//                   >
//                     <span>
//                       <RemoveCircleOutlineRoundedIcon />
//                     </span>
//                     <span>remove last field</span>
//                   </div>
//                 )}
//               </div>
//             </section>

//             <section>
//               <div className="incoterm-settings-note-container">
//                 <div>Additional Notes for {selectedRequest.terms} </div>
//                 {INCOTERM_NOTES[selectedRequest.terms]}
//               </div>
//             </section>

//             <section>
//               <div>
//                 <div className="button-controller">
//                   <SmallSecondary type="submit" variant="contained">
//                     Post Quote
//                   </SmallSecondary>
//                 </div>
//               </div>
//             </section>
//           </div>
//         </div>
//       </Box>
//     );

//   useEffect(() => {
//     const abortController = new AbortController();
//     const fetchData = async () => {
//       setRowsLoading(true);
//       const merchantService = new MerchantService();
//       try {
//         const { data, errors } = await merchantService.getRequests(
//           abortController.signal
//         );
//         if (errors.length === 0) {
//           const { totalCount } = data.data;
//           const newPaginationCount = Math.ceil(totalCount / 5);
//           setPagination(newPaginationCount);
//           const filteredData = data.data.data;
//           filteredData.map((request, index) => {
//             request.index = index + 1;
//             request.id = request._id;
//             request.product = request.quotationProducts[0].product.name;
//             request.terms = request.buyerQuotationIncoterm.label;
//             request.quantity =
//               request.quotationProducts[0].specification.quantity;
//             request.diameter =
//               request?.quotationProducts[0]?.specification?.diameter;
//             request.diameterUnit =
//               request?.quotationProducts[0]?.specification?.diameterUnit;
//             request.drying =
//               request?.quotationProducts[0]?.specification?.drying?.label;
//             request.length =
//               request?.quotationProducts[0]?.specification.length;
//             request.thickness =
//               request?.quotationProducts[0]?.specification.thickness;
//             request.width = request.quotationProducts[0].specification.width;
//             request.lengthUnit =
//               request?.quotationProducts[0]?.specification?.lengthUnit;
//             request.thicknessUnit =
//               request.quotationProducts[0].specification.thicknessUnit;
//             request.widthUnit =
//               request?.quotationProducts[0]?.specification?.widthUnit;
//             request.species =
//               request.quotationProducts[0].product.species.label;
//             request.speciesType =
//               request.quotationProducts[0].product.species.type.label;
//             request.origin =
//               request.quotationProducts[0].product.origin.country;
//             request.containerSize =
//               request.quotationProducts[0].product.supportedShippingContainers[0].label;
//             request.volume = request.quotationProducts[0].product.volume.value;
//             request.volumeUnit =
//               request.quotationProducts[0].product.volume.unit;
//             request.createdOn = new Date(request.createdOn)
//               .toUTCString()
//               .slice(0, 25);
//             return 1;
//           });

//           filteredData.sort((a, b) => b.requestNo - a.requestNo);
//           setRows(filteredData);
//         }
//       } catch (error) {}

//       setRowsLoading(false);
//     };

//     fetchData();
//     return () => abortController.abort();
//   }, [refreshTable]);

//   return (
//     <div className="Requests-Tables">
//       <div>
//         <Dialog
//           open={openDialogConfirm}
//           TransitionComponent={Transition}
//           keepMounted
//           onClose={handleCloseDialogConfirm}
//           aria-describedby="alert-dialog-slide-description"
//           sx={inAppDialog}
//           className="inAppDialog"
//         >
//           <DialogTitle>{"Post this offer to the Buyer?"}</DialogTitle>
//           <DialogActions>
//             <GenericSecondary
//               size="small"
//               variant="text"
//               onClick={handleCloseDialogConfirm}
//             >
//               No
//             </GenericSecondary>
//             <GenericPrimaryButton
//               size="small"
//               variant="contained"
//               loading={state.requestState.loading}
//               onClick={handleSubmit}
//             >
//               Yes
//             </GenericPrimaryButton>
//           </DialogActions>
//         </Dialog>
//       </div>

//       <div>
//         <Modal
//           open={openDrawer}
//           onClose={handleCloseDrawer}
//           aria-labelledby="modal-modal-title"
//           aria-describedby="modal-modal-description"
//           className="modal-container"
//         >
//           <Box sx={inAppWider}>
//             <div className="modal-title-container">
//               <div>Request Details</div>
//               <div>
//                 <CloseRoundedIcon onClick={handleCloseDrawer} />
//               </div>
//             </div>
//             <div className="modal-body">{list()}</div>
//           </Box>
//         </Modal>
//       </div>

//       <div>
//         <SwipeableDrawer
//           className="drawer-container"
//           variant="temporary"
//           anchor="bottom"
//           open={openDrawer}
//           onOpen={toggleDrawer(true)}
//           onClose={handleCloseDrawer}
//           disableBackdropTransition={!iOS}
//           disableDiscovery={iOS}
//         >
//           <div className="drawer-title-container">
//             <div>Request Details</div>
//             <Puller />
//           </div>

//           <div className="drawer-body">{list()}</div>
//         </SwipeableDrawer>
//       </div>
//       <div>
//         {rowsLoading ? (
//           <div className="dash-item-loading-container">
//             {" "}
//             <CircularProgress color="inherit" size={20} />
//           </div>
//         ) : rows && rows.length > 0 ? (
//           <div className="requests-section-container">
//             {rows.slice(5 * page - 5, page * 5 - 1).map((row, index) => (
//               <section onClick={() => selectRequest(row.id)} key={index}>
//                 <div>Request Number {row.requestNo}</div>
//                 <div>{row.destination}</div>
//                 <div>{row.createdOn}</div>
//                 <div>Product: {row.product}</div>
//               </section>
//             ))}
//             <div className="pagination-container">
// <Pagination
//   showFirstButton
//   showLastButton
//   onChange={handlePaginationChange}
//   siblingCount={2}
//   boundaryCount={0}
//   count={paginationCount}
// />
//             </div>
//           </div>
//         ) : (
//           <div className="dash-item-no-chart-data-container dash-item-no-chart-data-container-request">
//             <div className="dash-item-no-chart-data">
//               <NoRowsOverlay textColor={"inherit"} label={"Requests"} />
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Requests;
