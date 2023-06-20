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
import { AddRounded, RemoveRounded } from "@mui/icons-material/";
import LinearProgress from "@mui/material/LinearProgress";
import { SearchBox } from "../../v2/components/SearchBox";
import { setAlert } from "../../../Redux/Features/Alert";
import { useDispatch } from "react-redux";
import MuiDialog from "../../v2/components/Dialog";
import { Button1 } from "../../v2/components/Buttons";

const Requests = () => {
  const [page, setPage] = useState(1);
  const [paginationCount, setPagination] = useState(0);
  const handlePaginationChange = (_e, value) => {
    setPage(value);
    window.scroll(0, 0);
  };

  const [reloadTable, setReloadTable] = useState(false);

  const rootDispatch = useDispatch();

  const [rows, setRows] = useState([]);
  const [rowsLoading, setRowsLoading] = useState(false);

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

  const triggerSnackBarAlert = (message, severity) => {
    const payload = {
      severity,
      message,
    };
    rootDispatch(setAlert(payload));
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
  }, [reloadTable]);

  const RequestsView = () => {
    return (
      <Box className="request_rows_container">
        {rowsLoading ? (
          <Box>
            <LinearProgress />
            <Stack marginTop={1} direction="column" spacing={1}>
              <div className="request_row_container_loading_search"></div>
              {Array.from(Array(4)).map((_, index) => {
                return (
                  <div
                    key={index}
                    className="request_row_container_loading"
                  ></div>
                );
              })}
            </Stack>
          </Box>
        ) : rows && rows.length > 0 ? (
          <div>
            <Stack marginBottom={1}>
              <SearchBox />
            </Stack>
            {rows.slice(5 * page - 5, page * 5 - 1).map((request, index) => (
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
            ))}
          </div>
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
    const [dialogButtonState, setDialogButtonState] = useState(false);
    const [openPostOfferDialog, setOpenPostOfferDialog] = useState(false);
    const toggleOpenPostOfferDialog = (open) => (event) => {
      event && event.preventDefault();
      setOpenPostOfferDialog(open);
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      const doAction = async () => {
        setDialogButtonState(true);
        const merchantService = new MerchantService();
        try {
          const { errors } = await merchantService.postOffer(quotation);
          if (errors.length === 0) {
            setOpenRequestView(false);
            setReloadTable((prev) => !prev);
            setSelectedRequest(null);
            setOpenPostOfferDialog(false);
            triggerSnackBarAlert(
              `You will be notified immediately the buyer accepts your quotation`,
              "success"
            );
          }
        } catch (error) {
          throw error;
        }
        setDialogButtonState(false);
      };
      doAction();
    };

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

    return (
      selectedRequest && (
        <Box>
          <MuiDialog
            openDialog={openPostOfferDialog}
            toggleOpenDialog={toggleOpenPostOfferDialog}
            dialogTitle="Do you want to post this offer to the buyer?"
          >
            <Button1
              variant="text"
              color="inherit"
              onClick={toggleOpenPostOfferDialog(false)}
            >
              No
            </Button1>
            <Button1
              variant="text"
              color="inherit"
              loading={dialogButtonState}
              onClick={handleSubmit}
            >
              Yes
            </Button1>
          </MuiDialog>

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
              onSubmit={toggleOpenPostOfferDialog(true)}
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
                        max: selectedRequest?.quantity,
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
                  <Stack direction="row" spacing={1}>
                    <Stack
                      onClick={handleChangeOfferRows("MORE")}
                      spacing={1}
                      className="request_quote_managae_rows"
                      direction="row"
                      alignContent="center"
                    >
                      <AddRounded fontSize="small" />
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
                        <RemoveRounded fontSize="small" />
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
