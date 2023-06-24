import React from "react";
import { useEffect, useState } from "react";
import MerchantService from "../../../Services/Merchant";
import { Box, Stack, TextField } from "@mui/material";
import "../../../Styles/v2/Requests.css";
import "../../../Styles/v2/Pagination.css";
import DrawerModal from "../../v2/components/DrawerModal";
import { wideBox } from "../../../Styles/v2/box";
import { SectionItem, StackItem } from "../../v2/components/Lists";
import { incotermNote } from "../../v2/components/IncotermNotes";
import { SmallSecondary } from "../../../Material/Button";
import { OfferTableV1 } from "../../v2/components/OfferTable";
import { AddRounded, RemoveRounded } from "@mui/icons-material/";
import LinearProgress from "@mui/material/LinearProgress";
import { setAlert } from "../../../Redux/Features/Alert";
import { useDispatch } from "react-redux";
import MuiDialog from "../../v2/components/Dialog";
import { Button1 } from "../../v2/components/Buttons";
import NoRowsOverlay from "../../../Material/Overlay";
import TablePagination from "@mui/material/TablePagination";
import { Skeleton } from "@mui/material";

const Requests = () => {
  const [paging, setPaging] = useState({
    page: 0,
    totalCount: 0,
    size: 10,
  });
  const handlePaginationChange = (_e, value) => {
    setPaging({
      ...paging,
      page: value,
    });
    window.scroll(0, 0);
  };
  const handleChangeRowsPerPage = (event) => {
    setPaging({
      ...paging,
      page: 0,
      size: parseInt(event.target.value, 10),
    });
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
          setPaging({ ...paging, totalCount: data.data.totalCount });
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
              containerSize: "20ft Container",
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
    return () => abortController.abort();
    // eslint-disable-next-line
  }, [reloadTable]);

  const RequestsView = () => {
    return (
      <Box className="requests_view_container">
        {rowsLoading ? (
          <Stack marginTop={1} direction="column" spacing={1}>
            <LinearProgress />
            {Array.from(Array(10)).map((_, index) => (
              <Skeleton
                variant="rounded"
                key={index}
                animation="pulse"
                height={80}
              />
            ))}
          </Stack>
        ) : (
          <Box className="requests_view_inner">
            {rows && rows.length > 0 ? (
              <Box className="request_items_container">
                {rows
                  .slice(
                    paging.page * paging.size,
                    paging.page * paging.size + paging.size
                  )
                  .map((request, index) => (
                    <Stack
                      key={index}
                      className="request_item"
                      onClick={handleOpenRequestView(request?.id)}
                      spacing={2}
                    >
                      <Stack
                        spacing={1}
                        className="request_item_row"
                        direction="row"
                        justifyContent="space-between"
                      >
                        <div>Request Number: {request?.requestNo}</div>
                        <div>{request?.destination}</div>
                      </Stack>
                      <Stack
                        spacing={1}
                        className="request_item_row"
                        direction="row"
                        justifyContent="space-between"
                      >
                        <div>{request?.createdOn}</div>
                        <div>{request?.productName}</div>
                      </Stack>
                    </Stack>
                  ))}
              </Box>
            ) : (
              <Stack
                display="grid"
                alignContent="center"
                justifyContent="center"
                height={"100%"}
                borderTop={"1px solid rgba(224, 224, 224, 1)"}
              >
                <NoRowsOverlay label="Requests" />
              </Stack>
            )}
          </Box>
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
              disabled={dialogButtonState}
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
                title="Type Of Species"
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
        boxStyle={wideBox}
        openState={openRequestView}
        toggleOpenState={toggleOpenRequestView}
        title="Request Details"
      >
        <RequestView />
      </DrawerModal>

      <TablePagination
        component="div"
        rowsPerPageOptions={[10, 20, 30, 40, 50]}
        count={paging.totalCount}
        page={paging.page}
        rowsPerPage={paging.size}
        onPageChange={handlePaginationChange}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </main>
  );
};

export default Requests;
