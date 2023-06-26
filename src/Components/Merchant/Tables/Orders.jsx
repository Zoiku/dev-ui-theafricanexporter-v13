import { useEffect, useState } from "react";
import MerchantService from "../../../Services/Merchant";
import { MuiTableV1 } from "../../v2/components/Table";
import {
  SectionItem,
  SectionItemCollapsable,
  StackItem,
} from "../../v2/components/Lists";
import Countdown from "../../Countdown";
import { MuiMoreV1 } from "../../More";
import DrawerModal from "../../v2/components/DrawerModal";
import { Box, Stack } from "@mui/material";
import { widerBox } from "../../../Styles/v2/box";
import MuiStepper from "../../v2/components/Stepper";
import { ProgressBar } from "../../v2/components/ProgressBar";
import { MenuItem } from "@mui/material";
import {
  ORDER_STATUS,
  ORDER_STATUS_STEPS,
} from "../../v2/components/OrderStatus";
import MuiDialog from "../../v2/components/Dialog";
import { Button1 } from "../../v2/components/Buttons";
import { setAlert } from "../../../Redux/Features/Alert";
import { useDispatch } from "react-redux";

const Orders = () => {
  const rootDispatch = useDispatch();
  const [rows, setRows] = useState([]);
  const [rowsLoading, setRowsLoading] = useState(false);
  const [tableReload, setTableReload] = useState(false);
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

  const [selectedOrderId, setSelectedSelectedOrderId] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [openOrderView, setOpenOrderView] = useState(false);
  const toggleOpenOrderView = (open) => () => {
    setOpenOrderView(open);
    if (!open) {
      setSelectedOrder(null);
      setSelectedSelectedOrderId(null);
    }
  };
  const handleOpenOrderView = (id) => () => {
    const order = rows.find((row) => row.id === id);
    setSelectedOrder(order);
    setOpenOrderView(true);
  };

  const [dialogButtonLoading, setDialogButtonLoading] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const toggleOpenConfirmDialog = (open) => () => {
    setOpenConfirmDialog(open);
  };
  const handleOpenConfirmDialog = (id) => () => {
    setSelectedSelectedOrderId(id);
    setOpenConfirmDialog(true);
  };
  const dialogActionConfirm_Yes = () => {
    const doAction = async () => {
      setDialogButtonLoading(true);
      try {
        const merchantService = new MerchantService();
        const { errors } = await merchantService.orderConfirmation(
          selectedOrderId
        );
        if (errors.length === 0) {
          setOpenConfirmDialog(false);
          setTableReload((prev) => !prev);
          triggerSnackBarAlert(
            "You will be notified immediately the buyer confirms the order",
            "success"
          );
        }
      } catch (error) {
        throw error;
      }
      setDialogButtonLoading(false);
    };
    doAction();
  };

  const [openRejectDialog, setOpenRejectDialog] = useState(false);
  const toggleOpenRejectDialog = (open) => () => {
    setOpenRejectDialog(open);
  };
  const handleOpenRejectDialog = (id) => () => {
    setSelectedSelectedOrderId(id);
    setOpenRejectDialog(true);
  };
  const dialogActionReject_Yes = () => {
    const doAction = async () => {
      setDialogButtonLoading(true);
      try {
        const merchantService = new MerchantService();
        const { errors } = await merchantService.orderRejection(
          selectedOrderId
        );
        if (errors.length === 0) {
          setOpenRejectDialog(false);
          setTableReload((prev) => !prev);
          triggerSnackBarAlert(
            "Order rejected, the buyer will be notified",
            "success"
          );
        }
      } catch (error) {
        throw error;
      }
      setDialogButtonLoading(false);
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
    { field: "quantity", headerName: "Quantity", width: 100 },
    { field: "status", headerName: "Status", width: 180 },
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
          <MuiMoreV1>
            <MenuItem onClick={handleOpenOrderView(row.id)}>View</MenuItem>
            {row.status === ORDER_STATUS.RECEIVED && (
              <>
                <MenuItem onClick={handleOpenConfirmDialog(row.id)}>
                  Confirm
                </MenuItem>
                <MenuItem onClick={handleOpenRejectDialog(row.id)}>
                  Reject
                </MenuItem>
              </>
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
      const merchantService = new MerchantService();
      try {
        const { data, errors } = await merchantService.getOrders(
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
              terms: order?.request?.buyerQuotationIncoterm?.label,
              destination: order?.request?.destination,
              expiryDate: order?.request?.expiryDate,
              status: order?.status,
              quantity: order?.orderQuantity,
              buyer: order?.user,
              requestedDate: new Date(order?.createdOn).toDateString(),
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
  }, [tableReload]);

  const OrderView = () => {
    return (
      selectedOrder && (
        <Box>
          <div>
            <SectionItem sectionTitle="Order Summary">
              <StackItem title="Product" value={selectedOrder?.productName} />
              <StackItem title="Terms" value={selectedOrder?.terms} />
              <StackItem
                title="Quantity"
                value={`${selectedOrder?.quantity} 20ft Container`}
              />
              <StackItem
                title="Requested Date"
                value={selectedOrder?.requestedDate}
              />
            </SectionItem>

            {ORDER_STATUS_STEPS[selectedOrder?.status] > 2 && (
              <SectionItemCollapsable sectionTitle="Buyer Details">
                <StackItem
                  title="Full Name"
                  value={`${selectedOrder?.buyer?.firstName} ${selectedOrder?.buyer?.lastName}`}
                />
                <StackItem capitalize={false} title="Email" value={selectedOrder?.buyer?.email} />
                <StackItem
                  title="Mobile"
                  value={`+${selectedOrder?.buyer?.mobileNo}`}
                />
              </SectionItemCollapsable>
            )}

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
        openDialog={openConfirmDialog}
        toggleOpenDialog={toggleOpenConfirmDialog}
        dialogTitle="Do you want to confirm this order?"
      >
        <Button1
          color="inherit"
          variant="text"
          onClick={toggleOpenConfirmDialog(false)}
          disabled={dialogButtonLoading}
        >
          No
        </Button1>
        <Button1
          variant="text"
          color="inherit"
          onClick={dialogActionConfirm_Yes}
          loading={dialogButtonLoading}
        >
          Yes
        </Button1>
      </MuiDialog>

      <MuiDialog
        openDialog={openRejectDialog}
        toggleOpenDialog={toggleOpenRejectDialog}
        dialogTitle="Do you want to reject this order?"
      >
        <Button1
          onClick={toggleOpenRejectDialog(false)}
          variant="text"
          color="inherit"
        >
          No
        </Button1>
        <Button1
          onClick={dialogActionReject_Yes}
          loading={dialogButtonLoading}
          variant="text"
          color="inherit"
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
