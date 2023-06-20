import React, { useEffect, useState } from "react";
import AdminService from "../../../Services/Admin";
import BuyerService from "../../../Services/Buyer";
import MuiTable from "../../v2/components/Table";
import { SectionItem, StackItem } from "../../v2/components/Lists";
import Countdown from "../../Countdown";
import { SmallPrimary } from "../../../Material/Button";
import DrawerModal from "../../v2/components/DrawerModal";
import { wideBox } from "../../../Styles/v2/box";
import { Box } from "@mui/material";
import "../../../Styles/v2/Requests.css";
import OfferTable from "../../v2/components/OfferTable";

const Requests = () => {
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

  const [rowButtonState, setRowButtonState] = useState({
    id: null,
    loading: null,
  });

  const [selectedRequest, setSelectedRequest] = useState(null);
  const [selectedRequestOffers, setSelectedRequestOffers] = useState(null);
  const [openRequestView, setOpenRequestView] = useState(false);
  const toggleOpenRequestView = (open) => () => {
    setOpenRequestView(open);
    if (!open) {
      setSelectedRequest(null);
      setSelectedRequestOffers(null);
    }
  };
  const handleOpenRequest = (id) => () => {
    const request = rows.find((row) => row.id === id);
    setSelectedRequest(request);
    const fecthData = async () => {
      setRowButtonState({ ...rowButtonState, id: id, loading: true });
      const buyerService = new BuyerService();
      try {
        const { errors, data } = await buyerService.getOffers(id);
        if (errors.length === 0) {
          setOpenRequestView(true);
          const filteredData = data.data.data.map((offer) => {
            return {
              merchant: {
                name: `${offer?.merchant?.firstName} ${offer?.merchant?.lastName}`,
                company: offer?.merchant?.companyName,
                telephone: offer?.merchant?.mobileNo,
              },
              offer: offer?.buyerQuotationRequestIncoterm,
            };
          });
          setSelectedRequestOffers(filteredData);
        }
      } catch (error) {
        throw error;
      }
      setRowButtonState({ ...rowButtonState, id: null, loading: false });
    };
    fecthData();
  };

  const columns = [
    { field: "index", headerName: "Number", width: 80 },
    { field: "requestNo", headerName: "Request #", width: 100 },
    { field: "product", headerName: "Product", width: 150 },
    { field: "terms", headerName: "Terms", width: 100 },
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
      field: "action",
      headerName: "",
      width: 90,
      renderCell: ({ row }) => (
        <SmallPrimary
          variant="contained"
          loading={
            row.id === rowButtonState.id ? rowButtonState.loading : false
          }
          onClick={handleOpenRequest(row.id)}
        >
          View
        </SmallPrimary>
      ),
    },
  ];

  useEffect(() => {
    const abortController = new AbortController();
    const fetchData = async () => {
      setRowsLoading(true);
      const adminService = new AdminService();
      try {
        const { data, errors } = await adminService.getRequests(
          abortController.signal,
          paging
        );
        if (errors.length === 0) {
          const filteredData = data.data.data.map((request, index) => {
            return {
              index: index + 1,
              id: request?.id,
              requestNo: request?.requestNo,
              expiryDate: request?.expiryDate,
              product: request?.quotationProducts[0]?.product?.name,
              terms: request?.buyerQuotationIncoterm?.label,
              origin: request?.quotationProducts[0]?.product?.origin?.country,
              destination: request?.destination,
              incoterm: request?.buyerQuotationIncoterm?.label,
              port: request?.port,
              species: request?.quotationProducts[0]?.product?.species?.label,
              speciesType:
                request?.quotationProducts[0]?.product?.species?.type?.label,
              containerSize:
                request?.quotationProducts[0]?.product
                  ?.supportedShippingContainers[0]?.label,
              quantity: request?.quotationProducts[0]?.specification?.quantity,
              buyer: request?.user,
              specification: {
                drying:
                  request?.quotationProducts[0]?.specification?.drying?.label,
                diameter:
                  request?.quotationProducts[0]?.specification?.diameter,
                diameterUnit:
                  request?.quotationProducts[0].specification.diameterUnit,
                length: request?.quotationProducts[0]?.specification?.length,
                lengthUnit:
                  request?.quotationProducts[0]?.specification?.lengthUnit,
                thickness:
                  request?.quotationProducts[0]?.specification?.thickness,
                thicknessUnit:
                  request?.quotationProducts[0]?.specification?.thicknessUnit,
                width: request?.quotationProducts[0]?.specification?.width,
                widthUnit:
                  request?.quotationProducts[0]?.specification?.widthUnit,
                volume: request?.quotationProducts[0]?.product?.volume?.value,
                volumeUnit:
                  request?.quotationProducts[0]?.product?.volume?.unit,
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

  const RequestView = () => {
    return (
      selectedRequest && (
        <Box>
          <div>
            <SectionItem sectionTitle="Product Information">
              <StackItem title="Product" value={selectedRequest.product} />
              <StackItem title="Species" value={selectedRequest.species} />
              <StackItem
                title="Type Of Species"
                value={selectedRequest.speciesType}
              />
              <StackItem title="Origin" value={selectedRequest.origin} />
              <StackItem
                title="Container size"
                value={selectedRequest.containerSize}
              />
            </SectionItem>

            <SectionItem sectionTitle="Specification">
              <StackItem
                title="Length"
                value={
                  selectedRequest.specification.length +
                  " " +
                  selectedRequest.specification.lengthUnit
                }
              />
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
              <StackItem
                title="Quantity"
                value={selectedRequest.quantity + " 20ft Container"}
              />
            </SectionItem>

            <SectionItem sectionTitle="Pricing and Delivery Information">
              <StackItem title="Incoterm" value={selectedRequest.terms} />
              <StackItem
                title="Destination"
                value={selectedRequest.destination}
              />
              <StackItem
                title="Destination Port"
                value={selectedRequest.port}
              />
            </SectionItem>

            <SectionItem sectionTitle="Request Settings">
              <StackItem title="Validity" value={selectedRequest.product} />
            </SectionItem>

            {selectedRequestOffers &&
              selectedRequestOffers.length > 0 &&
              selectedRequestOffers.map((selectedRequestOffer, index) => (
                <React.Fragment key={index}>
                  <SectionItem
                    sectionTitle={`Merchant Information Details [${
                      index + 1
                    }] `}
                  >
                    <StackItem
                      title="Name"
                      value={selectedRequestOffer?.merchant?.name}
                    />
                    <StackItem
                      title="Company Name"
                      value={selectedRequestOffer?.merchant?.company}
                    />
                    <StackItem
                      title="Telephone"
                      value={`+${selectedRequestOffer?.merchant?.telephone}`}
                    />
                  </SectionItem>

                  <SectionItem
                    sectionTitle={`Merchant Offer Details [${index + 1}] `}
                  >
                    <OfferTable
                      offerRows={selectedRequestOffer?.offer}
                      product={selectedRequest?.product}
                      incoterm={selectedRequest?.terms}
                    />
                  </SectionItem>
                </React.Fragment>
              ))}
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

      <MuiTable
        rows={rows}
        rowsLoading={rowsLoading}
        columns={columns}
        label="Requests"
        paging={paging}
        handlePageChange={handlePageChange}
        handlePageSizeChange={handlePageSizeChange}
      />
    </main>
  );
};

export default Requests;
