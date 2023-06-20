import { useEffect, useState } from "react";
import BuyerService from "../../../Services/Buyer";
import Countdown from "../../Countdown";
import { MuiMoreV1 } from "../../More";
import DrawerModal from "../../v2/components/DrawerModal";
import { Box, Stack, MenuItem } from "@mui/material";
import { wideBox, xMediumBox } from "../../../Styles/v2/box";
import { MuiTableV1, MuiTableV2 } from "../../v2/components/Table";
import MuiBadge from "../../v2/components/Badge";
import { SectionItem, StackItem } from "../../v2/components/Lists";
import {
  SmallPrimary,
  SmallSecondaryV2,
} from "../../../Material/Button";
import OfferTable from "../../v2/components/OfferTable";
import { setAlert } from "../../../Redux/Features/Alert";
import { useDispatch } from "react-redux";
import { ErrorOutline } from "@mui/icons-material/";
import { MuiLinearProgress } from "../../v2/components/LinearProgress";

const Requests = () => {
  const rootDispatch = useDispatch();
  const [rows, setRows] = useState([]);
  const [rowsLoading, setRowsLoading] = useState(false);
  const [reloadTable, setReloadTable] = useState(false);

  const [buyerRequestedQuantity, setBuyerRequestedQuantity] = useState(null);

  const [rowButtonState, setRowButtonState] = useState({
    id: null,
    loading: false,
  });

  const [selectedRequest, setSelectedRequest] = useState(null);
  const [openRequestView, setOpenRequestView] = useState(false);
  const toggleOpenRequestView = (open) => () => {
    setOpenRequestView(open);
    !open && setSelectedRequest(null);
  };
  const handleOpenRequestView = (id) => () => {
    const request = rows.find((row) => row.id === id);
    setSelectedRequest(request);
    setOpenRequestView(true);
  };

  const [selectedOffers, setSelectedOffers] = useState(null);
  const [openOffersView, setOpenOffersView] = useState(false);
  const toggleOpenOffersView = (open) => () => {
    setOpenOffersView(open);
    if (!open) {
      setSelectedOffers(null);
      setBuyerRequestedQuantity(null);
    }
  };
  const handleOpenOffersView = (id, quantity) => () => {
    setBuyerRequestedQuantity(quantity);
    const fetchData = async () => {
      setRowButtonState({
        id: id,
        loading: true,
      });
      const buyerService = new BuyerService();
      try {
        const { data, errors } = await buyerService.getOffers(id);
        if (errors.length === 0) {
          const filteredData = data.data.data.map((offers, index) => {
            const quotationProduct = offers?.request?.quotationProducts?.at(0);
            return {
              id: offers?.id,
              index: index + 1,
              companyName: offers?.merchant?.companyName,
              productName: quotationProduct?.product?.name,
              offers: offers?.buyerQuotationRequestIncoterm,
              quantity: offers?.offerQuantity,
              terms: offers?.request?.buyerQuotationIncoterm?.label,
              destination: offers?.request?.destination,
              date: new Date(offers?.createdOn).toDateString(),
              merchant: {
                id: offers?.merchant?.id,
                name: `${offers?.merchant?.firstName} ${offers?.merchant?.lastName}`,
              },
            };
          });
          setSelectedOffers(filteredData);
          setOpenOffersView(true);
        }
      } catch (error) {
        throw error;
      }
      setRowButtonState({
        id: null,
        loading: false,
      });
    };
    fetchData();
  };

  const [selectedOffer, setSelectedOffer] = useState(null);
  const [openOfferView, setOpenOfferView] = useState(false);
  const toggleOpenOfferView = (open) => () => {
    setOpenOfferView(open);
    !open && setSelectedOffer(null);
  };
  const handleOpenOfferView = (id, offerRows, requestSummary) => () => {
    const fetchData = async () => {
      setRowButtonState({
        id,
        loading: true,
      });
      const buyerService = new BuyerService();
      try {
        const { data, errors } = await buyerService.getCompany(id);
        if (errors.length === 0) {
          const filteredData = data.data.data.map((company) => {
            return {
              companyName: company?.user?.companyName,
              businessType: company?.type?.label,
              memberSince: company?.user?.createdOn,
              establishedYear: company?.company?.year,
              numEmployees: company?.company?.noOfEmployees,
              supplyAbility: company?.company?.supplyAbility,
              address: company?.address,
              city: company?.city,
              offerRows,
              requestSummary,
            };
          });
          setSelectedOffer(filteredData.at(0));
          setOpenOfferView(true);
        }
      } catch (error) {
        throw error;
      }
      setRowButtonState({
        id: null,
        loading: false,
      });
    };
    fetchData();
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
    { field: "requestNo", headerName: "Request #", width: 100 },
    { field: "productName", headerName: "Product", width: 150 },
    { field: "origin", headerName: "Origin", width: 100 },
    { field: "destination", headerName: "Destination", width: 100 },
    { field: "quantity", headerName: "Quantity", width: 100 },
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
      field: "offersTotalCount",
      headerName: "",
      width: 50,
      renderCell: ({ row }) => (
        <Stack direction="row" justifyContent="center" sx={{ width: "100%" }}>
          <MuiBadge
            loading={rowButtonState?.id === row.id && rowButtonState?.loading}
            onClick={handleOpenOffersView(row.id, row.quantity)}
            offersTotalCount={row.offersTotalCount}
          />
        </Stack>
      ),
    },
    {
      field: "actions",
      headerName: "",
      width: 50,
      renderCell: ({ row }) => (
        <Stack direction="row" justifyContent="center" sx={{ width: "100%" }}>
          <MuiMoreV1>
            <MenuItem onClick={handleOpenRequestView(row.id)}>View</MenuItem>
          </MuiMoreV1>
        </Stack>
      ),
    },
  ];

  const columnsOffers = [
    { field: "index", headerName: "Number", width: 80 },
    // { field: "productName", headerName: "Product", width: 150 },
    { field: "companyName", headerName: "Company", width: 110 },
    // { field: "date", headerName: "Date", width: 100 },
    { field: "quantity", headerName: "Quantity", width: 100 },
    {
      field: "action",
      headerName: "",
      width: 90,
      renderCell: ({ row }) => {
        const requestSummary = {
          productName: row?.productName,
          merchantName: row?.merchant?.name,
          terms: row?.terms,
          destination: row?.destination,
        };
        return (
          <SmallPrimary
            variant="contained"
            loading={
              row?.merchant?.id === rowButtonState.id && rowButtonState.loading
            }
            onClick={handleOpenOfferView(
              row?.merchant?.id,
              row?.offers,
              requestSummary
            )}
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
        const { data, errors } = await buyerService.getRequests(
          abortController.signal
        );
        if (errors.length === 0) {
          const unfilteredData = data.data.data;
          const filteredData = await Promise.all(
            unfilteredData.map(async (request, index) => {
              const getOffersTotalCount = async () => {
                let offersTotalCount = 0;
                const { data, errors } = await buyerService.getOffersTotalCount(
                  request?._id
                );
                if (errors.length === 0) {
                  offersTotalCount = data.data.totalCount;
                }
                return offersTotalCount;
              };
              const quotationProduct = request?.quotationProducts?.at(0);
              return {
                index: index + 1,
                id: request?._id,
                requestNo: request?.requestNo,
                expiryDate: request?.expiryDate,
                destination: request?.destination,
                offersTotalCount: await getOffersTotalCount(),
                productName: quotationProduct?.product?.name,
                origin: quotationProduct?.product?.origin?.country,
                quantity: quotationProduct?.specification?.quantity,
                validity: request?.validity,
                port: request?.port,
                incoterm: request?.buyerQuotationIncoterm?.label,
                species: quotationProduct?.product?.species?.label,
                speciesType: quotationProduct?.product?.species?.type?.label,
                containerSize:
                  quotationProduct?.product?.supportedShippingContainers[0]
                    ?.label,
                specification: {
                  length: quotationProduct?.specification?.length,
                  lengthUnit: quotationProduct?.specification?.lengthUnit,
                  diameter: quotationProduct?.specification?.diameter,
                  diameterUnit: quotationProduct?.specification?.diameterUnit,
                },
              };
            })
          );
          setRows(filteredData);
        }
      } catch (error) {
        throw error;
      }
      setRowsLoading(false);
    };
    fetchData();
  }, [reloadTable]);

  const RequestView = () => {
    return (
      selectedRequest && (
        <Box>
          <div>
            <SectionItem sectionTitle="Product Information">
              <StackItem title="Product" value={selectedRequest?.productName} />
              <StackItem title="Species" value={selectedRequest?.species} />
              <StackItem
                title="Type Of Species"
                value={selectedRequest?.speciesType}
              />
              <StackItem title="Origin" value={selectedRequest?.origin} />
              <StackItem
                title="Container Size"
                value={selectedRequest?.containerSize}
              />
            </SectionItem>

            <SectionItem sectionTitle="Specifications">
              <StackItem title="Length" value={selectedRequest?.productName} />
              <StackItem
                title="Diameter"
                value={`${selectedRequest?.specification?.diameter} ${selectedRequest?.specification?.diameterUnit}`}
              />
              <StackItem
                title="Quantity"
                value={`${selectedRequest?.quantity} 20ft Container`}
              />
            </SectionItem>

            <SectionItem sectionTitle="Pricing and Delivery Information">
              <StackItem title="Incoterm" value={selectedRequest?.incoterm} />
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
                title="Validaity"
                value={`${selectedRequest?.validity} Days`}
              />
            </SectionItem>
          </div>
        </Box>
      )
    );
  };

  const OffersView = () => {
    const [loading, setLoading] = useState(false);
    const [selectedModelQuantity, setSelectedModelQuantity] = useState(0);
    const handleSelectionModel = (model) => {
      const totalCount =
        selectedOffers &&
        selectedOffers
          .filter((offer) => model.find((id) => id === offer.id))
          .map((filterdOffer) => filterdOffer.quantity)
          .reduce((a, b) => a + b, 0);
      setSelectedModelQuantity(totalCount);
    };

    const handleAcceptOrder = () => {
      const doAction = async () => {
        setLoading(true);
        const buyerService = new BuyerService();
        try {
          const { errors } = await buyerService.acceptOffer();
          if (errors.length === 0) {
            setOpenOffersView(false);
            setSelectedOffers(null);
            setReloadTable((prev) => !prev);
            triggerSnackBarAlert(
              "Your order was successfully placed",
              "success"
            );
          }
        } catch (error) {
          throw error;
        }
        setLoading(false);
      };
      doAction();
    };

    return (
      selectedOffers && (
        <Box>
          <Stack
            direction="row"
            alignItems="flex-start"
            className="request_placing_order_note"
            spacing={2}
            marginBottom={1}
          >
            <ErrorOutline fontSize="small" color="inherit" />
            <small>
              The total quantity of the offers you select must be equal to your
              requested quantity
            </small>
          </Stack>

          <Stack width={"100%"} spacing={1} marginBottom={2}>
            <MuiLinearProgress
              value={selectedModelQuantity}
              completedValue={buyerRequestedQuantity}
            />
          </Stack>

          <MuiTableV2
            rows={selectedOffers}
            columns={columnsOffers}
            handleSelectionModel={handleSelectionModel}
          />
          <Stack>
            <SmallSecondaryV2
              variant="contained"
              onClick={handleAcceptOrder}
              loading={loading}
              disabled={selectedModelQuantity !== buyerRequestedQuantity}
            >
              Place Order
            </SmallSecondaryV2>
          </Stack>
        </Box>
      )
    );
  };

  const OfferView = () => {
    return (
      selectedOffer && (
        <Box>
          <div>
            <SectionItem sectionTitle="Request Summary">
              <StackItem
                title="Product Name"
                value={selectedOffer?.requestSummary?.productName}
              />
              <StackItem
                title="Terms"
                value={selectedOffer?.requestSummary?.terms}
              />
              <StackItem
                title="Destination"
                value={selectedOffer?.requestSummary?.destination}
              />
            </SectionItem>

            <SectionItem sectionTitle="Offer Table">
              <OfferTable
                offerRows={selectedOffer?.offerRows}
                product={selectedOffer?.requestSummary?.productName}
                incoterm={selectedOffer?.requestSummary?.terms}
              />
            </SectionItem>

            <SectionItem sectionTitle="Company Profile">
              <StackItem
                title="Merchant Name"
                value={selectedOffer?.requestSummary?.merchantName}
              />
              <StackItem title="Company" value={selectedOffer?.companyName} />
              <StackItem title="Address" value={selectedOffer?.address} />
              <StackItem title="City" value={selectedOffer?.city} />
              <StackItem
                title="Member Since"
                value={selectedOffer?.memberSince}
              />
              <StackItem
                title="Business Type"
                value={selectedOffer?.businessType}
              />
              <StackItem
                title="Number of Employees"
                value={selectedOffer?.numEmployees}
              />
              <StackItem
                title="Supply Ability"
                value={selectedOffer?.supplyAbility}
              />
            </SectionItem>
          </div>
        </Box>
      )
    );
  };

  return (
    <main>
      <DrawerModal
        boxStyle={wideBox}
        openState={openRequestView}
        toggleOpenState={toggleOpenRequestView}
        title="Request Details"
      >
        <RequestView />
      </DrawerModal>

      <DrawerModal
        boxStyle={xMediumBox}
        openState={openOffersView}
        toggleOpenState={toggleOpenOffersView}
        title="Offers Details"
      >
        <OffersView />
      </DrawerModal>

      <DrawerModal
        boxStyle={wideBox}
        openState={openOfferView}
        toggleOpenState={toggleOpenOfferView}
        title="Offer Details"
      >
        <OfferView />
      </DrawerModal>

      <MuiTableV1
        label=""
        rows={rows}
        columns={columns}
        rowsLoading={rowsLoading}
      />
    </main>
  );
};

export default Requests;
// import { DataGrid } from "@mui/x-data-grid";
// import LinearProgress from "@mui/material/LinearProgress";
// import Toolbar from "../../../Material/Toolbar";
// import { SmallPrimary, SmallSecondary } from "../../../Material/Button";
// import SwipeableDrawer from "@mui/material/SwipeableDrawer";
// import { useState, useEffect } from "react";
// import Box from "@mui/material/Box";
// import { Puller } from "../../../Material/Drawer";
// import BuyerService from "../../../Services/Buyer";
// import Countdown from "../../Countdown";
// import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
// import { StyledBadge } from "../../../Material/Badge";
// import IconButton from "@mui/material/IconButton";
// import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
// import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
// import { useReducer } from "react";
// import { INITIAL_STATE, formReducer } from "../../../Reducers/FormReducer";
// import {
//   REQUEST_FAILED,
//   REQUEST_SUCCESSFUL,
//   SEND_REQUEST,
// } from "../../../Reducers/Actions";
// import Tooltip from "@mui/material/Tooltip";
// import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
// import { useDispatch } from "react-redux";
// import { setAlert } from "../../../Redux/Features/Alert.js";
// import Modal from "@mui/material/Modal";
// import { inAppWide, inAppWider } from "../../../Styles/Modal";
// import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
// import Overlay from "../../../Material/Overlay";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogTitle from "@mui/material/DialogTitle";
// import { Transition } from "../../../Material/Dialog";
// import {
//   GenericSecondary,
//   GenericPrimaryButton,
// } from "../../../Material/Button";
// import { inAppDialog } from "../../../Styles/Dialog";

// const PRODUCTS = {
//   TEAK_SQUARE_LOGS: "Teak Square Logs",
//   TEAK_ROUND_LOGS: "Teak Round Logs",
// };

// const selectedQuantityStatus = (total, requested) => {
//   if (total === requested) {
//     return "good-selected";
//   } else if (total > requested) {
//     return "default-selected";
//   } else {
//     return "default-selected";
//   }
// };

// const Requests = () => {
//   const [totalSelected, setTotalSelected] = useState(0);
//   const [requestedQuantity, setRequestedQuantity] = useState(0);
//   const [offerSelections, setOfferSelections] = useState([]);
//   const [canPlaceOrder, setCanPlaceOrder] = useState(false);
//   const [viewOfferLoading, setViewOfferLoading] = useState(false);
//   const rootDispatch = useDispatch();
//   const [refreshTable, setRefreshTable] = useState(false);
//   const [companyProfile, setCompanyProfile] = useState(null);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const open = Boolean(anchorEl);
//   const [state, dispatch] = useReducer(formReducer, INITIAL_STATE);
//   const [revealCompanyProfile, setRevealCompanyProfile] = useState(false);
//   const toggleCompanyProfile = (open) => (_event) => {
//     setRevealCompanyProfile(open);
//   };

//   const iOS =
//     typeof navigator !== "undefined" &&
//     /iPad|iPhone|iPod/.test(navigator.userAgent);
//   const [rows, setRows] = useState([]);
//   const [rowsLoading, setRowsLoading] = useState(false);
//   const [pageSize, setPageSize] = useState(10);

//   const [selectedRequestId, setSelectedRequestId] = useState(null);
//   const selectRequest = (id) => setSelectedRequestId(id);
//   const selectedRequest =
//     rows && rows.find((row) => row.id === selectedRequestId);

//   const [openDrawer, setOpenDrawer] = useState(false);
//   const toggleDrawer = (open) => (_event) => {
//     setOpenDrawer(open);
//   };
//   const handleCloseDrawer = () => {
//     setOpenDrawer(false);
//     setSelectedRequestId(null);
//   };

//   const [openDialogConfirm, setOpenDialogConfirm] = useState(false);
//   const handleClickOpenDialogConfirm = () => {
//     setOpenDialogConfirm(true);
//   };
//   const handleCloseDialogConfirm = () => {
//     setOpenDialogConfirm(false);
//   };

//   const [selectedOffers, setSelectedOffers] = useState(null);
//   const handleSelectRequestOffers = (offers, requestedQuantity) => {
//     setRequestedQuantity(requestedQuantity);
//     const _offers = offers.map((_offer) => {
//       return {
//         id: _offer?.id,
//         index: _offer?.index,
//         company: _offer?.merchant?.companyName,
//         expiryDate: _offer?.expiryDate,
//         destination: _offer?.destination,
//         quantity: _offer?.offerQuantity,
//         requestNo: _offer?.requestNo,
//         offer: _offer,
//       };
//     });

//     setSelectedOffers(_offers);
//     setOpenDrawerOffers(true);
//   };
//   const [openDrawerOffers, setOpenDrawerOffers] = useState(false);
//   const toggleDrawerOffers = (open) => (_event) => {
//     setOpenDrawerOffers(open);
//   };
//   const handleCloseDrawerOffers = () => {
//     setOpenDrawerOffers(false);
//     setSelectedOffers(null);
//   };

//   const [selectedOffer, setSelectedOffer] = useState(null);
//   const handleSelectRequestOffer = async (offer) => {
//     setViewOfferLoading(true);
//     const { id } = offer.merchant;
//     const buyerService = new BuyerService();
//     try {
//       const { errors, data } = await buyerService.getCompany(id);
//       if (errors.length === 0) {
//         const filteredData = data.data.data;
//         filteredData.map((company) => {
//           company.businessType = company.type.label;
//           company.memberSince = new Date(company.type.createdOn)
//             .toUTCString()
//             .slice(0, 16);
//           company.yearEstablished = company.company.year;
//           company.employees = company.company.noOfEmployees;
//           company.supplyAbility = company.company.supplyAbility;
//           return 1;
//         });
//         setSelectedOffer(offer);
//         setOpenDrawerOffer(true);
//         setCompanyProfile(filteredData[0]);
//       }
//     } catch (error) {}
//     setViewOfferLoading(false);
//   };
//   const [openDrawerOffer, setOpenDrawerOffer] = useState(false);
//   const toggleDrawerOffer = (open) => (_event) => {
//     setOpenDrawerOffer(open);
//   };
//   const handleCloseDrawerOffer = () => {
//     setOpenDrawerOffer(false);
//     setSelectedOffer(null);
//     setRevealCompanyProfile(false);
//   };

//   const handleClick = (event, id) => {
//     setAnchorEl(event.currentTarget);
//     selectRequest(id);
//   };
//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const handleMultipleSelect = (offeringIds) => {
//     const selections = selectedOffers.filter((offer) =>
//       offeringIds.includes(offer.id)
//     );
//     const userSelection = selections.map((offer) => {
//       return {
//         offerID: offer.id,
//         merchantID: offer.offer.merchant.id,
//         orderQuantity: offer.quantity,
//       };
//     });

//     const handleRequestedQuantity = () => {
//       const totalSelectedOfferQuantity = userSelection.reduce(
//         (previousVal, currentVal) => {
//           return previousVal + currentVal.orderQuantity;
//         },
//         0
//       );

//       setTotalSelected(totalSelectedOfferQuantity);

//       if (totalSelectedOfferQuantity === requestedQuantity) {
//         setCanPlaceOrder(true);
//         setOfferSelections(userSelection);
//       } else {
//         setCanPlaceOrder(false);
//         setOfferSelections([]);
//       }
//     };

//     handleRequestedQuantity();
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
//           <IconButton onClick={(event) => handleClick(event, id)} size="small">
//             <MoreHorizIcon />
//           </IconButton>
//         </Tooltip>
//       </Box>
//     </div>
//   );

//   const columns = [
//     { field: "index", headerName: "Number", width: 80 },
//     { field: "requestNo", headerName: "Request #", width: 100 },
//     { field: "product", headerName: "Product", width: 150 },
//     { field: "quantity", headerName: "Quantity", width: 100 },
//     {
//       field: "timeLeft",
//       headerName: "Time Left",
//       width: 100,
//       renderCell: ({ row }) => (
//         <div>
//           {" "}
//           <Countdown endDate={row.expiryDate} />{" "}
//         </div>
//       ),
//     },
//     {
//       field: "totalOffers",
//       headerName: "Offers",
//       width: 100,
//       renderCell: ({ row }) => (
//         <div>
// <IconButton
//   disabled={row.offers.length === 0}
//   onClick={() => handleSelectRequestOffers(row.offers, row.quantity)}
//   aria-label="cart"
// >
//   <StyledBadge
//     showZero
//     badgeContent={row.offers.length}
//     color="primary"
//   >
//     <RequestQuoteIcon />
//   </StyledBadge>
// </IconButton>
//         </div>
//       ),
//     },
//     {
//       field: "more",
//       headerName: "",
//       width: 30,
//       renderCell: ({ row }) => (
//         <div className="simple-center-div">
//           <More id={row.id} />
//         </div>
//       ),
//     },
//   ];

//   const columnsOffers = [
//     { field: "index", headerName: "Number", width: 150 },
//     { field: "company", headerName: "Company", width: 200 },
//     { field: "quantity", headerName: "Quantity", width: 150 },
//     { field: "expiryDate", headerName: "Date", width: 150 },
//     {
//       field: "more",
//       headerName: "",
//       width: 80,
//       renderCell: ({ row }) => (
//         <SmallPrimary
//           disabled={viewOfferLoading}
//           onClick={() => handleSelectRequestOffer(row?.offer)}
//           size="small"
//           variant="contained"
//         >
//           View
//         </SmallPrimary>
//       ),
//     },
//   ];

//   const handleOrderSubmit = async () => {
//     dispatch({ type: SEND_REQUEST });
//     const buyerService = new BuyerService();

//     try {
//       const { errors } = await buyerService.acceptOffer(offerSelections);
//       if (errors.length === 0) {
//         dispatch({ type: REQUEST_SUCCESSFUL });
//         handleSuccessfullRequest("Your order was successfully placed", 3000);
//         setRefreshTable((prev) => !prev);
//         handleCloseDrawerOffers();
//         handleCloseDrawerOffer();
//       } else {
//         dispatch({ type: REQUEST_FAILED });
//         handleFailedRequest(
//           "Order could not be processed, please try again",
//           5000
//         );
//       }
//     } catch (error) {}
//   };

//   const handleRepost = async () => {
//     dispatch({ type: SEND_REQUEST });
//     const { id } = selectedRequest;
//     const buyerService = new BuyerService();
//     try {
//       const { errors } = await buyerService.repostRequest(id);
//       if (errors.length === 0) {
//         dispatch({ type: REQUEST_SUCCESSFUL });
//         handleSuccessfullRequest(
//           "Your request has been reposted successfully",
//           3000
//         );
//         handleCloseDialogConfirm();
//         setRefreshTable((prev) => !prev);
//       } else {
//         dispatch({ type: REQUEST_FAILED });
//         handleFailedRequest(
//           "Problem processing request, please try again",
//           5000
//         );
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

//   const list = () =>
//     selectedRequest && (
//       <Box role="presentation">
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
//                     {selectedRequest.quantity} {selectedRequest.containerSize}
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
//               <div className="request-section-body">
//                 <div>
//                   <span>Validity:</span>
//                   <span>{selectedRequest.validity} days</span>
//                 </div>
//               </div>
//             </section>
//           </div>
//         </div>
//       </Box>
//     );

//   const listOffers = () =>
//     selectedOffers && (
//       <Box role="presentation">
//         <div>
//           <div className="offers-data-grid-container">
//             {selectedOffers && selectedOffers.length > 0 && (
//               <div className="selected-quantities-offers">
//                 <div>
//                   {"(*)"} Select offers to satisfy your requested quantity
//                 </div>
//                 <div
//                   className={selectedQuantityStatus(
//                     totalSelected,
//                     requestedQuantity
//                   )}
//                 >{`[${totalSelected} / ${requestedQuantity} selected quantity]`}</div>
//               </div>
//             )}

//             <DataGrid
//               components={{
//                 LoadingOverlay: LinearProgress,
//                 NoRowsOverlay: () => <Overlay label="Offers" />,
//               }}
//               className="offers-standard-table"
//               checkboxSelection
//               disableSelectionOnClick
//               rows={selectedOffers}
//               columns={columnsOffers}
//               density="compact"
//               onSelectionModelChange={handleMultipleSelect}
//               pageSize={5}
//               rowsPerPageOptions={[5]}
//             />
//           </div>

//           {selectedOffers && selectedOffers.length > 0 && (
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "center",
//               }}
//             >
//               <SmallSecondary
//                 disabled={!canPlaceOrder}
//                 loading={state.requestState.loading}
//                 onClick={handleOrderSubmit}
//                 variant="contained"
//               >
//                 Place Order
//               </SmallSecondary>
//             </div>
//           )}
//         </div>
//       </Box>
//     );

//   const listOffer = () =>
//     selectedOffer && (
//       <Box role="presentation">
//         <div className="requests-sections-body">
//           <div className="requests-section-title">Request Summary</div>
//           <section className="view-offer-company-profile-section">
//             <div>
//               <span>Request:</span>{" "}
//               <span>Request {selectedOffer.requestNo}</span>
//             </div>
//             <div>
//               <span>Product:</span> <span>{selectedOffer.product}</span>
//             </div>
//             <div>
//               <span>Terms:</span> <span>{selectedOffer.terms}</span>
//             </div>
//             <div>
//               <span>Merchant:</span>{" "}
//               <span>
//                 {selectedOffer.merchant.firstName}{" "}
//                 {selectedOffer.merchant.lastName}
//               </span>
//             </div>
//             <div>
//               <span>Company:</span>{" "}
//               <span>{selectedOffer.merchant.companyName}</span>
//             </div>
//             <div>
//               <span>Destination:</span> <span>{selectedOffer.destination}</span>
//             </div>
//           </section>

//           <section>
//             <div>
//               {/* <div className="requests-section-title">Incoterm</div> */}
//               <div className="incoterm-settings-table-container">
//                 <table>
//                   <thead>
//                     <tr className="incoterm-setting-heading-container">
//                       <th>Number</th>
//                       {selectedOffer.product === "Teak Round Logs" &&
//                         selectedOffer.terms !== "FOB" && <th>Diameter (cm)</th>}
//                       <th>CBM</th>
//                       <th>Price per CBM</th>
//                       <th>Pieces/container</th>
//                       <th>Price/container</th>
//                       <th>Total price</th>
//                       {selectedOffer.terms === "CIF" && <th>Insurance</th>}
//                       {selectedOffer.terms !== "FOB" && <th>Total Freight</th>}
//                       <th>Total amount</th>
//                     </tr>
//                   </thead>

//                   <tbody>
//                     {selectedOffer.incotermRows.length > 0 ? (
//                       selectedOffer?.incotermRows.map((incoterm, index) => (
//                         <tr key={index + 1}>
//                           <td>
//                             <input disabled defaultValue={index + 1} />
//                           </td>
//                           {selectedOffer.product === "Teak Round Logs" &&
//                             selectedOffer.terms !== "FOB" && (
//                               <td>
//                                 <input
//                                   disabled
//                                   defaultValue={incoterm.diameter}
//                                 />
//                               </td>
//                             )}
//                           <td>
//                             <input disabled defaultValue={incoterm?.cbm} />
//                           </td>
//                           <td>
//                             <input disabled defaultValue={incoterm?.cbmprice} />
//                           </td>
//                           <td>
//                             <input
//                               disabled
//                               defaultValue={incoterm?.noOfPieces}
//                             />
//                           </td>
//                           <td>
//                             <input disabled defaultValue={incoterm?.price} />
//                           </td>
//                           <td>
//                             <input
//                               disabled
//                               defaultValue={incoterm?.totalPrice}
//                             />
//                           </td>
//                           {selectedOffer.terms === "CIF" && (
//                             <td>
//                               <input
//                                 disabled
//                                 defaultValue={incoterm?.insurance}
//                               />
//                             </td>
//                           )}
//                           {selectedOffer.terms !== "FOB" && (
//                             <td>
//                               <input
//                                 disabled
//                                 defaultValue={incoterm?.costOfFreight}
//                               />
//                             </td>
//                           )}
//                           <td>
//                             <input
//                               disabled
//                               defaultValue={incoterm.totalAmount}
//                             />
//                           </td>
//                         </tr>
//                       ))
//                     ) : (
//                       <tr>
//                         <td>
//                           <input disabled defaultValue="--" />
//                         </td>
//                         {selectedOffer.terms !== "FOB" && (
//                           <td>
//                             <input disabled defaultValue="--" />
//                           </td>
//                         )}
//                         <td>
//                           <input disabled defaultValue="--" />
//                         </td>
//                         <td>
//                           <input disabled defaultValue="--" />
//                         </td>
//                         <td>
//                           <input disabled defaultValue="--" />
//                         </td>
//                         <td>
//                           <input disabled value="--" />
//                         </td>
//                         <td>
//                           <input disabled value="--" />
//                         </td>
//                         {selectedOffer.terms === "CIF" && (
//                           <td>
//                             <input disabled defaultValue="--" />
//                           </td>
//                         )}
//                         {selectedOffer.terms !== "FOB" && (
//                           <td>
//                             <input disabled defaultValue="--" />
//                           </td>
//                         )}
//                         <td>
//                           <input disabled defaultValue="--" />
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//               <div className="incoterm-settings-table-note-container">
//                 Kindly note that all prices are quoted in ($)
//               </div>
//             </div>
//           </section>

//           <section className="request-offer-company-profile-section">
//             <div>
//               <div>Company Profile</div>
//               {!revealCompanyProfile ? (
//                 <IconButton onClick={toggleCompanyProfile(true)}>
//                   <ArrowDropDownIcon />
//                 </IconButton>
//               ) : (
//                 <IconButton onClick={toggleCompanyProfile(false)}>
//                   <ArrowDropUpIcon />
//                 </IconButton>
//               )}
//             </div>

//             {revealCompanyProfile && companyProfile && (
//               <div>
//                 <div>
//                   <span>Business Type</span>
//                   <span>{companyProfile.businessType}</span>
//                 </div>
//                 <div>
//                   <span>Member Since</span>
//                   <span>{companyProfile.memberSince}</span>
//                 </div>
//                 <div>
//                   <span>Year Established</span>
//                   <span>{companyProfile.yearEstablished}</span>
//                 </div>
//                 <div>
//                   <span>No of Employees</span>
//                   <span>{companyProfile.employees}</span>
//                 </div>
//                 <div>
//                   <span>Products</span>{" "}
//                   <span>
//                     {companyProfile.subscription.map((product, index) => (
//                       <span key={index} className="special-products-container">
//                         <span>
//                           {product.product}{" "}
//                           {companyProfile.subscription.length !== index + 1 &&
//                             "& "}
//                         </span>
//                       </span>
//                     ))}
//                   </span>{" "}
//                 </div>
//                 <div>
//                   <span>Supply Ability</span>
//                   <span>{companyProfile.supplyAbility}</span>
//                 </div>
//               </div>
//             )}
//           </section>
//         </div>
//       </Box>
//     );

//   useEffect(() => {
//     const abortController = new AbortController();
//     const fetchData = async () => {
//       setRowsLoading(true);
//       const buyerService = new BuyerService();
//       try {
//         const { data, errors } = await buyerService.getRequests(
//           abortController.signal
//         );
//         if (errors.length === 0) {
//           const filteredData = data.data.data;
//           await Promise.all(
//             filteredData.map(async (request, index) => {
//               request.index = index + 1;
//               request.id = request._id;
//               request.product = request.quotationProducts[0].product.name;
//               request.terms = request.buyerQuotationIncoterm.label;
//               request.quantity =
//                 request.quotationProducts[0].specification.quantity;
//               request.diameter =
//                 request?.quotationProducts[0]?.specification?.diameter;
//               request.diameterUnit =
//                 request?.quotationProducts[0]?.specification?.diameterUnit;
//               request.drying =
//                 request?.quotationProducts[0]?.specification?.drying?.label;
//               request.length =
//                 request?.quotationProducts[0]?.specification.length;
//               request.thickness =
//                 request?.quotationProducts[0]?.specification.thickness;
//               request.width = request.quotationProducts[0].specification.width;
//               request.lengthUnit =
//                 request?.quotationProducts[0]?.specification?.lengthUnit;
//               request.thicknessUnit =
//                 request.quotationProducts[0].specification.thicknessUnit;
//               request.widthUnit =
//                 request?.quotationProducts[0]?.specification?.widthUnit;
//               request.species =
//                 request.quotationProducts[0].product.species.label;
//               request.speciesType =
//                 request.quotationProducts[0].product.species.type.label;
//               request.origin =
//                 request.quotationProducts[0].product.origin.country;
//               request.containerSize =
//                 request.quotationProducts[0].product.supportedShippingContainers[0].label;
//               request.volume =
//                 request.quotationProducts[0].product.volume.value;
//               request.volumeUnit =
//                 request.quotationProducts[0].product.volume.unit;
//               request.expiryDate = new Date(request.expiryDate)
//                 .toUTCString()
//                 .slice(0, 25);
//               request.offers = (
//                 await (
//                   await buyerService.getOffers(request._id)
//                 ).data.data.data
//               ).map((offer, index) => {
//                 offer.index = index + 1;
//                 offer.requestId = request._id;
//                 offer.product = offer.request.quotationProducts[0].product.name;
//                 offer.destination = offer.request.destination;
//                 offer.incotermRows = offer.buyerQuotationRequestIncoterm;
//                 offer.requestNo = offer.request.requestNo;
//                 offer.terms = offer.request.buyerQuotationIncoterm.label;
//                 offer.expiryDate = new Date(offer.createdOn)
//                   .toUTCString()
//                   .slice(0, 16);
//                 offer.merchant = {
//                   firstName: offer.merchant.firstName,
//                   lastName: offer.merchant.lastName,
//                   email: offer.merchant.email,
//                   mobileNo: offer.merchant.mobileNo,
//                   companyName: offer.merchant.companyName,
//                   role: offer.merchant.role,
//                   id: offer?.merchant?.id,
//                 };
//                 return offer;
//               });
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
//     <div className="Requests-Table">
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
//           <DialogTitle>{"Repost this request?"}</DialogTitle>
//           <DialogActions>
//             <GenericSecondary variant="text" onClick={handleCloseDialogConfirm}>
//               No
//             </GenericSecondary>
//             <GenericPrimaryButton
//               variant="contained"
//               loading={state.requestState.loading}
//               onClick={handleRepost}
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
//           <Box sx={inAppWide}>
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
//         <Modal
//           open={openDrawerOffers}
//           onClose={handleCloseDrawerOffers}
//           aria-labelledby="modal-modal-title"
//           aria-describedby="modal-modal-description"
//           className="modal-container"
//         >
//           <Box sx={inAppWider}>
//             <div className="modal-title-container">
//               <div>Offers List</div>
//               <div>
//                 <CloseRoundedIcon onClick={handleCloseDrawerOffers} />
//               </div>
//             </div>

//             <div className="modal-body">{listOffers()}</div>
//           </Box>
//         </Modal>
//       </div>

//       <div>
//         <Modal
//           open={openDrawerOffer}
//           onClose={handleCloseDrawerOffer}
//           aria-labelledby="modal-modal-title"
//           aria-describedby="modal-modal-description"
//           className="modal-container"
//         >
//           <Box sx={inAppWide}>
//             <div className="modal-title-container">
//               <div>View Offer</div>
//               <div>
//                 <CloseRoundedIcon onClick={handleCloseDrawerOffer} />
//               </div>
//             </div>

//             <div className="modal-body">{listOffer()}</div>
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
//           <MenuItem onClick={toggleDrawer(true)}>View Request</MenuItem>

//           {selectedRequest &&
//             new Date() > new Date(selectedRequest.expiryDate) && (
//               <MenuItem onClick={handleClickOpenDialogConfirm}>
//                 Repost Request
//               </MenuItem>
//             )}
//         </Menu>
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

//         <SwipeableDrawer
//           className="drawer-container"
//           variant="temporary"
//           anchor="bottom"
//           open={openDrawerOffers}
//           onOpen={toggleDrawerOffers(true)}
//           onClose={handleCloseDrawerOffers}
//           disableBackdropTransition={!iOS}
//           disableDiscovery={iOS}
//         >
//           <div className="drawer-title-container">
//             <div>Offers List</div>
//             <Puller />
//           </div>

//           <div className="drawer-body">{listOffers()}</div>
//         </SwipeableDrawer>

//         <SwipeableDrawer
//           className="drawer-container"
//           variant="temporary"
//           anchor="bottom"
//           open={openDrawerOffer}
//           onOpen={toggleDrawerOffer(true)}
//           onClose={handleCloseDrawerOffer}
//           disableBackdropTransition={!iOS}
//           disableDiscovery={iOS}
//         >
//           <div className="drawer-title-container">
//             <div>Offer Details</div>
//             <Puller />
//           </div>

//           <div className="drawer-body">{listOffer()}</div>
//         </SwipeableDrawer>
//       </div>

//       <DataGrid
//         components={{
//           Toolbar: Toolbar,
//           LoadingOverlay: LinearProgress,
//           NoRowsOverlay: () => <Overlay label="Requests" />,
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

// export default Requests;
