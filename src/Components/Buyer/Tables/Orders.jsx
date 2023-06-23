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
import { checkConfirmation } from "../../Functions";
import "../../../Styles/v2/Orders.css";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const Orders = () => {
  const [rows, setRows] = useState([]);
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
  const toggleOpenConfirmForm = (open) => () => {
    setOpenConfirmForm(open);
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
              <div className="simple-center-div primary-tae-color">
                <CircularProgress color="inherit" size={20} />
              </div>
            )
          ) : (
            <MuiMoreV1>
              <MenuItem onClick={handleOpenOrdersView(row.id, row.ref)}>
                View
              </MenuItem>
              {row.confirmedStatus && (
                <MenuItem onClick={toggleOpenConfirmForm(true)}>
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
  }, []);

  return (
    <main>
      <DrawerModal
        boxStyle={xMediumBox}
        openState={openOrdersView}
        toggleOpenState={toggleOpenOrdersView}
        title="Orders Details"
      >
        {selectedOrders && (
          <Box>
            <MuiTableV2
              checkboxSelection={false}
              rows={selectedOrders}
              columns={columnsOrders}
            />
          </Box>
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
              <SectionItem sectionTitle="Merchant Information">
                <StackItem title="Name" value={selectedOrder?.merchant?.name} />
                <StackItem
                  title="Email"
                  value={selectedOrder?.merchant?.email}
                />
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
                <Stack paddingY={1} direction="column" width="100%" spacing={2}>
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
        <Stack direction="column" spacing={2}>
          <Stack
            className="order_confirmation_note"
            direction="row"
            alignContent="center"
            spacing={1}
          >
            <div>
              <InfoOutlinedIcon />
            </div>
            <div>Please fill all required fields</div>
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
