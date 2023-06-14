import { DataGrid } from "@mui/x-data-grid";
import LinearProgress from "@mui/material/LinearProgress";
import Toolbar from "../../../Material/Toolbar";
import { SmallPrimary } from "../../../Material/Button";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { Puller } from "../../../Material/Drawer";
import AdminService from "../../../Services/Admin";
import BuyerService from "../../../Services/Buyer";
import Countdown from "../../Countdown";
import Modal from "@mui/material/Modal";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { inAppWide } from "../../../Styles/Modal";
import Overlay from "../../../Material/Overlay";

const PRODUCTS = {
  TEAK_SQUARE_LOGS: "Teak Square Logs",
  TEAK_ROUND_LOGS: "Teak Round Logs",
};

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

  const iOS =
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);
  const [rows, setRows] = useState([]);
  const [rowsLoading, setRowsLoading] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const selectRequest = (id) => setSelectedRequestId(id);
  const selectedRequest =
    rows && rows.find((row) => row.id === selectedRequestId);
  const [openDrawer, setOpenDrawer] = useState(false);
  const toggleDrawer = (open) => (_event) => {
    setOpenDrawer(open);
  };

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
    setSelectedRequestId(null);
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
          {" "}
          <Countdown endDate={row.expiryDate} />{" "}
        </div>
      ),
    },
    {
      field: "action",
      headerName: "",
      width: 90,
      renderCell: ({ row }) => (
        <SmallPrimary onClick={() => selectRequest(row.id)}>View</SmallPrimary>
      ),
    },
  ];

  useEffect(() => {
    selectedRequest && setOpenDrawer(true);
  }, [selectedRequest]);

  const list = () =>
    selectedRequest && (
      <Box role="presentation">
        <div className="requests-sections-body">
          <div className="requests-title-container">
            <div>Request {selectedRequest.requestNo}</div>
          </div>
          <div className="requests-sections-container">
            <section>
              <div className="requests-section-title">Buyer Details</div>
              <div className="request-section-body">
                <div>
                  <span>Name:</span>
                  <span>
                    {selectedRequest.buyer?.firstName}{" "}
                    {selectedRequest.buyer?.lastName}
                  </span>
                </div>
                <div>
                  <span>Comany Name:</span>
                  <span>{selectedRequest.buyer?.companyName}</span>
                </div>
                <div>
                  <span>Country:</span>
                  <span>{selectedRequest.buyer?.country}</span>
                </div>
                <div>
                  <span>Mobile:</span>
                  <span>+{selectedRequest.buyer?.mobileNo}</span>
                </div>

                <div>
                  <span>Enabled Status:</span>
                  <span>
                    {selectedRequest.buyer?.enabled ? "Enabled" : "Disabled"}
                  </span>
                </div>
                <div>
                  <span>Verified Status:</span>
                  <span>
                    {selectedRequest.buyer?.isVerified
                      ? "Verified"
                      : "Unverified"}
                  </span>
                </div>
                <div>
                  <span>Customer Since:</span>
                  <span>{selectedRequest.buyer?.createdOn}</span>
                </div>
              </div>
            </section>

            <section>
              <div className="requests-section-title">Product Information</div>
              <div className="request-section-body">
                <div>
                  <span>Product:</span>
                  <span>{selectedRequest.product}</span>
                </div>
                <div>
                  <span>Species:</span>
                  <span>{selectedRequest.species}</span>
                </div>
                <div>
                  <span>Type Of Species:</span>
                  <span>{selectedRequest.speciesType}</span>
                </div>
                <div>
                  <span>Origin:</span>
                  <span>{selectedRequest.origin}</span>
                </div>
                <div>
                  <span>Container size:</span>
                  <span>{selectedRequest.containerSize}</span>
                </div>
              </div>
            </section>

            <section>
              <div className="requests-section-title">Specifications</div>
              <div className="request-section-body">
                <div>
                  <span>Length:</span>
                  <span className="toLower">
                    {selectedRequest.length} {selectedRequest.lengthUnit}
                  </span>
                </div>
                {selectedRequest.product === PRODUCTS.TEAK_SQUARE_LOGS && (
                  <>
                    <div>
                      <span>Thickness:</span>
                      <span className="toLower">
                        {selectedRequest.thickness}{" "}
                        {selectedRequest.thicknessUnit}
                      </span>
                    </div>
                    <div>
                      <span>Width:</span>
                      <span className="toLower">
                        {selectedRequest.width} {selectedRequest.widthUnit}
                      </span>
                    </div>
                    <div>
                      <span>Drying:</span>
                      <span>{selectedRequest.drying}</span>
                    </div>
                  </>
                )}
                {selectedRequest.product === PRODUCTS.TEAK_ROUND_LOGS && (
                  <>
                    <div>
                      <span>Diameter:</span>
                      <span className="toLower">
                        {selectedRequest.diameter}{" "}
                        {selectedRequest.diameterUnit}
                      </span>
                    </div>
                  </>
                )}
                <div>
                  <span>Quantity:</span>
                  <span>
                    {selectedRequest.quantity} {selectedRequest.containerSize}
                  </span>
                </div>
              </div>
            </section>

            <section>
              <div className="requests-section-title">
                Pricing and Delivery Information
              </div>
              <div className="request-section-body">
                <div>
                  <span>Incoterm:</span>
                  <span>{selectedRequest.terms}</span>
                </div>
                <div>
                  <span>Destination:</span>
                  <span>{selectedRequest.destination}</span>
                </div>
                <div>
                  <span>Destination Port:</span>
                  <span>{selectedRequest.port}</span>
                </div>
              </div>
            </section>

            <section>
              <div className="requests-section-title">Request Settings</div>
              <div className="request-section-body">
                <div>
                  <span>Validity:</span>
                  <span>{selectedRequest.validity} days</span>
                </div>
              </div>
            </section>

            {selectedRequest.offers.length > 0 && (
              <div>
                {selectedRequest.offers.map((offer, index) => (
                  <div key={index} className="incoterm-table-offers-admin">
                    <section>
                      <div className="requests-section-title">
                        [ {index + 1} ] Merchant Details
                      </div>
                      <div className="request-section-body">
                        <div>
                          <span>Name:</span>
                          <span>
                            {offer?.merchant?.firstName}{" "}
                            {offer?.merchant?.lastName}
                          </span>
                        </div>
                        <div>
                          <span>Comany Name:</span>
                          <span>{offer?.merchant?.companyName}</span>
                        </div>
                        <div>
                          <span>Mobile:</span>
                          <span>+{offer?.merchant?.mobileNo}</span>
                        </div>
                      </div>
                    </section>

                    <div className="incoterm-settings-table-container admin-incoterm-settings-table-container">
                      <table>
                        <thead>
                          <tr className="incoterm-setting-heading-container">
                            <th>Number</th>
                            {selectedRequest.product === "Teak Round Logs" &&
                              selectedRequest.terms !== "FOB" && (
                                <th>Diameter (cm)</th>
                              )}
                            <th>CBM</th>
                            <th>Price per CBM</th>
                            <th>Pieces/container</th>
                            <th>Price/container</th>
                            <th>Total price</th>
                            {selectedRequest.terms === "CIF" && (
                              <th>Insurance</th>
                            )}
                            {selectedRequest.terms !== "FOB" && (
                              <th>Total Freight</th>
                            )}
                            <th>Total amount</th>
                          </tr>
                        </thead>

                        <tbody>
                          {offer.incotermRows.length > 0 ? (
                            offer.incotermRows.map((incoterm, index) => (
                              <tr key={index + 1}>
                                <td>
                                  <input disabled defaultValue={index + 1} />
                                </td>
                                {selectedRequest.product ===
                                  "Teak Round Logs" &&
                                  selectedRequest.terms !== "FOB" && (
                                    <td>
                                      <input
                                        disabled
                                        defaultValue={incoterm.diameter}
                                      />
                                    </td>
                                  )}
                                <td>
                                  <input
                                    disabled
                                    defaultValue={incoterm?.cbm}
                                  />
                                </td>
                                <td>
                                  <input
                                    disabled
                                    defaultValue={incoterm?.cbmprice}
                                  />
                                </td>
                                <td>
                                  <input
                                    disabled
                                    defaultValue={incoterm?.noOfPieces}
                                  />
                                </td>
                                <td>
                                  <input
                                    disabled
                                    defaultValue={incoterm?.price}
                                  />
                                </td>
                                <td>
                                  <input
                                    disabled
                                    defaultValue={incoterm?.totalPrice}
                                  />
                                </td>
                                {selectedRequest.terms === "CIF" && (
                                  <td>
                                    <input
                                      disabled
                                      defaultValue={incoterm?.insurance}
                                    />
                                  </td>
                                )}
                                {selectedRequest.terms !== "FOB" && (
                                  <td>
                                    <input
                                      disabled
                                      defaultValue={incoterm?.costOfFreight}
                                    />
                                  </td>
                                )}
                                <td>
                                  <input
                                    disabled
                                    defaultValue={incoterm.totalAmount}
                                  />
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td>
                                <input disabled defaultValue="--" />
                              </td>
                              {selectedRequest.terms !== "FOB" && (
                                <td>
                                  <input disabled defaultValue="--" />
                                </td>
                              )}
                              <td>
                                <input disabled defaultValue="--" />
                              </td>
                              <td>
                                <input disabled defaultValue="--" />
                              </td>
                              <td>
                                <input disabled defaultValue="--" />
                              </td>
                              <td>
                                <input disabled value="--" />
                              </td>
                              <td>
                                <input disabled value="--" />
                              </td>
                              {selectedRequest.terms === "CIF" && (
                                <td>
                                  <input disabled defaultValue="--" />
                                </td>
                              )}
                              {selectedRequest.terms !== "FOB" && (
                                <td>
                                  <input disabled defaultValue="--" />
                                </td>
                              )}
                              <td>
                                <input disabled defaultValue="--" />
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Box>
    );

  useEffect(() => {
    const abortController = new AbortController();
    const fetchData = async () => {
      setRowsLoading(true);
      const adminService = new AdminService();
      const buyerService = new BuyerService();
      try {
        const { page, size } = paging;
        const { data, errors } = await adminService.getRequests(
          abortController.signal,
          { page, size }
        );
        if (errors.length === 0) {
          setPaging({ ...paging, totalCount: data.data.totalCount });
          const filteredData = data.data.data;

          await Promise.all(
            filteredData.map(async (request, index) => {
              request.index =
                paging.size * paging.page - (paging.size - index) + 1;
              request.product = request.quotationProducts[0].product.name;
              request.buyer = request.user;
              request.terms = request.buyerQuotationIncoterm.label;
              request.quantity =
                request.quotationProducts[0].specification.quantity;
              request.diameter =
                request.quotationProducts[0].specification.diameter;
              request.diameterUnit =
                request.quotationProducts[0].specification.diameterUnit;
              request.drying =
                request?.quotationProducts[0]?.specification?.drying?.label;
              request.length =
                request.quotationProducts[0].specification.length;
              request.thickness =
                request.quotationProducts[0].specification.thickness;
              request.width = request.quotationProducts[0].specification.width;
              request.lengthUnit =
                request.quotationProducts[0].specification.lengthUnit;
              request.thicknessUnit =
                request.quotationProducts[0].specification.thicknessUnit;
              request.widthUnit =
                request.quotationProducts[0].specification.widthUnit;
              request.species =
                request.quotationProducts[0].product.species.label;
              request.speciesType =
                request.quotationProducts[0].product.species.type.label;
              request.origin =
                request.quotationProducts[0].product.origin.country;
              request.containerSize =
                request.quotationProducts[0].product.supportedShippingContainers[0].label;
              request.volume =
                request.quotationProducts[0].product.volume.value;
              request.volumeUnit =
                request.quotationProducts[0].product.volume.unit;
              request.offers = (
                await (
                  await buyerService.getOffers(request.id)
                ).data.data.data
              ).map((offer) => {
                return {
                  incotermRows: offer.buyerQuotationRequestIncoterm,
                  merchant: offer.merchant,
                };
              });
              return 1;
            })
          );

          setRows(filteredData);
        }
      } catch (error) {}
      setRowsLoading(false);
    };

    fetchData();
    return () => abortController.abort();
    // eslint-disable-next-line
  }, [paging.page, paging.size]);

  return (
    <div className="Requests-Table">
      <div>
        <Modal
          open={openDrawer}
          onClose={handleCloseDrawer}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className="modal-container"
        >
          <Box sx={inAppWide}>
            <div className="modal-title-container">
              <div>Request Details</div>
              <div>
                <CloseRoundedIcon onClick={handleCloseDrawer} />
              </div>
            </div>

            <div className="modal-body">{list()}</div>
          </Box>
        </Modal>
      </div>

      <div>
        <SwipeableDrawer
          className="drawer-container"
          variant="temporary"
          anchor="bottom"
          open={openDrawer}
          onOpen={toggleDrawer(true)}
          onClose={handleCloseDrawer}
          disableBackdropTransition={!iOS}
          disableDiscovery={iOS}
        >
          <div className="drawer-title-container">
            <div>Request Details</div>
            <Puller />
          </div>

          <div className="drawer-body">{list()}</div>
        </SwipeableDrawer>
      </div>

      <DataGrid
        components={{
          Toolbar: Toolbar,
          LoadingOverlay: LinearProgress,
          NoRowsOverlay: () => <Overlay label="Requests" />,
        }}
        className="standard-table"
        checkboxSelection
        disableSelectionOnClick
        pageSize={paging.size}
        rows={rows}
        columns={columns}
        pagination
        density="compact"
        rowsPerPageOptions={[10, 20, 30, 40, 50]}
        loading={rowsLoading}
        rowCount={paging.totalCount}
        paginationMode="server"
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />
    </div>
  );
};

export default Requests;
