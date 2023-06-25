import { useEffect, useState, useReducer } from "react";
import Countdown from "../../Countdown";
import { MuiTableV1, MuiTableV2 } from "../../v2/components/Table";
import BuyerService from "../../../Services/Buyer";
import { Box, Stack, Radio, RadioGroup, TextField } from "@mui/material";
import { MenuItem } from "@mui/material";
import { MuiMoreV1 } from "../../More";
import {
  SectionItem,
  SectionItemCollapsable,
  StackItem,
} from "../../v2/components/Lists";
import { widerBox, xMediumBox, xSmallBox } from "../../../Styles/v2/box";
import DrawerModal from "../../v2/components/DrawerModal";
import {
  SmallPrimary,
  SmallSecondary,
  TextButton,
} from "../../../Material/Button";
import MuiStepper from "../../v2/components/Stepper";
import { ProgressBar } from "../../v2/components/ProgressBar";
import { checkConfirmation } from "../../Functions";
import "../../../Styles/v2/Orders.css";
import TandCs from "../../v2/components/TandCs";
import {
  INPUTING,
  SEND_REQUEST,
  REQUEST_SUCCESSFUL,
  REQUEST_FAILED,
} from "../../../Reducers/Actions";
import { INITIAL_STATE, formReducer } from "../../../Reducers/FormReducer";
import { setAlert } from "../../../Redux/Features/Alert.js";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import CustomProgress from "../../v2/components/CustomProgress";
import { Tip } from "../../v2/components/Tip";

const ConfirmationRadios = ({ onChange }) => {
  return (
    <RadioGroup onChange={onChange} name="orderPayment" required>
      <ConfirmationRadio
        to="/about/#payment-options-cash-against-document"
        value="Cash against documents (10%) Escrow deposit required"
      />
      <ConfirmationRadio
        to="/about/#payment-options-letter-of-credit"
        value="Letter of credit"
      />
      <ConfirmationRadio
        to="/about/#payment-options-cash-bank-transfer"
        value=" Bank transfer"
      />
    </RadioGroup>
  );
};

const ConfirmationRadio = ({ value, to }) => {
  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <Radio required size="small" value={value} />
      <NavLink
        className="order_radio_label_links"
        target="_blank"
        rel="noopener noreferrer"
        to={to}
      >
        <div style={{ fontSize: "14px" }}>{value}</div>
      </NavLink>
    </Stack>
  );
};

const ConfirmOrderFormSection = ({ title, children }) => {
  return (
    <section className="order_confirm_order_section">
      <Stack spacing={2}>
        <div className="order_confirm_order_title">{title}</div>
        <div className="order_confirm_order_content">{children}</div>
      </Stack>
    </section>
  );
};

const Orders = () => {
  const rootDispatch = useDispatch();
  const [state, dispatch] = useReducer(formReducer, INITIAL_STATE);

  const [rows, setRows] = useState([]);
  const [reloadTable, setReloadTable] = useState(false);
  const [selectedOrderRef, setSelectedOrderRef] = useState(null);
  const [rowsLoading, setRowsLoading] = useState(false);
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

  const [rowsButtonState, setRowsButton] = useState({
    id: null,
    loading: false,
  });

  const handleChange = (e) => {
    dispatch({ type: INPUTING, prop: e.target.name, value: e.target.value });
  };

  const triggerSnackBarAlert = (message, severity) => {
    const payload = {
      severity,
      message,
    };
    rootDispatch(setAlert(payload));
  };

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
              createdOn: new Date(orders?.createdOn).toDateString(),
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

  const [openConfirmForm, setOpenConfirmForm] = useState(false);
  const toggleOpenConfirmForm = (open, ref) => () => {
    if (open) {
      setSelectedOrderRef(ref);
    } else {
      setSelectedOrderRef(null);
      setPurchaseAgreementStatus(false);
      state.payload = {};
    }
    setOpenConfirmForm(open);
  };

  const [openPurchaseAgreement, setOpenPurchaseAgreement] = useState(false);
  const toggleOpenPurchaseAgreement = (open) => () => {
    setOpenPurchaseAgreement(open);
  };

  const [purchaseAgreementStatus, setPurchaseAgreementStatus] = useState(false);
  const togglePurchaseAgreementStatus = (open) => () => {
    setOpenPurchaseAgreement(false);
    setPurchaseAgreementStatus(open);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: SEND_REQUEST });
    const buyerService = new BuyerService();
    if (selectedOrderRef) {
      try {
        const { errors } = await buyerService.confirmOrder(
          selectedOrderRef,
          state.payload
        );
        if (errors.length === 0) {
          dispatch({ type: REQUEST_SUCCESSFUL });
          setReloadTable((prev) => !prev);
          triggerSnackBarAlert(
            "Merchant will be notified to commence fulfillment of your order once proof of payment is confirmed",
            "success"
          );
          toggleOpenConfirmForm(false)();
        } else {
          dispatch({ type: REQUEST_FAILED });
          triggerSnackBarAlert("Could not process your request", "error");
        }
      } catch (error) {
        throw error;
      }
    }
  };

  const columns = [
    { field: "index", headerName: "Number", width: 80 },
    { field: "orderNo", headerName: "Order #", width: 100 },
    { field: "productName", headerName: "Product", width: 180 },
    { field: "incoterm", headerName: "Terms", width: 100 },
    { field: "quantity", headerName: "Quantity", width: 100 },
    { field: "destination", headerName: "Destination", width: 180 },
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
              <CustomProgress tableRowsLoading={true} />
            )
          ) : (
            <MuiMoreV1>
              <MenuItem onClick={handleOpenOrdersView(row.id, row.ref)}>
                View
              </MenuItem>
              {row.confirmedStatus && (
                <MenuItem onClick={toggleOpenConfirmForm(true, row.ref)}>
                  Confirm
                </MenuItem>
              )}
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
          const filteredData = data.data.data.map((orderOffers, index) => {
            const order = orderOffers?.doc?.at(0);
            const quotationProduct = order?.request?.quotationProducts.at(0);
            return {
              index: index + 1,
              id: order?._id,
              ref: orderOffers?._id,
              confirmedStatus: checkConfirmation(orderOffers?.OrderStatus),
              offerList: orderOffers?.doc,
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
    return () => abortController.abort();
  }, [reloadTable]);

  return (
    <main>
      <DrawerModal
        boxStyle={xMediumBox}
        openState={openOrdersView}
        toggleOpenState={toggleOpenOrdersView}
        title="Orders Details"
      >
        {selectedOrders && (
          <Stack spacing={2} direction="column">
            <Tip
              message="Kindly note that you will only be able to confirm this order
                after confirmation from merchant(s)"
            />
            <Box>
              <MuiTableV2
                checkboxSelection={false}
                rows={selectedOrders}
                columns={columnsOrders}
              />
            </Box>
          </Stack>
        )}
      </DrawerModal>

      <DrawerModal
        boxStyle={widerBox}
        openState={openOrderView}
        toggleOpenState={toggleOpenOrderView}
        title="Order Details"
      >
        {selectedOrder && (
          <Box>
            <div>
              <SectionItem sectionTitle="Product Information">
                <StackItem title="Product" value={selectedOrder?.productName} />
                <StackItem title="Terms" value={selectedOrder?.terms} />
                <StackItem
                  title="Quantity"
                  value={`${selectedOrder?.quantity} 20ft Container`}
                />
                <StackItem
                  title="Requested Date"
                  value={selectedOrder?.createdOn}
                />
              </SectionItem>

              <SectionItemCollapsable sectionTitle="Merchant Details">
                <StackItem title="Name" value={selectedOrder?.merchant?.name} />
                <StackItem
                  title="Email"
                  value={selectedOrder?.merchant?.email}
                />
                <StackItem
                  title="Mobile"
                  value={`+${selectedOrder?.merchant?.mobile}`}
                />
              </SectionItemCollapsable>

              <SectionItem sectionTitle="Track Order">
                <Stack paddingBottom={3} direction="column" width="100%">
                  <ProgressBar status={selectedOrder?.status} />
                  <MuiStepper activeStep={selectedOrder?.status} />
                </Stack>
              </SectionItem>
            </div>
          </Box>
        )}
      </DrawerModal>

      <DrawerModal
        title="Confirm Order"
        boxStyle={xMediumBox}
        openState={openConfirmForm}
        toggleOpenState={toggleOpenConfirmForm}
      >
        {selectedOrderRef && (
          <Box component="form" onSubmit={handleSubmit}>
            <Stack direction="column" spacing={2}>
              <Tip>
                <div>
                  Please read carefully and accept our{" "}
                  <u
                    className="order_confirmation_underlined"
                    onClick={toggleOpenPurchaseAgreement(true)}
                  >
                    sales and purchase agreement here
                  </u>{" "}
                  to proceed with confirming your order
                </div>
              </Tip>
              <Stack spacing={2} className="order_confirm_order_sections">
                <ConfirmOrderFormSection title="A. Kindly choose one of the payment options below">
                  <ConfirmationRadios onChange={handleChange} />
                </ConfirmOrderFormSection>
                <ConfirmOrderFormSection title="B. Please provide your shipping address">
                  <TextField
                    name="shippingAddress"
                    fullWidth
                    multiline
                    rows={3}
                    sx={{ background: "#fff" }}
                    required
                    onChange={handleChange}
                  />
                </ConfirmOrderFormSection>
                <Stack>
                  <SmallSecondary
                    variant="contained"
                    type="submit"
                    disabled={!purchaseAgreementStatus}
                    loading={state?.requestState?.loading}
                  >
                    Confirm Order
                  </SmallSecondary>
                </Stack>
              </Stack>
            </Stack>
          </Box>
        )}
      </DrawerModal>

      <DrawerModal
        title="Sales & Purchase Agreement"
        boxStyle={xSmallBox}
        openState={openPurchaseAgreement}
        toggleOpenState={toggleOpenPurchaseAgreement}
      >
        <Stack spacing={2}>
          <div className="orders_confirmation_document">
            <TandCs />
          </div>
          <Stack direction="row" spacing={1}>
            <TextButton
              variant="text"
              onClick={togglePurchaseAgreementStatus(true)}
            >
              Accept
            </TextButton>
            <TextButton
              variant="text"
              onClick={togglePurchaseAgreementStatus(false)}
            >
              Cancel
            </TextButton>
          </Stack>
        </Stack>
      </DrawerModal>

      <MuiTableV1
        label="Orders"
        rows={rows}
        columns={columns}
        paging={paging}
        rowsLoading={rowsLoading}
        handlePageChange={handlePageChange}
        handlePageSizeChange={handlePageSizeChange}
      />
    </main>
  );
};

export default Orders;
