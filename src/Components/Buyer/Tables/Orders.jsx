import { useEffect, useState } from "react";
import Countdown from "../../Countdown";
import { MuiTableV1, MuiTableV2 } from "../../v2/components/Table";
import BuyerService from "../../../Services/Buyer";
import { Box, CircularProgress, Stack } from "@mui/material";
import { MenuItem } from "@mui/material";
import { MuiMoreV1 } from "../../More";
import { SectionItem, StackItem } from "../../v2/components/Lists";
import { widerBox, xMediumBox } from "../../../Styles/v2/box";
import DrawerModal from "../../v2/components/DrawerModal";
import { SmallPrimary } from "../../../Material/Button";
import MuiStepper from "../../v2/components/Stepper";
import { ProgressBar } from "../../v2/components/ProgressBar";

const Orders = () => {
  const [rows, setRows] = useState([]);
  const [rowsLoading, setRowsLoading] = useState(false);

  const [rowsButtonState, setRowsButton] = useState({
    id: null,
    loading: false,
  });

  const [selectedOrders, setSelectedOrders] = useState(null);
  const [openOrdersView, setOpenOrdersView] = useState(false);
  const toggleOpenOrdersView = (open) => () => {
    setOpenOrdersView(open);
    !open && setSelectedOrders(null);
  };
  const handleOpenOrdersView = (id, ref) => () => {
    const fetchData = async () => {
      setRowsButton({
        id: id,
        loading: true,
      });
      const buyerService = new BuyerService();
      try {
        const { data, errors } = await buyerService.getOrderList(ref);
        if (errors.length === 0) {
          console.log(data.data.data);
          const filteredData = data.data.data.map((orders, index) => {
            const quotationProduct = orders?.request?.quotationProducts?.at(0);
            return {
              id: orders?._id,
              index: index + 1,
              productName: quotationProduct?.product?.name,
              companyName: orders?.merchant?.companyName,
              status: orders?.status,
              quantity: orders?.orderQuantity,
              destination: orders?.request?.destination,
              terms: orders?.request?.buyerQuotationIncoterm?.label,
              merchant: {
                name: `${orders?.merchant?.firstName} ${orders?.merchant?.lastName} `,
                email: orders?.merchant?.email,
                mobile: orders?.merchant?.mobileNo,
              },
            };
          });
          setSelectedOrders(filteredData);
          setOpenOrdersView(true);
        }
      } catch (error) {
        throw error;
      }
      setRowsButton({
        id: null,
        loading: false,
      });
    };
    fetchData();
  };

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [openOrderView, setOpenOrderView] = useState(false);
  const toggleOpenOrderView = (open) => () => {
    setOpenOrderView(open);
    !open && setSelectedOrder(null);
  };
  const handleOpenOrderView = (id) => () => {
    const order = selectedOrders.find((orders) => orders.id === id);
    setSelectedOrder(order);
    setOpenOrderView(true);
  };

  const columns = [
    { field: "index", headerName: "Number", width: 80 },
    { field: "orderNo", headerName: "Order #", width: 100 },
    { field: "productName", headerName: "Product", width: 150 },
    { field: "incoterm", headerName: "Terms", width: 100 },
    { field: "quantity", headerName: "Quantity", width: 100 },
    { field: "destination", headerName: "Destination", width: 150 },
    {
      field: "timeLeft",
      headerName: "Time Left",
      width: 100,
      renderCell: ({ row }) => (
        <div className="countdown-table-container">
          <Countdown endDate={row.expiryDate} />
        </div>
      ),
    },
    {
      field: "actions",
      headerName: "",
      width: 50,
      renderCell: ({ row }) => (
        <Stack direction="row" justifyContent="center" sx={{ width: "100%" }}>
          {rowsButtonState.id === row.id ? (
            rowsButtonState.loading && (
              <div className="simple-center-div primary-tae-color">
                <CircularProgress color="inherit" size={20} />
              </div>
            )
          ) : (
            <MuiMoreV1>
              <MenuItem onClick={handleOpenOrdersView(row.id, row.ref)}>
                View
              </MenuItem>
            </MuiMoreV1>
          )}
        </Stack>
      ),
    },
  ];

  const columnsOrders = [
    { field: "index", headerName: "Number", width: 80 },
    // { field: "productName", headerName: "Product", width: 150 },
    { field: "companyName", headerName: "Company", width: 100 },
    // { field: "quantity", headerName: "Quantity", width: 100 },
    { field: "status", headerName: "Status", width: 150 },
    {
      field: "action",
      headerName: "",
      width: 90,
      renderCell: ({ row }) => {
        return (
          <SmallPrimary
            onClick={handleOpenOrderView(row.id)}
            variant="contained"
          >
            View
          </SmallPrimary>
        );
      },
    },
  ];

  useEffect(() => {
    const abortController = new AbortController();
    const fetchData = async () => {
      setRowsLoading(true);
      const buyerService = new BuyerService();
      try {
        const { data, errors } = await buyerService.getOrders(
          abortController.signal
        );
        if (errors.length === 0) {
          const filteredData = data.data.data.map((order, index) => {
            const quotationProduct = order?.request?.quotationProducts.at(0);
            return {
              index: index + 1,
              id: order?._id,
              ref: order?.referenceCode,
              orderNo: order?.orderNo,
              productName: quotationProduct?.product?.name,
              destination: order?.request?.destination,
              expiryDate: order?.request?.expiryDate,
              quantity: quotationProduct?.specification?.quantity,
              incoterm: order?.request?.buyerQuotationIncoterm?.label,
            };
          });
          setRows(filteredData);
        }
      } catch (error) {
        throw error;
      }
      setRowsLoading(false);
    };
    fetchData();
  }, []);

  const OrdersView = () => {
    return (
      selectedOrders && (
        <Box>
          <MuiTableV2
            checkboxSelection={false}
            rows={selectedOrders}
            columns={columnsOrders}
          />
        </Box>
      )
    );
  };

  const OrderView = () => {
    return (
      selectedOrder && (
        <Box>
          <div>
            <SectionItem sectionTitle="Merchant Information">
              <StackItem title="Name" value={selectedOrder?.merchant?.name} />
              <StackItem title="Email" value={selectedOrder?.merchant?.email} />
              <StackItem
                title="Telephone"
                value={`+${selectedOrder?.merchant?.mobile}`}
              />
            </SectionItem>

            <SectionItem sectionTitle="Product Information">
              <StackItem title="Product" value={selectedOrder?.productName} />
              <StackItem title="Terms" value={selectedOrder?.terms} />
              <StackItem
                title="Quantity"
                value={`${selectedOrder?.quantity} 20ft Container`}
              />
            </SectionItem>

            <SectionItem sectionTitle="Track Order">
              <Stack direction="column" width="100%" spacing={2}>
                <ProgressBar status={selectedOrder?.status} />
                <MuiStepper activeStep={selectedOrder?.status} />
              </Stack>
            </SectionItem>
          </div>
        </Box>
      )
    );
  };

  return (
    <main>
      <DrawerModal
        boxStyle={xMediumBox}
        openState={openOrdersView}
        toggleOpenState={toggleOpenOrdersView}
        title="Orders Details"
      >
        <OrdersView />
      </DrawerModal>

      <DrawerModal
        boxStyle={widerBox}
        openState={openOrderView}
        toggleOpenState={toggleOpenOrderView}
        title="Order Details"
      >
        <OrderView />
      </DrawerModal>

      <MuiTableV1
        label="Orders"
        rows={rows}
        columns={columns}
        rowsLoading={rowsLoading}
      />
    </main>
  );
};

export default Orders;

// import { DataGrid } from "@mui/x-data-grid";
// import LinearProgress from "@mui/material/LinearProgress";
// import Toolbar from "../../../Material/Toolbar";
// import SwipeableDrawer from "@mui/material/SwipeableDrawer";
// import { useState, useEffect, useReducer } from "react";
// import Box from "@mui/material/Box";
// import { Puller } from "../../../Material/Drawer";
// import BuyerService from "../../../Services/Buyer";
// import { useDispatch } from "react-redux";
// import Tooltip from "@mui/material/Tooltip";
// import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
// import IconButton from "@mui/material/IconButton";
// import Stepper from "@mui/material/Stepper";
// import Step from "@mui/material/Step";
// import StepLabel from "@mui/material/StepLabel";
// import StepContent from "@mui/material/StepContent";
// import Countdown from "../../Countdown";
// import Radio from "@mui/material/Radio";
// import RadioGroup from "@mui/material/RadioGroup";
// import FormControl from "@mui/material/FormControl";
// import TextField from "@mui/material/TextField";
// import {
//   INPUTING,
//   SEND_REQUEST,
//   REQUEST_SUCCESSFUL,
//   REQUEST_FAILED,
// } from "../../../Reducers/Actions";
// import { INITIAL_STATE, formReducer } from "../../../Reducers/FormReducer";
// import { setAlert } from "../../../Redux/Features/Alert.js";
// import Modal from "@mui/material/Modal";
// import {
//   inAppStandard,
//   inAppWider,
//   inAppSmallest,
// } from "../../../Styles/Modal";
// import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
// import {
//   GenericSmall,
//   SmallPrimary,
//   SmallSecondary,
// } from "../../../Material/Button";
// import Stack from "@mui/material/Stack";
// import { NavLink } from "react-router-dom";
// import Overlay from "../../../Material/Overlay";

// const isMadeUpOfOnly = (strArray, particularString) => {
//   for (let i = 0; i < strArray.length; i++) {
//     if (strArray[i] !== particularString) {
//       return false;
//     }
//   }
//   return true;
// };

// const ORDER_STATUS_LEVELS = {
//   RECEIVED: 10,
//   CONFIRMED: 20,
//   "AWAITING PROOF OF PAYMENT": 30,
//   "PROOF OF PAYMENT APPROVED": 40,
//   PROCESSING: 60,
//   SHIPPED: 80,
//   DELIVERED: 100,
// };

// const ORDER_STATUS_STEPS = {
//   RECEIVED: 0,
//   CONFIRMED: 1,
//   "AWAITING PROOF OF PAYMENT": 2,
//   "PROOF OF PAYMENT APPROVED": 3,
//   PROCESSING: 4,
//   SHIPPED: 5,
//   DELIVERED: 6,
// };

// const steps = [
//   {
//     label: "Order placed",
//     description: "Thank you for placing your order",
//   },
//   {
//     label: "Order Confirmed",
//     description: "Confirm your order to alert Merchant",
//   },
//   {
//     label: "Order Approved",
//     description: "Your order is pending approval",
//   },
//   {
//     label: "Processing",
//     description: "Please wait while your order is being processed",
//   },
//   {
//     label: "Shipped",
//     description: "Your order is being shipped",
//   },
//   {
//     label: "Delivered",
//     description: "Your order is being delivered",
//   },
// ];

// const ProgressBar = ({ status }) => {
//   return (
//     <div className="progress-bar-container">
//       <div>
//         <span>{ORDER_STATUS_LEVELS[status]}% Complete</span>
//       </div>
//       <div>
//         <progress
//           className="order-status-progress"
//           max="100"
//           value={ORDER_STATUS_LEVELS[status]}
//         />
//       </div>
//     </div>
//   );
// };

// const navLinkStyle = {
//   fontWeight: 600,
//   color: "blue",
//   textDecoration: "underline",
//   cursor: "pointer",
//   fontSize: "small",
// };

// const Orders = () => {
//   const [acceptTerms, setAcceptTerms] = useState(false);
//   const toggleAcceptTerms = (open) => (_event) => {
//     setOpenDrawerPromptConfirm(false);
//     setAcceptTerms(open);
//   };
//   const [anchorEl, setAnchorEl] = useState(null);
//   const open = Boolean(anchorEl);
//   const [refreshTable, setRefreshTable] = useState(false);
//   const rootDispatch = useDispatch();
//   const [state, dispatch] = useReducer(formReducer, INITIAL_STATE);
//   const iOS =
//     typeof navigator !== "undefined" &&
//     /iPad|iPhone|iPod/.test(navigator.userAgent);

//   const [rowsOrderList, setRowsOrderList] = useState([]);

//   const [rows, setRows] = useState([]);
//   const [rowsLoading, setRowsLoading] = useState(false);
//   const [pageSize, setPageSize] = useState(10);
//   const [selectedOrderId, setSelectedOrderId] = useState(null);
//   const selectOrder = (id) => setSelectedOrderId(id);
//   const selectedOrder = rows && rows.find((row) => row.id === selectedOrderId);

//   const [selectedOrderDetail, setSelectedOrderDetail] = useState({});

//   const [openDrawer, setOpenDrawer] = useState(false);
//   const toggleDrawer = (open, row) => (_event) => {
//     if (open) {
//       setSelectedOrderDetail(row);
//     } else {
//       setSelectedOrderDetail([]);
//     }

//     setOpenDrawer(open);
//   };

//   const [openOrderListDrawer, setOpenOrderListDrawer] = useState(false);
//   const toggleOrderListDrawer = (open) => (_event) => {
//     if (open) {
//       if (selectedOrder?.orderList) {
//         setRowsOrderList(selectedOrder?.orderList);
//       } else {
//         setRowsOrderList([]);
//       }
//     } else {
//       setRowsOrderList([]);
//     }
//     setOpenOrderListDrawer(open);
//   };

//   const [openDrawerConfirm, setOpenDrawerConfirm] = useState(false);
//   const toggleDrawerConfirm = (open) => (_event) => {
//     setOpenDrawerConfirm(open);
//   };

//   const [openDrawerPromptConfirm, setOpenDrawerPromptConfirm] = useState(false);
//   const toggleDrawerPromptConfirm = (open) => (_event) => {
//     setOpenDrawerPromptConfirm(open);
//   };

//   const handleClick = (event, id) => {
//     setAnchorEl(event.currentTarget);
//     selectOrder(id);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const handleChange = (e) => {
//     dispatch({ type: INPUTING, prop: e.target.name, value: e.target.value });
//   };

//   const handleConfirm = async (e) => {
//     dispatch({ type: SEND_REQUEST });
//     e.preventDefault();
//     const buyerService = new BuyerService();
//     const referenceCode = selectedOrder?.referenceCode;

//     if (referenceCode) {
//       try {
//         const { errors } = await buyerService.confirmOrder(
//           referenceCode,
//           state.payload
//         );
//         if (errors.length === 0) {
//           dispatch({ type: REQUEST_SUCCESSFUL });
//           setRefreshTable((prev) => !prev);
//           handleSuccessfullRequest(
//             "Merchant will be notified to commence fulfillment of your order once proof of payment is confirmed",
//             3000
//           );
//           setOpenDrawerConfirm(false);
//           state.payload = {};
//         } else {
//           dispatch({ type: REQUEST_FAILED });
//           handleFailedRequest("Could not process your request", 5000);
//         }
//       } catch (error) {}
//     }
//   };

// const handleSuccessfullRequest = (message, timeOut) => {
//   const payload = {
//     severity: "success",
//     message,
//     timeOut,
//   };
//   rootDispatch(setAlert(payload));
// };

//   const handleFailedRequest = (message, timeOut) => {
//     const payload = {
//       severity: "error",
//       message,
//       timeOut,
//     };
//     rootDispatch(setAlert(payload));
//   };

//   const More = ({ id }) => (
//     <div>
//       <Box
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           textAlign: "center",
//           position: "relative",
//         }}
//       >
//         <Tooltip title="More">
//           <IconButton
//             onClick={(event) => handleClick(event, id)}
//             size="small"
//             aria-controls={open ? "account-menu" : undefined}
//             aria-haspopup="true"
//             aria-expanded={open ? "true" : undefined}
//           >
//             <MoreHorizIcon />
//           </IconButton>
//         </Tooltip>
//       </Box>
//     </div>
//   );

//   const columns = [
//     { field: "index", headerName: "Number", width: 80 },
//     { field: "orderNo", headerName: "Order #", width: 100 },
//     { field: "product", headerName: "Product", width: 150 },
//     { field: "terms", headerName: "Terms", width: 100 },
//     { field: "quantity", headerName: "Quantity", width: 100 },
//     {
//       field: "timeLeft",
//       headerName: "Time Left",
//       width: 150,
//       renderCell: ({ row }) => (
//         <div className="countdown-table-container">
//           {" "}
//           <Countdown endDate={row.expiryDate} />{" "}
//         </div>
//       ),
//     },
//     {
//       field: "action",
//       headerName: "",
//       width: 30,
//       renderCell: ({ row }) => (
//         <div className="simple-center-div">
//           <More id={row.id} />
//         </div>
//       ),
//     },
//   ];

//   const columnsOrderList = [
//     { field: "index", headerName: "Number", width: 80 },
//     { field: "orderNo", headerName: "Order #", width: 100 },
//     { field: "company", headerName: "Company", width: 150 },
//     { field: "quantity", headerName: "Quantity", width: 100 },
//     { field: "destination", headerName: "Destination", width: 150 },
//     { field: "status", headerName: "Status", width: 140 },
//     {
//       field: "action",
//       headerName: "",
//       width: 80,
//       renderCell: ({ row }) => (
//         <SmallPrimary
//           onClick={toggleDrawer(true, row)}
//           size="small"
//           variant="contained"
//         >
//           View
//         </SmallPrimary>
//       ),
//     },
//   ];

//   const listOpenOrderList = () => {
//     return (
//       <div>
//         <Box role="presentation">
//           {
//             <div>
//               <div className="offers-data-grid-container">
//                 {
//                   <DataGrid
//                     components={{
//                       LoadingOverlay: LinearProgress,
//                       NoRowsOverlay: () => <Overlay label="Offers" />,
//                     }}
//                     className="offers-standard-table"
//                     rows={rowsOrderList}
//                     columns={columnsOrderList}
//                     checkboxSelection
//                     disableSelectionOnClick
//                     density="compact"
//                     pageSize={5}
//                     rowsPerPageOptions={[5]}
//                   />
//                 }
//               </div>
//             </div>
//           }
//         </Box>
//       </div>
//     );
//   };

//   const list = (stepperOrientation) =>
//     selectedOrder && (
//       <Box role="presentation">
//         <div className="requests-sections-body">
//           <div className="requests-title-container">
//             <div>Order {selectedOrder.orderNo}</div>
//           </div>
//           <div className="requests-sections-container">
//             <section>
//               <div className="requests-section-title">Product Information</div>
//               <div className="request-section-body">
//                 <div>
//                   <span>Product:</span>
//                   <span>{selectedOrder?.product}</span>
//                 </div>
//                 <div>
//                   <span>Merchant:</span>
//                   <span>
//                     {selectedOrderDetail?.more?.merchant?.firstName}{" "}
//                     {selectedOrderDetail?.more?.merchant?.lastName}
//                   </span>
//                 </div>
//                 <div>
//                   <span>Company:</span>
//                   <span>
//                     {selectedOrderDetail?.more?.merchant?.companyName}
//                   </span>
//                 </div>
//                 <div>
//                   <span>Terms:</span>
//                   <span>{selectedOrder?.terms}</span>
//                 </div>
//                 <div>
//                   <span>Quantity:</span>
//                   <span>
//                     {selectedOrderDetail?.more?.orderQuantity}{" "}
//                     {selectedOrder?.containerSize}
//                   </span>
//                 </div>
//                 <div>
//                   <span>Requested Date:</span>
//                   <span>{selectedOrder?.createdOn}</span>
//                 </div>
//               </div>
//             </section>

//             <section>
//               <div className="requests-section-title">Track Order</div>
//               <div className="order-section-body">
//                 <div>
//                   {" "}
//                   <ProgressBar
//                     status={selectedOrderDetail?.more?.status}
//                   />{" "}
//                 </div>
//               </div>
//               <div className="order-section-stepper-container">
//                 <Box>
//                   <Stepper
//                     activeStep={
//                       ORDER_STATUS_STEPS[selectedOrderDetail?.more?.status]
//                     }
//                     orientation={stepperOrientation}
//                   >
//                     {steps.map((step) => (
//                       <Step key={step.label}>
//                         <StepLabel>{step.label}</StepLabel>
//                         {stepperOrientation === "vertical" && (
//                           <StepContent>
//                             <div>{step.description}</div>
//                             <Box sx={{ mb: 0 }}>
//                               <div></div>
//                             </Box>
//                           </StepContent>
//                         )}
//                       </Step>
//                     ))}
//                   </Stepper>
//                 </Box>
//               </div>
//             </section>
//           </div>
//         </div>
//       </Box>
//     );

//   const listConfirm = () =>
//     selectedOrder && (
//       <Box role="presentation" component="form" onSubmit={handleConfirm}>
//         <div className="requests-sections-body">
//           <div className="orders-confirmation-sections-container">
//             <section>
//               <div>A. Kindly choose one of the payment options below</div>
//               <div>
//                 <FormControl>
//                   <RadioGroup
//                     aria-labelledby="demo-radio-buttons-group-label"
//                     name="orderPayment"
//                     onChange={handleChange}
//                     required
//                   >
//                     <div className="radio-group-controller">
//                       <Radio
//                         required
//                         size="small"
//                         value="Cash against documents (10%) Escrow deposit required"
//                       />
//                       <NavLink
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         style={navLinkStyle}
//                         to="/about/#payment-options-cash-against-document"
//                       >
//                         Cash against documents (10%) Escrow deposit required
//                       </NavLink>
//                     </div>

//                     <div className="radio-group-controller">
//                       <Radio required size="small" value="Letter of credit" />
//                       <NavLink
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         style={navLinkStyle}
//                         to="/about/#payment-options-letter-of-credit"
//                       >
//                         Letter of credit
//                       </NavLink>
//                     </div>

//                     <div className="radio-group-controller">
//                       <Radio required size="small" value="Bank transfer" />
//                       <NavLink
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         style={navLinkStyle}
//                         to="/about/#payment-options-cash-bank-transfer"
//                       >
//                         Bank transfer
//                       </NavLink>
//                     </div>
//                   </RadioGroup>
//                 </FormControl>
//               </div>
//             </section>
//             <section>
//               <div>B. Please provide your shipping address below</div>
//               <div>
//                 <TextField
//                   required
//                   sx={{ background: "white" }}
//                   multiline
//                   rows={3}
//                   fullWidth
//                   onChange={handleChange}
//                   type="text"
//                   name="shippingAddress"
//                   variant="outlined"
//                 />
//               </div>
//             </section>
//             <section className="sales-and-purchase-agreement-container">
//               <div>C. Sales and purchase agreement</div>
//               <div>
//                 <div
//                   style={navLinkStyle}
//                   onClick={toggleDrawerPromptConfirm(true)}
//                 >
//                   Click to open sales and purchase agreement
//                 </div>
//                 <div>
//                   <SmallSecondary
//                     loading={state.requestState.loading}
//                     disabled={!acceptTerms}
//                     type="submit"
//                     variant="contained"
//                   >
//                     Confirm Order
//                   </SmallSecondary>
//                 </div>
//               </div>
//             </section>
//           </div>
//         </div>
//       </Box>
//     );

//   const listPromptConfirm = () => (
//     <Box role="presentation" component="form">
//       <div className="requests-sections-body">
//         <div
//           style={{
//             fontSize: "small",
//             height: "200px",
//             marginBottom: 25,
//             fontWeight: 500,
//             overflowY: "auto",
//           }}
//           className="terms-and-conditions-container-order-confirmation"
//         >
//           <div>
//             This document is a binding legal agreement between the two parties,
//             Buyer and Merchant, who are users (<b>Members</b>) on the websites
//             and applications of Afrigateway Limited (collectively,{" "}
//             <b>the Afrigateway Platform</b>). The Afrigateway Platform
//             facilitates transactions between Members. Members who post requests
//             for quotations are “<b>Buyers</b>” and Members who provide
//             quotations to these requests are “<b>Merchants</b>”. The Buyers and
//             Merchants also purchase and supply physical products requested and
//             quoted for, respectively.
//             <div className="margin-bottom-20"></div>
//             This legal agreement emanates from a transactional arrangement
//             between both parties on the Afrigateway Platform, guided by the{" "}
//             <a href="#tos">Terms of Service</a>.
//             <div className="margin-bottom-20"></div>
//             Afrigateway’s role in this agreement is to act as the Merchant’s
//             Payment Collection agent solely for the purpose of accepting and
//             processing funds from Buyer on the Merchant’s behalf. This role is
//             adequately spelt out in the <a href="#payment-tos">Payment Terms</a>
//             .
//           </div>

//           <div className="margin-bottom-30"></div>

//           <div className="sandpa-sub-section-containers">
//             <div
//               style={{ fontWeight: 800 }}
//               className="large-large-large-heading"
//             >
//               Bank Details
//             </div>
//             <div>
//               <div>
//                 <span>Company Name</span>:{" "}
//                 <em style={{ fontWeight: 500 }}>AFRIGATEWAY LIMITED</em>
//               </div>
//               <div>
//                 <span>Branch Name</span>:{" "}
//                 <em style={{ fontWeight: 500 }}>FIDELITY BANK GHANA</em>
//               </div>
//               <div>
//                 <span>Bank Account Number</span>:{" "}
//                 <em style={{ fontWeight: 500 }}>1951191585112</em>
//               </div>
//               <div>
//                 <span>Bank Branch</span>:{" "}
//                 <em style={{ fontWeight: 500 }}>HAATSO</em>
//               </div>
//               <div>
//                 <span>Swift Code</span>:{" "}
//                 <em style={{ fontWeight: 500 }}>FBLIGHAC</em>
//               </div>
//             </div>
//           </div>

//           <div className="sandpa-sub-section-containers">
//             <div
//               style={{ fontWeight: 800 }}
//               className="large-large-large-heading"
//             >
//               Date
//             </div>
//             <div>
//               This agreement entered into force on the date that the Buyer and
//               Merchant confirmed and accepted the order respectively.
//             </div>
//           </div>

//           <div className="sandpa-sub-section-containers">
//             <div
//               style={{ fontWeight: 800 }}
//               className="large-large-large-heading"
//             >
//               Address
//             </div>
//             <div>
//               The addresses of both parties are those linked to their respective
//               Afrigateway accounts.
//             </div>
//           </div>

//           <div className="sandpa-sub-section-containers">
//             <div
//               style={{ fontWeight: 800 }}
//               className="large-large-large-heading"
//             >
//               Description of the Product
//             </div>
//             <div>
//               The specifications of the product being purchased and supplied are
//               those captured in the order agreed upon by both parties on the
//               Afrigateway Platform.
//               <div className="margin-bottom-10"></div>
//               The quantity of the product is also captured in the order agreed
//               upon by both parties on the Afrigateway Platform.
//             </div>
//           </div>

//           <div className="sandpa-sub-section-containers">
//             <div
//               style={{ fontWeight: 800 }}
//               className="large-large-large-heading"
//             >
//               Contract Price and Delivery Terms (Incoterm)
//             </div>
//             <div>
//               The Total amount (including Freight and Insurance) to be paid is
//               captured in the order agreed upon by both parties on the
//               Afrigateway Platform.
//               <div className="margin-bottom-10"></div>
//               The delivery term to be applied is captured in the order agreed
//               upon by both parties on the Afrigateway Platform.
//             </div>
//           </div>

//           <div className="sandpa-sub-section-containers">
//             <div
//               style={{ fontWeight: 800 }}
//               className="large-large-large-heading"
//             >
//               Payment Options and Conditions
//             </div>
//             <div>
//               One of the Payment Options coupled with their respective
//               conditions, below will be used in this agreement:
//             </div>
//             <div>
//               <ol className="order-lists-legal">
//                 <li>
//                   Documentary Collection and Escrow: Proof of Payment will
//                   require deposit of ten percent (10%) of the Total amount in an
//                   agreed Escrow account. The Merchant will only be notified to
//                   commence fulfilment of the order once agreed upon deposit has
//                   been made by the Buyer.
//                 </li>
//                 <li>
//                   Irrevocable Letters of Credit with Payment at Sight: The
//                   presentation of the Letter of Credit to Afrigateway’s bank
//                   will constitute Proof of Payment. The Merchant will then be
//                   notified to commence fulfilment of the order.{" "}
//                 </li>
//                 <li>
//                   Bank Transfer: The Buyer is required to pay an initial deposit
//                   of thirty percent (30%) of the Total amount (including Freight
//                   and Insurance) into the bank account of Afrigateway. The
//                   initial deposit will constitute Proof of Payment; the Merchant
//                   will be notified to commence fulfilment of the order.
//                 </li>
//               </ol>
//             </div>
//           </div>

//           <div className="sandpa-sub-section-containers">
//             <div
//               style={{ fontWeight: 800 }}
//               className="large-large-large-heading"
//             >
//               Insurance
//             </div>
//             <div>
//               The product being purchased and supplied has been insured under
//               Product Liability / Guarantee policy. In the event the product
//               supplied do not meet the agreed terms or standards, the Buyer is
//               assured of 100% returns of their funds, once the claims have been
//               verified and approved by the Insurance company.
//             </div>
//           </div>

//           <div className="sandpa-sub-section-containers">
//             <div
//               style={{ fontWeight: 800 }}
//               className="large-large-large-heading"
//             >
//               Documents
//             </div>
//             <div>
//               Some or all of the following documents will provided by the
//               Merchant to the Buyer
//             </div>
//             <div>
//               <ul className="order-lists-legal">
//                 <li>Original Bill of Landing</li>
//                 <li>Commercial invoice</li>
//                 <li>Packing List</li>
//                 <li>Certificate of Origin </li>
//                 <li>Certificate of Phytosanitary </li>
//               </ul>
//             </div>
//           </div>

//           <div className="sandpa-sub-section-containers">
//             <div
//               style={{ fontWeight: 800 }}
//               className="large-large-large-heading"
//             >
//               Acceptance
//             </div>
//             <div>
//               Both parties accept all of the terms and conditions contained
//               herein, which become effective, and binding herein after. This
//               agreement duly entered into force by both parties shall have
//               validity, significance and implication.
//             </div>
//           </div>
//         </div>
//         <div>
//           <Stack spacing={1}>
//             <SmallPrimary variant="text" onClick={toggleAcceptTerms(true)}>
//               Accept
//             </SmallPrimary>
//             <GenericSmall
//               size="small"
//               variant="text"
//               color="error"
//               onClick={toggleAcceptTerms(false)}
//             >
//               Cancel
//             </GenericSmall>
//           </Stack>
//         </div>
//       </div>
//     </Box>
//   );

//   useEffect(() => {
//     const abortController = new AbortController();
//     const fetchData = async () => {
//       setRowsLoading(true);
//       const buyerService = new BuyerService();
//       try {
//         const { data, errors } = await buyerService.getOrders(
//           abortController.signal
//         );
//         if (errors.length === 0) {
//           const filteredData = data.data.data;
//           Promise.all(
//             filteredData.map(async (order, index) => {
//               order.id = order._id;
//               order.index = index + 1;
//               order.quantity =
//                 order.request.quotationProducts[0].specification.quantity;
//               order.terms = order.request.buyerQuotationIncoterm.label;
//               order.containerSize =
//                 order.request.quotationProducts[0].product.supportedShippingContainers[0].label;
//               order.product = order.request.quotationProducts[0].product.name;
//               order.createdOn = new Date(order.createdOn)
//                 .toUTCString()
//                 .slice(0, 16);
//               order.expiryDate = new Date(order?.request?.expiryDate)
//                 .toUTCString()
//                 .slice(0, 25);
//               order.merchant = await (
//                 await buyerService.getOrder(order._id)
//               ).data.data.data[0]?.merchant;
//               order.orderList =
//                 order.referenceCode &&
//                 (await (
//                   await buyerService.getOrderList(order.referenceCode)
//                 ).data.data.data.map((data, index) => {
//                   return {
//                     index: index + 1,
//                     id: data?._id,
//                     status: data?.status,
//                     quantity: data?.orderQuantity,
//                     company: data?.merchant?.companyName,
//                     destination: data?.request?.destination,
//                     paymentDetails: data?.orderPaymentDetails,
//                     orderNo: data?.orderNo,
//                     more: data,
//                   };
//                 }));
//               return 1;
//             })
//           );

//           filteredData.sort(
//             (a, b) => new Date(b.expiryDate) - new Date(a.expiryDate)
//           );
//           setRows(filteredData);
//         }
//       } catch (error) {}
//       setRowsLoading(false);
//     };
//     fetchData();
//     return () => abortController.abort();
//   }, [refreshTable]);

//   return (
//     <div className="Orders-Table">
//       <div>
//         <Modal
//           open={openDrawerPromptConfirm}
//           onClose={toggleDrawerPromptConfirm(false)}
//           aria-labelledby="modal-modal-title"
//           aria-describedby="modal-modal-description"
//           className="modal-container"
//         >
//           <Box sx={inAppSmallest}>
//             <div className="modal-title-container">
//               <div style={{ fontSize: "smaller" }}>
//                 Please read and accept the terms and conditions
//               </div>
//               <div>
//                 <CloseRoundedIcon onClick={toggleDrawerPromptConfirm(false)} />
//               </div>
//             </div>

//             <div className="modal-body">{listPromptConfirm()}</div>
//           </Box>
//         </Modal>
//       </div>

//       <div>
//         <Modal
//           open={openDrawer}
//           onClose={toggleDrawer(false)}
//           aria-labelledby="modal-modal-title"
//           aria-describedby="modal-modal-description"
//           className="modal-container"
//         >
//           <Box sx={inAppWider}>
//             <div className="modal-title-container">
//               <div>Order Details</div>
//               <div>
//                 <CloseRoundedIcon onClick={toggleDrawer(false)} />
//               </div>
//             </div>

//             <div className="modal-body">{list("horizontal")}</div>
//           </Box>
//         </Modal>
//       </div>

//       <div>
//         <Modal
//           open={openOrderListDrawer}
//           onClose={toggleOrderListDrawer(false)}
//           aria-labelledby="modal-modal-title"
//           aria-describedby="modal-modal-description"
//           className="modal-container"
//         >
//           <Box sx={inAppWider}>
//             <div className="modal-title-container">
//               <div>Order List</div>
//               <div>
//                 <CloseRoundedIcon onClick={toggleOrderListDrawer(false)} />
//               </div>
//             </div>

//             <div className="modal-body">{listOpenOrderList()}</div>
//           </Box>
//         </Modal>
//       </div>

//       <div>
//         <Modal
//           open={openDrawerConfirm}
//           onClose={toggleDrawerConfirm(false)}
//           aria-labelledby="modal-modal-title"
//           aria-describedby="modal-modal-description"
//           className="modal-container"
//         >
//           <Box sx={inAppStandard}>
//             <div className="modal-title-container">
//               <div>Confirm Order</div>
//               <div>
//                 <CloseRoundedIcon onClick={toggleDrawerConfirm(false)} />
//               </div>
//             </div>

//             <div className="modal-body">{listConfirm()}</div>
//           </Box>
//         </Modal>
//       </div>

//       <div>
//         <Menu
//           anchorEl={anchorEl}
//           id="account-menu"
//           open={open}
//           onClose={handleClose}
//           onClick={handleClose}
//           transformOrigin={{ horizontal: "right", vertical: "top" }}
//           anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
//         >
//           <MenuItem onClick={toggleOrderListDrawer(true)}>View</MenuItem>

//           {selectedOrder?.orderList &&
//             isMadeUpOfOnly(
//               selectedOrder.orderList?.map((order) => order.status),
//               "CONFIRMED"
//             ) && (
//               <MenuItem onClick={toggleDrawerConfirm(true)}>Confirm</MenuItem>
//             )}
//         </Menu>
//       </div>

//       <div>
//         <SwipeableDrawer
//           className="drawer-container"
//           variant="temporary"
//           anchor="bottom"
//           open={openDrawerPromptConfirm}
//           onOpen={toggleDrawerPromptConfirm(true)}
//           onClose={toggleDrawerPromptConfirm(false)}
//           disableBackdropTransition={!iOS}
//           disableDiscovery={iOS}
//         >
//           <div className="drawer-title-container">
//             <div>Please read and accept the terms and conditions</div>
//             <Puller />
//           </div>

//           <div className="drawer-body">{listPromptConfirm()}</div>
//         </SwipeableDrawer>
//       </div>

//       <div>
//         <SwipeableDrawer
//           className="drawer-container"
//           variant="temporary"
//           anchor="bottom"
//           open={openDrawer}
//           onOpen={toggleDrawer(true)}
//           onClose={toggleDrawer(false)}
//           disableBackdropTransition={!iOS}
//           disableDiscovery={iOS}
//         >
//           <div className="drawer-title-container">
//             <div>Order Details</div>
//             <Puller />
//           </div>

//           <div className="drawer-body">{list("vertical")}</div>
//         </SwipeableDrawer>
//       </div>

//       <div>
//         <SwipeableDrawer
//           className="drawer-container"
//           variant="temporary"
//           anchor="bottom"
//           open={openOrderListDrawer}
//           onOpen={toggleOrderListDrawer(true)}
//           onClose={toggleOrderListDrawer(false)}
//           disableBackdropTransition={!iOS}
//           disableDiscovery={iOS}
//         >
//           <div className="drawer-title-container">
//             <div>Order List</div>
//             <Puller />
//           </div>

//           <div className="drawer-body">{listOpenOrderList("vertical")}</div>
//         </SwipeableDrawer>
//       </div>

//       <div>
//         <SwipeableDrawer
//           className="drawer-container"
//           variant="temporary"
//           anchor="bottom"
//           open={openDrawerConfirm}
//           onOpen={toggleDrawerConfirm(true)}
//           onClose={toggleDrawerConfirm(false)}
//           disableBackdropTransition={!iOS}
//           disableDiscovery={iOS}
//         >
//           <div className="drawer-title-container">
//             <div>Confirm Order</div>
//             <Puller />
//           </div>

//           <div className="drawer-body">{listConfirm()}</div>
//         </SwipeableDrawer>
//       </div>

//       <DataGrid
//         components={{
//           Toolbar: Toolbar,
//           LoadingOverlay: LinearProgress,
//           NoRowsOverlay: () => <Overlay label="Orders" />,
//         }}
//         className="standard-table"
//         checkboxSelection
//         disableSelectionOnClick
//         pageSize={pageSize}
//         rows={rows}
//         columns={columns}
//         pagination
//         density="compact"
//         rowsPerPageOptions={[10, 20, 30, 40, 50]}
//         onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
//         loading={rowsLoading}
//       />
//     </div>
//   );
// };

// export default Orders;
