import { useEffect, useState } from "react";
import MuiTable from "../../v2/components/Table";
import { SectionItem, StackItem } from "../../v2/components/Lists";
import AdminService from "../../../Services/Admin";
import BuyerService from "../../../Services/Buyer";
import { MuiMoreV1 } from "../../More";
import DrawerModal from "../../v2/components/DrawerModal";
import { widerBox } from "../../../Styles/v2/box";
import { Box, Stack } from "@mui/material";
import { ProgressBar } from "../../v2/components/ProgressBar";
import MuiStepper from "../../v2/components/Stepper";
import { ORDER_STATUS } from "../../v2/components/OrderStatus";
import MuiDialog from "../../v2/components/Dialog";
import { Button1 } from "../../v2/components/Buttons";
import { MenuItem } from "@mui/material";

const Orders = () => {
  const [paging, setPaging] = useState({
    page: 1,
    size: 10,
    totalCount: 0,
  });
  const handlePageChange = (page) => {
    setPaging({ ...paging, page: page + 1 });
  };
  const handlePageSizeChange = (size) => {
    setPaging({ ...paging, size: size });
  };

  const [rows, setRows] = useState([]);
  const [rowsLoading, setRowsLoading] = useState(false);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedOffers, setSelectedOffers] = useState(null);
  const [openOrderView, setOpenOrderView] = useState(false);
  const toggleOpenOrderView = (open) => () => {
    setOpenOrderView(open);
  };
  const handleOpenOrder = (id) => () => {
    const order = rows.find((row) => row.id === id);
    setSelectedOrder(order);
    const fetchData = async () => {
      const buyerService = new BuyerService();
      try {
        const { data, errors } = await buyerService.getOrderList(order.ref);
        if (errors.length === 0) {
          setOpenOrderView(true);
          const filteredData = data.data.data.map((offer) => {
            return {
              merchant: {
                name:
                  offer?.merchant?.firstName + " " + offer?.merchant?.lastName,
                email: offer?.merchant?.email,
                mobile: offer?.merchant?.mobileNo,
              },
            };
          });
          setSelectedOffers(filteredData);
        }
      } catch (error) {
        throw error;
      }
    };
    fetchData();
  };

  const [openApproveDialog, setOpenApproveDialog] = useState(false);
  const toggleOpenApproveDialog = (open) => () => {
    setOpenApproveDialog(open);
  };

  const columns = [
    { field: "index", headerName: "Number", width: 80 },
    { field: "orderNo", headerName: "Order #", width: 100 },
    { field: "productName", headerName: "Product", width: 150 },
    { field: "terms", headerName: "Terms", width: 100 },
    { field: "destination", headerName: "Destination", width: 100 },
    { field: "quantity", headerName: "Quantity", width: 100 },
    { field: "status", headerName: "Status", width: 150 },
    {
      field: "actions",
      headerName: "",
      width: 50,
      renderCell: ({ row }) => (
        <Stack direction="row" justifyContent="center" sx={{ width: "100%" }}>
          <MuiMoreV1>
            <MenuItem onClick={handleOpenOrder(row.id)}>View</MenuItem>
            {row.status === ORDER_STATUS["AWAITING PROOF OF PAYMENT"] && (
              <MenuItem onClick={toggleOpenApproveDialog(true)}>
                Approve
              </MenuItem>
            )}
          </MuiMoreV1>
        </Stack>
      ),
    },
  ];

  useEffect(() => {
    const abortController = new AbortController();
    const fetchData = async () => {
      setRowsLoading(true);
      const adminService = new AdminService();
      try {
        const { data, errors } = await adminService.getOrders(
          abortController.signal,
          paging
        );
        if (errors.length === 0) {
          const filteredData = data.data.data.map((order, index) => {
            const doc = order.doc.at(0);
            const quotationProduct = doc.request?.quotationProducts.at(0);
            return {
              index: index + 1,
              id: doc?._id,
              ref: order?._id,
              orderNo: doc?.orderNo,
              status: doc?.status,
              origin: quotationProduct?.product?.origin?.country,
              destination: doc?.request?.destination,
              terms: doc?.request?.buyerQuotationIncoterm?.label,
              createdOn: new Date(doc.createdOn),
              expiryDate: new Date(doc?.request?.expiryDate),
              productName: quotationProduct?.product?.name,
              quantity: doc?.orderQuantity,
              shipping: {
                address: doc?.orderPaymentDetails?.shippingAddress,
                port: doc?.request?.port,
                paymentMode: doc?.orderPaymentDetails?.orderPayment,
              },
              product: {
                species: quotationProduct?.product?.species?.label,
                speciesType: quotationProduct?.product?.species?.type?.label,
                specification: {
                  containerSize:
                    quotationProduct?.product?.supportedShippingContainers[0]
                      ?.label,
                  volume: quotationProduct?.product?.volume?.value,
                  volumeUnit: quotationProduct?.product?.volume?.unit,
                },
              },
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
  }, [paging]);

  const OrderView = () => {
    return (
      selectedOrder && (
        <Box>
          <div>
            <SectionItem sectionTitle="Order Summary">
              <StackItem title="Product" value={selectedOrder?.productName} />
              <StackItem
                title="Species"
                value={selectedOrder?.product?.species}
              />
              <StackItem
                title="Species Type"
                value={selectedOrder?.product?.speciesType}
              />
              <StackItem title="Origin" value={selectedOrder?.origin} />
              <StackItem
                title="Container size"
                value={selectedOrder?.product?.specification?.containerSize}
              />
              <StackItem
                title="Volume"
                value={
                  selectedOrder?.product?.specification?.volume +
                  " " +
                  selectedOrder?.product?.specification?.volumeUnit
                }
              />
              <StackItem
                title="Quantity"
                value={selectedOrder?.quantity + " 20ft Container"}
              />
            </SectionItem>

            <SectionItem sectionTitle="Pricing and Delivery Information">
              <StackItem
                title="Shipping Address"
                value={selectedOrder?.shipping?.address}
              />
              <StackItem title="Terms" value={selectedOrder?.terms} />
              <StackItem
                title="Destination"
                value={selectedOrder?.destination}
              />
              <StackItem title="Port" value={selectedOrder?.shipping?.port} />
            </SectionItem>

            <SectionItem sectionTitle="Payment Details">
              <StackItem
                title="Payment Mode"
                value={selectedOrder?.shipping?.paymentMode}
              />
            </SectionItem>

            {selectedOffers &&
              selectedOffers.length > 0 &&
              selectedOffers.map((offer, index) => (
                <SectionItem
                  key={index}
                  sectionTitle={`Merchant Details [${index + 1}]`}
                >
                  <StackItem title={"Name"} value={offer?.merchant?.name} />
                  <StackItem
                    title={"Telephone"}
                    value={"+ " + offer?.merchant?.mobile}
                  />
                  <StackItem title={"Email"} value={offer?.merchant?.email} />
                </SectionItem>
              ))}

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
      <MuiDialog
        openDialog={openApproveDialog}
        toggleOpenDialog={toggleOpenApproveDialog}
        dialogTitle="Do you want to approve the order?"
      >
        <Button1
          onClick={toggleOpenApproveDialog(false)}
          variant="text"
          color="inherit"
        >
          No
        </Button1>
        <Button1 variant="text" color="inherit">
          Yes
        </Button1>
      </MuiDialog>

      <DrawerModal
        boxStyle={widerBox}
        openState={openOrderView}
        toggleOpenState={toggleOpenOrderView}
        title="Order Details"
      >
        <OrderView />
      </DrawerModal>

      <MuiTable
        rows={rows}
        rowsLoading={rowsLoading}
        columns={columns}
        label="Orders"
        paging={paging}
        handlePageChange={handlePageChange}
        handlePageSizeChange={handlePageSizeChange}
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
// import { INITIAL_STATE, formReducer } from "../../../Reducers/FormReducer";
// import Box from "@mui/material/Box";
// import { Puller } from "../../../Material/Drawer";
// import AdminService from "../../../Services/Admin";
// import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
// import IconButton from "@mui/material/IconButton";
// import Tooltip from "@mui/material/Tooltip";
// import Stepper from "@mui/material/Stepper";
// import Step from "@mui/material/Step";
// import StepLabel from "@mui/material/StepLabel";
// import StepContent from "@mui/material/StepContent";
// import { setAlert } from "../../../Redux/Features/Alert.js";
// import { useDispatch } from "react-redux";
// import Modal from "@mui/material/Modal";
// import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
// import { inAppWider } from "../../../Styles/Modal";
// import Overlay from "../../../Material/Overlay";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogTitle from "@mui/material/DialogTitle";
// import { Transition } from "../../../Material/Dialog";
// import { inAppDialog } from "../../../Styles/Dialog";
// import {
//   GenericSecondary,
//   GenericPrimaryButton,
// } from "../../../Material/Button";
// import {
//   SEND_REQUEST,
//   REQUEST_SUCCESSFUL,
//   REQUEST_FAILED,
// } from "../../../Reducers/Actions";
// import BuyerService from "../../../Services/Buyer";

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
//   RECEIVED: 1,
//   CONFIRMED: 2,
//   "AWAITING PROOF OF PAYMENT": 3,
//   "PROOF OF PAYMENT APPROVED": 4,
//   PROCESSING: 5,
//   SHIPPED: 6,
//   DELIVERED: 7,
// };

// const steps = [
//   {
//     label: "Order placed",
//     description: "Order placed by buyer",
//   },
//   {
//     label: "Order Confirmed",
//     description: "Order to be confirmed by merchant",
//   },
//   {
//     label: "Proof of payment",
//     description: "Awaiting proof of payment from the buyer",
//   },
//   {
//     label: "Payment Approval",
//     description: "Pending Approval",
//   },
//   {
//     label: "Processing",
//     description: "The order is being processed.",
//   },
//   {
//     label: "Shipped",
//     description: "Your order is being shipped.",
//   },
//   {
//     label: "Delivered",
//     description: "Your order is being delivered.",
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

// const Orders = () => {
//   const [state, dispatch] = useReducer(formReducer, INITIAL_STATE);

//   const [paging, setPaging] = useState({
//     page: 1,
//     size: 10,
//     totalCount: 0,
//   });
//   const handlePageChange = (page) => {
//     setPaging({ ...paging, page: page + 1 });
//   };
//   const handlePageSizeChange = (size) => {
//     setPaging({ ...paging, size: size });
//   };

//   const rootDispatch = useDispatch();
//   const [refreshTable, setRefreshTable] = useState(false);
//   const iOS =
//     typeof navigator !== "undefined" &&
//     /iPad|iPhone|iPod/.test(navigator.userAgent);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const open = Boolean(anchorEl);
//   const [rows, setRows] = useState([]);
//   const [rowsLoading, setRowsLoading] = useState(false);
//   const [selectedOrderId, setSelectedOrderId] = useState(null);
//   const selectOrder = (id) => setSelectedOrderId(id);
//   const selectedOrder = rows && rows.find((row) => row.id === selectedOrderId);
//   const [openDrawer, setOpenDrawer] = useState(false);
//   const toggleDrawer = (open) => (_event) => {
//     setOpenDrawer(open);
//   };

//   const handleClick = (event, id) => {
//     setAnchorEl(event.currentTarget);
//     selectOrder(id);
//   };
//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const [openDrawerConfirmApprove, setOpenDialogConfirmApprove] =
//     useState(false);
//   const handleClickOpenDialogConfirmApprove = (e) => {
//     e.preventDefault();
//     setOpenDialogConfirmApprove(true);
//   };
//   const handleCloseDialogConfirmApprove = () => {
//     setOpenDialogConfirmApprove(false);
//   };

//   const [openDrawerConfirmShipped, setOpenDialogConfirmShipped] =
//     useState(false);
//   const handleClickOpenDialogConfirmShipped = (e) => {
//     e.preventDefault();
//     setOpenDialogConfirmShipped(true);
//   };
//   const handleCloseDialogConfirmShipped = () => {
//     setOpenDialogConfirmShipped(false);
//   };

//   const [openDrawerConfirmDelivered, setOpenDialogConfirmDelivered] =
//     useState(false);
//   const handleClickOpenDialogConfirmDelivered = (e) => {
//     e.preventDefault();
//     setOpenDialogConfirmDelivered(true);
//   };
//   const handleCloseDialogConfirmDelivered = () => {
//     setOpenDialogConfirmDelivered(false);
//   };

//   const handleStatusUpdate = (updateType, status) => {
//     if (updateType === "approve") {
//       approveOrder();
//     } else if (updateType === "update") {
//       updateOrder(status);
//     }
//   };

//   const approveOrder = async () => {
//     dispatch({ type: SEND_REQUEST });
//     const adminService = new AdminService();
//     try {
//       const { errors } = await adminService.approveOrder(
//         selectedOrder?.referenceCode
//       );
//       if (errors.length === 0) {
//         dispatch({ type: REQUEST_SUCCESSFUL });
//         setRefreshTable((prev) => !prev);
//         handleCloseDialogConfirmApprove();
//         handleSuccessfullRequest("Order approved successfully", 3000);
//       } else {
//         dispatch({ type: REQUEST_FAILED });
//         handleCloseDialogConfirmApprove();
//         handleFailedRequest("Could not process your order", 5000);
//       }
//     } catch (error) {}
//   };

//   const updateOrder = async (status) => {
//     dispatch({ type: SEND_REQUEST });
//     const adminService = new AdminService();
//     try {
//       const { errors } = await adminService.updateOrder(
//         selectedOrder?.referenceCode,
//         status
//       );
//       if (errors.length === 0) {
//         dispatch({ type: REQUEST_SUCCESSFUL });
//         setRefreshTable((prev) => !prev);
//         status === "SHIPPED" && handleCloseDialogConfirmShipped();
//         status === "DELIVERED" && handleCloseDialogConfirmDelivered();
//         handleSuccessfullRequest("Order status updated successfully", 3000);
//       } else {
//         status === "SHIPPED" && handleCloseDialogConfirmShipped();
//         status === "DELIVERED" && handleCloseDialogConfirmDelivered();
//         handleFailedRequest("Could not process your order", 5000);
//       }
//     } catch (error) {}
//   };

//   const handleSuccessfullRequest = (message, timeOut) => {
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

// const columns = [
//   { field: "index", headerName: "Number", width: 80 },
//   { field: "orderNo", headerName: "Order #", width: 100 },
//   { field: "product", headerName: "Product", width: 150 },
//   { field: "terms", headerName: "Terms", width: 100 },
//   { field: "destination", headerName: "Destination", width: 100 },
//   { field: "quantity", headerName: "Quantity", width: 90 },
//   { field: "status", headerName: "Status", width: 100 },
//   {
//     field: "more",
//     headerName: "",
//     width: 30,
//     renderCell: ({ row }) => (
//       <div className="simple-center-div">
//         <More id={row.id} />
//       </div>
//     ),
//   },
// ];

//   const list = (stepperOrientation) =>
//     selectedOrder && (
//       <Box role="presentation">
//         <div className="requests-sections-body">
//           <div className="requests-title-container">
//             <div>Order {selectedOrder?.orderNo}</div>
//           </div>
//           <div className="requests-sections-container">
//             <section>
//               <div className="requests-section-title">Buyer Details</div>
//               <div className="request-section-body">
//                 <div>
//                   <span>Name:</span>
//                   <span>
//                     {selectedOrder?.buyer?.firstName}{" "}
//                     {selectedOrder?.buyer?.lastName}
//                   </span>
//                 </div>
//                 <div>
//                   <span>Email:</span>
//                   <span style={{ textTransform: "lowercase" }}>
//                     {selectedOrder?.buyer?.email}
//                   </span>
//                 </div>
//                 <div>
//                   <span>Company:</span>
//                   <span>{selectedOrder?.buyer?.companyName}</span>
//                 </div>
//                 <div>
//                   <span>Country:</span>
//                   <span>{selectedOrder?.buyer?.country}</span>
//                 </div>
//               </div>
//             </section>

//             {selectedOrder?.merchant.map((userMerchant, index) => (
//               <section key={index}>
//                 <div className="requests-section-title">
//                   [ {index + 1} ] Merchant Details
//                 </div>
//                 <div className="request-section-body">
//                   <div>
//                     <span>Name:</span>
//                     <span>
//                       {userMerchant?.firstName} {userMerchant?.lastName}
//                     </span>
//                   </div>
//                   <div>
//                     <span>Email:</span>
//                     <span style={{ textTransform: "lowercase" }}>
//                       {userMerchant?.email}
//                     </span>
//                   </div>
//                   <div>
//                     <span>Company:</span>
//                     <span>{userMerchant?.companyName}</span>
//                   </div>
//                   <div>
//                     <span>Country:</span>
//                     <span>{userMerchant?.country}</span>
//                   </div>
//                 </div>
//               </section>
//             ))}

//             <section>
//               <div className="requests-section-title">Order Summary</div>
//               <div className="request-section-body">
//                 <div>
//                   <span>Product:</span>
//                   <span>{selectedOrder.product}</span>
//                 </div>
//                 <div>
//                   <span>Species:</span>
//                   <span>{selectedOrder.species}</span>
//                 </div>
//                 <div>
//                   <span>Type of Species:</span>
//                   <span>{selectedOrder.speciesType}</span>
//                 </div>
//                 <div>
//                   <span>Origin:</span>
//                   <span>{selectedOrder.origin}</span>
//                 </div>
//                 <div>
//                   <span>Container size:</span>
//                   <span>{selectedOrder.containerSize}</span>
//                 </div>
//                 <div>
//                   <span>Volume:</span>
//                   <span>
//                     {selectedOrder.volume} {selectedOrder.volumeUnit}
//                   </span>
//                 </div>
//                 <div>
//                   <span>Quantity:</span>
//                   <span>
//                     {selectedOrder.quantity} {selectedOrder.containerSize}
//                   </span>
//                 </div>
//                 <div>
//                   <span>Requested Date:</span>
//                   <span>{selectedOrder.createdOn}</span>
//                 </div>
//               </div>
//             </section>

//             <section>
//               <div className="requests-section-title">
//                 Pricing and Delivery Information
//               </div>
//               <div className="request-section-body">
//                 <div>
//                   <span>Shipping Address:</span>
//                   <span>{selectedOrder.shippingAddress}</span>
//                 </div>
//                 <div>
//                   <span>Terms:</span>
//                   <span>{selectedOrder.terms}</span>
//                 </div>
//                 <div>
//                   <span>Destination:</span>
//                   <span>{selectedOrder.destination}</span>
//                 </div>
//                 <div>
//                   <span>Destination Port:</span>
//                   <span>{selectedOrder.port}</span>
//                 </div>
//               </div>
//             </section>

//             {selectedOrder?.paymentMode && (
//               <section>
//                 <div className="requests-section-title">Payment Details</div>
//                 <div className="request-section-body">
//                   <div>
//                     <span>Payment Mode:</span>
//                     <span>{selectedOrder.paymentMode}</span>
//                   </div>
//                 </div>
//               </section>
//             )}

//             <section>
//               <div className="requests-section-title">Track Order</div>
//               <div className="order-section-body">
//                 <div>
//                   {" "}
//                   <ProgressBar status={selectedOrder.status} />{" "}
//                 </div>
//               </div>
//               <div className="order-section-stepper-container">
//                 <Box>
//                   <Stepper
//                     activeStep={ORDER_STATUS_STEPS[selectedOrder.status]}
//                     orientation={stepperOrientation}
//                   >
// {steps.map((step) => (
//   <Step key={step.label}>
//     <StepLabel>{step.label}</StepLabel>
//     {stepperOrientation === "vertical" && (
//       <StepContent>
//         <div>{step.description}</div>
//         <Box sx={{ mb: 0 }}>
//           <div></div>
//         </Box>
//       </StepContent>
//     )}
//   </Step>
// ))}
//                   </Stepper>
//                 </Box>
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
//       const adminService = new AdminService();
//       const buyerService = new BuyerService();
//       try {
//         const { page, size } = paging;
//         const { data, errors } = await adminService.getOrders(
//           abortController.signal,
//           { page, size }
//         );
//         if (errors.length === 0) {
//           setPaging({ ...paging, totalCount: data.data.totalCount });
//           const filteredData = data.data.data;

//           const newFilteredData = await Promise.all(
//             filteredData.map(async (order, index) => {
//               order.users = await (
//                 await buyerService.getOrderList(order?._id)
//               ).data.data.data.map((userGroup) => {
//                 userGroup.merchant = {
//                   companyName: userGroup.merchant.companyName,
//                   country: userGroup.merchant.country,
//                   email: userGroup.merchant.email,
//                   firstName: userGroup.merchant.firstName,
//                   lastName: userGroup.merchant.lastName,
//                 };

//                 userGroup.buyer = {
//                   companyName: userGroup.user.companyName,
//                   country: userGroup.user.country,
//                   email: userGroup.user.email,
//                   firstName: userGroup.user.firstName,
//                   lastName: userGroup.user.lastName,
//                 };

//                 return userGroup;
//               });

//               console.log(order.users);

//               return {
//                 index: paging.size * paging.page - (paging.size - index) + 1,
//                 id: order?.doc[0]?._id,
//                 destination: order?.doc[0]?.request?.destination,
//                 product:
//                   order?.doc[0]?.request?.quotationProducts[0]?.product.name,
//                 species:
//                   order?.doc[0]?.request?.quotationProducts[0]?.product?.species
//                     ?.label,
//                 speciesType:
//                   order?.doc[0]?.request?.quotationProducts[0]?.product?.species
//                     ?.type?.label,
//                 origin:
//                   order?.doc[0]?.request?.quotationProducts[0]?.product?.origin
//                     ?.country,
//                 containerSize:
//                   order?.doc[0]?.request?.quotationProducts[0]?.product
//                     ?.supportedShippingContainers[0].label,
//                 volume:
// order?.doc[0]?.request?.quotationProducts[0]?.product?.volume
//   ?.value,
//                 volumeUnit:
// order?.doc[0]?.request?.quotationProducts[0]?.product?.volume
//   ?.unit,
//                 terms: order?.doc[0]?.request?.buyerQuotationIncoterm?.label,
//                 quantity: order?.doc[0]?.orderQuantity,
//                 createdOn: new Date(order?.doc[0]?.createdOn)
//                   .toUTCString()
//                   .slice(0, 16),
//                 expiryDate: new Date(order?.doc[0]?.request?.expiryDate)
//                   .toUTCString()
//                   .slice(0, 25),
//                 shippingAddress:
//                   order?.doc[0]?.orderPaymentDetails?.shippingAddress,
//                 port: order?.doc[0]?.request?.port,
//                 paymentMode: order?.doc[0]?.orderPaymentDetails?.orderPayment,
//                 orderNo: order?.doc[0]?.orderNo,
//                 status: order?.doc[0]?.status,
//                 buyer: order?.users[0]?.buyer,
//                 merchant: order?.users.map((user) => user.merchant),
//               };
//             })
//           );

//           setRows(newFilteredData);
//         }
//       } catch (error) {}
//       setRowsLoading(false);
//     };

//     fetchData();
//     return () => abortController.abort();
//     // eslint-disable-next-line
//   }, [paging.page, paging.size, refreshTable]);

//   return (
//     <div className="Orders-Table">
//       <div>
//         <Dialog
//           open={openDrawerConfirmApprove}
//           TransitionComponent={Transition}
//           keepMounted
//           onClose={handleCloseDialogConfirmApprove}
//           aria-describedby="alert-dialog-slide-description"
//           sx={inAppDialog}
//           className="inAppDialog"
//         >
//           <DialogTitle>{"Approve this order?"}</DialogTitle>
//           <DialogActions>
//             <GenericSecondary
//               variant="text"
//               onClick={handleCloseDialogConfirmApprove}
//             >
//               No
//             </GenericSecondary>
//             <GenericPrimaryButton
//               variant="contained"
//               loading={state.requestState.loading}
//               onClick={() => handleStatusUpdate("approve")}
//             >
//               Yes
//             </GenericPrimaryButton>
//           </DialogActions>
//         </Dialog>
//       </div>

//       <div>
//         <Dialog
//           open={openDrawerConfirmShipped}
//           TransitionComponent={Transition}
//           keepMounted
//           onClose={handleCloseDialogConfirmShipped}
//           aria-describedby="alert-dialog-slide-description"
//           sx={inAppDialog}
//           className="inAppDialog"
//         >
//           <DialogTitle>{"Update order's status?"}</DialogTitle>
//           <DialogActions>
//             <GenericSecondary
//               variant="text"
//               onClick={handleCloseDialogConfirmShipped}
//             >
//               No
//             </GenericSecondary>
//             <GenericPrimaryButton
//               variant="contained"
//               loading={state.requestState.loading}
//               onClick={() => handleStatusUpdate("update", "SHIPPED")}
//             >
//               Yes
//             </GenericPrimaryButton>
//           </DialogActions>
//         </Dialog>
//       </div>

//       <div>
//         <Dialog
//           open={openDrawerConfirmDelivered}
//           TransitionComponent={Transition}
//           keepMounted
//           onClose={handleCloseDialogConfirmDelivered}
//           aria-describedby="alert-dialog-slide-description"
//           sx={inAppDialog}
//           className="inAppDialog"
//         >
//           <DialogTitle>{"Update order's status?"}</DialogTitle>
//           <DialogActions>
//             <GenericSecondary
//               variant="text"
//               onClick={handleCloseDialogConfirmDelivered}
//             >
//               No
//             </GenericSecondary>
//             <GenericPrimaryButton
//               variant="contained"
//               loading={state.requestState.loading}
//               onClick={() => handleStatusUpdate("update", "DELIVERED")}
//             >
//               Yes
//             </GenericPrimaryButton>
//           </DialogActions>
//         </Dialog>
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
//         <Menu
//           anchorEl={anchorEl}
//           id="account-menu"
//           open={open}
//           onClose={handleClose}
//           onClick={handleClose}
//           transformOrigin={{ horizontal: "right", vertical: "top" }}
//           anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
//         >
//           <MenuItem onClick={toggleDrawer(true)}>View</MenuItem>

//           {selectedOrder && (
//             <div>
//               {selectedOrder.status === "AWAITING PROOF OF PAYMENT" && (
//                 <MenuItem onClick={handleClickOpenDialogConfirmApprove}>
//                   Approve
//                 </MenuItem>
//               )}

//               {selectedOrder.status === "PROOF OF PAYMENT APPROVED" && (
//                 <MenuItem onClick={handleClickOpenDialogConfirmShipped}>
//                   Shipped
//                 </MenuItem>
//               )}

//               {selectedOrder.status === "SHIPPED" && (
//                 <MenuItem onClick={handleClickOpenDialogConfirmDelivered}>
//                   Delivered
//                 </MenuItem>
//               )}
//             </div>
//           )}
//         </Menu>
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

//       <DataGrid
//         components={{
//           Toolbar: Toolbar,
//           LoadingOverlay: LinearProgress,
//           LinearProgress,
//           NoRowsOverlay: () => <Overlay label="Orders" />,
//         }}
//         className="standard-table"
//         checkboxSelection
//         disableSelectionOnClick
//         pageSize={paging.size}
//         rows={rows}
//         columns={columns}
//         pagination
//         density="compact"
//         rowsPerPageOptions={[10, 20, 30, 40, 50]}
//         loading={rowsLoading}
//         rowCount={paging.totalCount}
//         paginationMode="server"
//         onPageChange={handlePageChange}
//         onPageSizeChange={handlePageSizeChange}
//       />
//     </div>
//   );
// };

// export default Orders;
