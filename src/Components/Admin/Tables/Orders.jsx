import { useEffect, useState } from "react";
import MuiTable from "../../v2/components/Table";
import {
  SectionItem,
  SectionItemCollapsable,
  StackItem,
} from "../../v2/components/Lists";
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
import { setAlert } from "../../../Redux/Features/Alert.js";
import { useDispatch } from "react-redux";
import CustomProgress from "../../v2/components/CustomProgress";
import { capitalizeText } from "../../Functions";

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

  const rootDispatch = useDispatch();

  const [reloadTable, setReloadTable] = useState(false);

  const [selectedOrderReference, setSelectedOrderReference] = useState(null);
  const [selectedUpdatedOrderPayload, setSelectedUpdatedOrderPayload] =
    useState({
      ref: null,
      status: null,
    });

  const [rowsButtonState, setRowsButtonState] = useState({
    id: null,
    loading: false,
  });

  const [rows, setRows] = useState([]);
  const [rowsLoading, setRowsLoading] = useState(false);

  const [dialogButtonState, setDialogButtonState] = useState(false);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedOffers, setSelectedOffers] = useState(null);
  const [openOrderView, setOpenOrderView] = useState(false);
  const toggleOpenOrderView = (open) => () => {
    setOpenOrderView(open);
    if (!open) {
      setSelectedOrder(null);
      setSelectedOffers(null);
    }
  };
  const handleOpenOrder = (id) => () => {
    const order = rows.find((row) => row.id === id);
    setSelectedOrder(order);
    const fetchData = async () => {
      setRowsButtonState({
        id: id,
        loading: true,
      });
      const buyerService = new BuyerService();
      try {
        const { data, errors } = await buyerService.getOrderList(order.ref);
        if (errors.length === 0) {
          setOpenOrderView(true);
          const unfilteredBuyer = data.data.data?.at(0)?.user;
          const buyer = {
            name: `${unfilteredBuyer?.firstName} ${unfilteredBuyer?.lastName}`,
            email: unfilteredBuyer?.email,
            mobile: unfilteredBuyer?.mobileNo,
          };
          const merchants = data.data.data.map((offer) => {
            return {
              name: `${offer?.merchant?.firstName} ${offer?.merchant?.lastName}`,
              email: offer?.merchant?.email,
              mobile: offer?.merchant?.mobileNo,
            };
          });
          const offers = {
            buyer,
            merchants,
          };
          setSelectedOffers(offers);
        }
      } catch (error) {
        throw error;
      }
      setRowsButtonState({
        id: null,
        loading: false,
      });
    };
    fetchData();
  };

  const [openApproveDialog, setOpenApproveDialog] = useState(false);
  const toggleOpenApproveDialog = (open, ref) => () => {
    setOpenApproveDialog(open);
    setSelectedOrderReference(ref);
  };
  const dialogActionApprove_Yes = () => {
    const doAction = async () => {
      setDialogButtonState(true);
      const adminService = new AdminService();
      try {
        const { errors } = await adminService.approveOrder(
          selectedOrderReference
        );
        if (errors.length === 0) {
          setOpenApproveDialog(false);
          setReloadTable((prev) => !prev);
          setSelectedOrderReference(null);
          triggerSnackBarAlert("Order approved successfully", "success");
        }
      } catch (error) {
        throw error;
      }
      setDialogButtonState(false);
    };
    doAction();
  };

  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const toggleOpenUpdateDialog =
    (open, ref = null, status = null) =>
    () => {
      setOpenUpdateDialog(open);
      setSelectedUpdatedOrderPayload({
        ref,
        status,
      });
    };
  const dialogActionUpdate_Yes = () => {
    const doAction = async () => {
      setDialogButtonState(true);
      const adminService = new AdminService();
      const { ref, status } = selectedUpdatedOrderPayload;
      try {
        const { errors } = await adminService.updateOrder(ref, status);
        if (errors.length === 0) {
          setOpenUpdateDialog(false);
          setReloadTable((prev) => !prev);
          setSelectedUpdatedOrderPayload({
            ref: null,
            status: null,
          });
          triggerSnackBarAlert("Order status updated successfully", "success");
        }
      } catch (error) {
        throw error;
      }
      setDialogButtonState(false);
    };
    doAction();
  };

  const triggerSnackBarAlert = (message, severity) => {
    const payload = {
      severity,
      message,
    };
    rootDispatch(setAlert(payload));
  };

  const columns = [
    { field: "index", headerName: "Number", width: 80 },
    { field: "orderNo", headerName: "Order #", width: 100 },
    { field: "productName", headerName: "Product", width: 180 },
    { field: "terms", headerName: "Terms", width: 100 },
    { field: "destination", headerName: "Destination", width: 100 },
    { field: "quantity", headerName: "Quantity", width: 100 },
    { field: "status", headerName: "Status", width: 180 },
    {
      field: "actions",
      headerName: "",
      width: 50,
      renderCell: ({ row }) => (
        <Stack direction="row" justifyContent="center" sx={{ width: "100%" }}>
          {rowsButtonState.id === row.id && rowsButtonState.loading ? (
            <CustomProgress tableRowsLoading={true} />
          ) : (
            <MuiMoreV1>
              <MenuItem onClick={handleOpenOrder(row.id)}>View</MenuItem>
              {row.status === ORDER_STATUS["AWAITING PROOF OF PAYMENT"] && (
                <MenuItem onClick={toggleOpenApproveDialog(true, row.ref)}>
                  Approve
                </MenuItem>
              )}

              {row.status === ORDER_STATUS["PROOF OF PAYMENT APPROVED"] && (
                <MenuItem
                  onClick={toggleOpenUpdateDialog(true, row.ref, row.status)}
                >
                  Shipped
                </MenuItem>
              )}

              {row.status === ORDER_STATUS["SHIPPED"] && (
                <MenuItem
                  onClick={toggleOpenUpdateDialog(true, row.ref, row.status)}
                >
                  Delivered
                </MenuItem>
              )}
            </MuiMoreV1>
          )}
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
          setPaging({ ...paging, totalCount: data.data.totalCount });
          const filteredData = data.data.data.map((order, index) => {
            const doc = order.doc.at(0);
            const quotationProduct = doc.request?.quotationProducts.at(0);
            return {
              index: paging.size * paging.page - (paging.size - index) + 1,
              id: doc?._id,
              ref: order?._id,
              orderNo: doc?.orderNo,
              status: doc?.status,
              origin: quotationProduct?.product?.origin?.country,
              destination: capitalizeText(doc?.request?.destination),
              terms: doc?.request?.buyerQuotationIncoterm?.label,
              createdOn: new Date(doc.createdOn),
              expiryDate: new Date(doc?.request?.expiryDate),
              productName: quotationProduct?.product?.name,
              quantity: quotationProduct?.specification?.quantity,
              shipping: {
                address: doc?.orderPaymentDetails?.shippingAddress,
                port: doc?.request?.port,
                paymentMode: doc?.orderPaymentDetails?.orderPayment,
              },
              product: {
                species: quotationProduct?.product?.species?.label,
                speciesType: quotationProduct?.product?.species?.type?.label,
                specification: {
                  containerSize: "20ft Container",
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
    return () => abortController.abort();
    // eslint-disable-next-line
  }, [paging.page, paging.size, reloadTable]);

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
                title="Type Of Species"
                value={selectedOrder?.product?.speciesType}
              />
              <StackItem title="Origin" value={selectedOrder?.origin} />
              <StackItem
                title="Container size"
                value={selectedOrder?.product?.specification?.containerSize}
              />
              <StackItem
                capitalize={false}
                title="Volume"
                value={`${selectedOrder?.product?.specification?.volume} ${selectedOrder?.product?.specification?.volumeUnit}`}
              />
              <StackItem
                title="Quantity"
                value={`${selectedOrder?.quantity} ${selectedOrder?.product?.specification?.containerSize}`}
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

            <SectionItemCollapsable sectionTitle="Buyer Details">
              <StackItem
                title="Full Name"
                value={selectedOffers?.buyer?.name}
              />
              <StackItem
                capitalize={false}
                title="Email"
                value={selectedOffers?.buyer?.email}
              />
              <StackItem
                title="Mobile"
                value={`+${selectedOffers?.buyer?.mobile}`}
              />
            </SectionItemCollapsable>

            {selectedOffers?.merchants &&
              selectedOffers?.merchants?.length > 0 &&
              selectedOffers?.merchants.map((merchant, index) => (
                <SectionItemCollapsable
                  key={index}
                  sectionTitle={`Merchant Details ${index + 1}`}
                >
                  <StackItem title="Full Name" value={merchant.name} />
                  <StackItem
                    capitalize={false}
                    title="Email"
                    value={merchant.email}
                  />
                  <StackItem title="Mobile" value={`+${merchant.mobile}`} />
                </SectionItemCollapsable>
              ))}

            <SectionItem sectionTitle="Track Order">
              <Stack paddingBottom={3} direction="column" width="100%">
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
          variant="text"
          color="inherit"
          disabled={dialogButtonState}
          onClick={toggleOpenApproveDialog(false)}
        >
          No
        </Button1>
        <Button1
          variant="text"
          color="inherit"
          loading={dialogButtonState}
          onClick={dialogActionApprove_Yes}
        >
          Yes
        </Button1>
      </MuiDialog>

      <MuiDialog
        openDialog={openUpdateDialog}
        toggleOpenDialog={toggleOpenUpdateDialog}
        dialogTitle="Do you want to update the status of this order?"
      >
        <Button1
          variant="text"
          color="inherit"
          disabled={dialogButtonState}
          onClick={toggleOpenUpdateDialog(false)}
        >
          No
        </Button1>
        <Button1
          variant="text"
          color="inherit"
          loading={dialogButtonState}
          onClick={dialogActionUpdate_Yes}
        >
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
