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
import { SmallPrimary, SmallSecondaryV2 } from "../../../Material/Button";
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
              {selectedRequest?.specification?.diameter && (
                <StackItem
                  title="Diameter"
                  value={`${selectedRequest?.specification?.diameter} ${selectedRequest?.specification?.diameterUnit}`}
                />
              )}
              {selectedRequest?.specification?.thickness && (
                <StackItem
                  title="Thickness"
                  value={`${selectedRequest?.specification?.thickness} ${selectedRequest?.specification?.thicknessUnit}`}
                />
              )}
              {selectedRequest?.specification?.width && (
                <StackItem
                  title="Width"
                  value={`${selectedRequest?.specification?.width} ${selectedRequest?.specification?.widthUnit}`}
                />
              )}
              {selectedRequest?.specification?.drying && (
                <StackItem
                  title="Drying"
                  value={selectedRequest?.specification?.drying}
                />
              )}
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
    const [selectionModel, setSelectionModel] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selectedModelQuantity, setSelectedModelQuantity] = useState(0);
    const handleSelectionModel = (model) => {
      const totalCount =
        selectedOffers &&
        selectedOffers
          .filter((offer) => model.find((id) => id === offer.id))
          .map((filterdOffer) => filterdOffer.quantity)
          .reduce((a, b) => a + b, 0);

      const selections = selectedOffers
        .filter((offer) => model.includes(offer.id))
        .map((filteredData) => {
          return {
            offerID: filteredData.id,
            merchantID: filteredData.merchant.id,
            orderQuantity: filteredData.quantity,
          };
        });

      setSelectionModel(selections);
      setSelectedModelQuantity(totalCount);
    };

    const handleAcceptOrder = () => {
      const doAction = async () => {
        setLoading(true);
        const buyerService = new BuyerService();
        try {
          const { errors } = await buyerService.acceptOffer(selectionModel);
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
        label="Requests"
        rows={rows}
        columns={columns}
        rowsLoading={rowsLoading}
      />
    </main>
  );
};

export default Requests;
