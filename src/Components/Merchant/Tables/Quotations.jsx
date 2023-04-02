import { DataGrid } from "@mui/x-data-grid";
import LinearProgress from '@mui/material/LinearProgress';
import Toolbar from "../../../Material/Toolbar";
import { SmallPrimary } from "../../../Material/Button";
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import { Puller } from "../../../Material/Drawer";
import MerchantService from "../../../Services/Merchant";
import Countdown from "../../Countdown";
import { inAppWide } from "../../../Styles/Modal";
import Modal from '@mui/material/Modal';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Overlay from "../../../Material/Overlay";

const PRODUCTS = {
    TEAK_SQUARE_LOGS: "Teak Square Logs",
    TEAK_ROUND_LOGS: "Teak Round Logs",
}

const Quotations = () => {
    const iOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);
    const [rows, setRows] = useState([]);
    const [rowsLoading, setRowsLoading] = useState(false);
    const [pageSize, setPageSize] = useState(10);
    const [selectedQuoteId, setselectedQuoteId] = useState(null);
    const selectQuote = (id) => setselectedQuoteId(id);
    const selectedQuote = rows && rows.find(row => row.id === selectedQuoteId);
    const [openDrawer, setOpenDrawer] = useState(false);
    const toggleDrawer = (open) => (_event) => {
        setOpenDrawer(open);
    };

    const handleCloseDrawer = () => {
        setOpenDrawer(false);
        setselectedQuoteId(null);
    }

    const columns = [
        { field: "index", headerName: "Number", width: 50 },
        { field: "requestNo", headerName: "Request #", width: 100 },
        { field: "product", headerName: "Product", width: 200 },
        { field: "terms", headerName: "Terms", width: 70 },
        { field: "quantity", headerName: "Quantity", width: 90 },
        { field: "expiryDate", headerName: "Date", width: 100 },
        { field: "timeLeft", headerName: "Time Left", width: 100, renderCell: ({ row }) => <div className="countdown-table-container"> <Countdown endDate={row.expiryDate} /> </div> },
        { field: "action", headerName: "", width: 90, renderCell: ({ row }) => <SmallPrimary onClick={() => selectQuote(row.id)}>View</SmallPrimary> },
    ];

    useEffect(() => {
        selectedQuote && setOpenDrawer(true);
    }, [selectedQuote]);

    const list = () => (
        selectedQuote &&
        <Box role="presentation" >
            <div className="requests-sections-body">
                <div className="requests-title-container">
                    <div>Request {selectedQuote.requestNo}</div>
                </div>
                <div className="requests-sections-container">
                    <section>
                        <div className="requests-section-title">Product Information</div>
                        <div className="request-section-body">
                            <div>
                                <span>Product:</span>
                                <span>{selectedQuote.product}</span>
                            </div>
                            <div>
                                <span>Species:</span>
                                <span>{selectedQuote.species}</span>
                            </div>
                            <div>
                                <span>Type Of Species:</span>
                                <span>{selectedQuote.speciesType}</span>
                            </div>
                            <div>
                                <span>Origin:</span>
                                <span>{selectedQuote.origin}</span>
                            </div>
                            <div>
                                <span>Container size:</span>
                                <span>{selectedQuote.containerSize}</span>
                            </div>
                            <div>
                                <span>Volume per container:</span>
                                <span>{selectedQuote.volume} {selectedQuote.volumeUnit}</span>
                            </div>
                        </div>
                    </section>

                    <section>
                        <div className="requests-section-title">Specifications</div>
                        <div className="request-section-body">
                            <div>
                                <span>Length:</span>
                                <span className="toLower">{selectedQuote.length} {selectedQuote.lengthUnit}</span>
                            </div>
                            {
                                selectedQuote.product === PRODUCTS.TEAK_SQUARE_LOGS &&
                                <>
                                    <div>
                                        <span>Thickness:</span>
                                        <span className="toLower">{selectedQuote.thickness} {selectedQuote.thicknessUnit}</span>
                                    </div>
                                    <div>
                                        <span>Width:</span>
                                        <span className="toLower">{selectedQuote.width} {selectedQuote.widthUnit}</span>
                                    </div>
                                    <div>
                                        <span>Drying:</span>
                                        <span>{selectedQuote.drying}</span>
                                    </div>
                                </>
                            }
                            {
                                selectedQuote.product === PRODUCTS.TEAK_ROUND_LOGS &&
                                <>
                                    <div>
                                        <span>Diameter:</span>
                                        <span className="toLower">{selectedQuote.diameter} {selectedQuote.diameterUnit}</span>
                                    </div>
                                </>
                            }
                            <div>
                                <span>Quantity:</span>
                                <span>{selectedQuote.quantity} {selectedQuote.containerSize}</span>
                            </div>
                        </div>
                    </section>

                    <section>
                        <div className="requests-section-title">Pricing and Delivery Information</div>
                        <div className="request-section-body">
                            <div>
                                <span>Incoterm:</span>
                                <span>{selectedQuote.terms}</span>
                            </div>
                            <div>
                                <span>Destination:</span>
                                <span>{selectedQuote.destination}</span>
                            </div>
                            <div>
                                <span>Destination Port:</span>
                                <span>{selectedQuote.port}</span>
                            </div>
                        </div>
                    </section>

                    <section>
                        <div className="requests-section-title">Request Settings</div>
                        <div className="request-section-body">
                            <div>
                                <span>Validity:</span>
                                <span>{selectedQuote.validity} days</span>
                            </div>
                        </div>
                    </section>

                    <section>
                        <div className="requests-section-title">Incoterm</div>
                        <div>
                            <div className="incoterm-settings-table-container">
                                <table>
                                    <thead>
                                        <tr className="incoterm-setting-heading-container">
                                            <th>Number</th>
                                            {(selectedQuote.terms === "CIF" || selectedQuote.terms === "CFR") && <th>Diameter (cm)</th>}
                                            <th>Pieces/container</th>
                                            <th>Price/container</th>
                                            <th>Total price</th>
                                            {selectedQuote.terms === "CIF" && <th>Insurance</th>}
                                            {(selectedQuote.terms === "CIF" || selectedQuote.terms === "CFR") && <th>Total Freight</th>}
                                            <th>Total amount</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {
                                            selectedQuote.incotermRows.length > 0 ?
                                                selectedQuote?.incotermRows.map((incoterm, index) =>
                                                    <tr key={index + 1}>
                                                        <td><input disabled value={index + 1} /></td>
                                                        {(selectedQuote.terms === "CIF" || selectedQuote.terms === "CFR") && <td><input disabled name="diameter" value={incoterm.diameter} /></td>}
                                                        <td><input disabled name="noOfPieces" value={incoterm.noOfPieces} /></td>
                                                        <td><input disabled name="price" value={incoterm.price} /></td>
                                                        <td><input disabled name="totalPrice" value={incoterm.totalPrice} /></td>
                                                        {selectedQuote.terms === "CIF" && <td><input disabled name="insurance" value={incoterm.insurance} /></td>}
                                                        {(selectedQuote.terms === "CIF" || selectedQuote.terms === "CFR") && <td><input disabled name="freight" value={incoterm.costOfFreight} /></td>}
                                                        <td><input disabled type="number" value={incoterm.totalAmount} /></td>
                                                    </tr>
                                                ) :
                                                <tr>
                                                    <td><input disabled value="--" /></td>
                                                    {(selectedQuote.terms === "CIF" || selectedQuote.terms === "CFR") && <td><input disabled name="diameter" value="--" /></td>}
                                                    <td><input disabled name="noOfPieces" value="--" /></td>
                                                    <td><input disabled name="price" value="--" /></td>
                                                    <td><input disabled name="totalPrice" value="--" /></td>
                                                    {selectedQuote.terms === "CIF" && <td><input disabled name="insurance" value="--" /></td>}
                                                    {(selectedQuote.terms === "CIF" || selectedQuote.terms === "CFR") && <td><input disabled name="freight" value="--" /></td>}
                                                    <td><input disabled value="--" /></td>
                                                </tr>
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <div className="incoterm-settings-table-note-container">Kindly note that all prices are quoted in ($)</div>
                        </div>
                    </section>
                </div>
            </div>
        </Box >
    );

    useEffect(() => {
        const abortController = new AbortController();
        const fetchData = async () => {
            setRowsLoading(true);
            const merchantService = new MerchantService();
            try {
                const { data, errors } = await merchantService.getQuotes(abortController.signal);
                if (errors.length === 0) {
                    const filteredData = data.data.data;
                    filteredData.map((quote, index) => {
                        quote.index = index + 1;
                        quote.id = quote._id;
                        quote.requestNo = quote.request.requestNo;
                        quote.expiryDate = new Date(quote.request.expiryDate).toUTCString().slice(0, 25);
                        quote.product = quote.request.quotationProducts[0].product.name;
                        quote.terms = quote.request.buyerQuotationIncoterm.label;
                        quote.quantity = quote.request.quotationProducts[0].specification.quantity;
                        quote.diameter = quote.request.quotationProducts[0].specification.diameter;
                        quote.diameterUnit = quote.request.quotationProducts[0].specification.diameterUnit;
                        quote.drying = quote?.request?.quotationProducts[0]?.specification?.drying?.label;
                        quote.length = quote?.request?.quotationProducts[0]?.specification.length;
                        quote.thickness = quote?.request?.quotationProducts[0]?.specification?.thickness;
                        quote.width = quote?.request?.quotationProducts[0]?.specification?.width;
                        quote.lengthUnit = quote?.request?.quotationProducts[0]?.specification.lengthUnit;
                        quote.thicknessUnit = quote?.request?.quotationProducts[0]?.specification.thicknessUnit;
                        quote.widthUnit = quote?.request.quotationProducts[0]?.specification?.widthUnit;
                        quote.species = quote.request.quotationProducts[0].product.species.label;
                        quote.speciesType = quote.request.quotationProducts[0].product.species.type.label;
                        quote.origin = quote.request.quotationProducts[0].product.origin.country;
                        quote.containerSize = quote.request.quotationProducts[0].product.supportedShippingContainers[0].label;
                        quote.volume = quote.request.quotationProducts[0].product.volume.value;
                        quote.volumeUnit = quote.request.quotationProducts[0].product.volume.unit;
                        quote.destination = quote.request.destination;
                        quote.port = quote.request.port;
                        quote.validity = quote.request.validity;
                        quote.incotermRows = quote.buyerQuotationRequestIncoterm;
                        return 1;
                    });

                    setRows(filteredData);
                }
            } catch (error) { }
            setRowsLoading(false);
        }

        fetchData();
        return () => abortController.abort();
    }, []);

    return (
        <div className="Quotes-Table">
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
                            <div><CloseRoundedIcon onClick={handleCloseDrawer} /></div>
                        </div>
                        <div className="modal-body">
                            {list()}
                        </div>
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
                    disableBackdropTransition={!iOS} disableDiscovery={iOS}
                >
                    <div className="drawer-title-container">
                        <div>Request Details</div>
                        <Puller />
                    </div>

                    <div className="drawer-body">
                        {list()}
                    </div>
                </SwipeableDrawer>
            </div>

            <DataGrid
                components={{ Toolbar: Toolbar, LoadingOverlay: LinearProgress, NoRowsOverlay: () => <Overlay label="Quotations" /> }}
                className="standard-table"
                checkboxSelection
                disableSelectionOnClick
                pageSize={pageSize}
                rows={rows}
                columns={columns}
                pagination
                density="compact"
                rowsPerPageOptions={[10, 20, 30, 40, 50]}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                loading={rowsLoading}
            />
        </div>
    )
}

export default Quotations;