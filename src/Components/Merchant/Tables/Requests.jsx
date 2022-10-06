import "../../../Styles/Requests.css";
import "../../../Styles/Pagination.css";
import { useState, useEffect, useRef, useReducer } from "react";
import MerchantService from "../../../Services/Merchant";
import CircularProgress from '@mui/material/CircularProgress';
import Pagination from '@mui/material/Pagination';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Box from '@mui/material/Box';
import { Puller } from "../../../Material/Drawer";
import { SmallSecondary } from "../../../Material/Button";
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
import { INITIAL_STATE, formReducer } from "../../../Reducers/FormReducer.js";
import { REQUEST_FAILED, REQUEST_SUCCESSFUL, SEND_REQUEST } from "../../../Reducers/Actions";
import { setAlert } from "../../../Redux/Features/Alert.js"
import { useDispatch } from "react-redux";
import { inAppWider } from "../../../Styles/Modal";
import Modal from '@mui/material/Modal';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Transition } from "../../../Material/Dialog";
import { GenericSecondary, GenericPrimaryButton } from "../../../Material/Button";
import { dialogStyle } from "../../../Styles/Dialog";

const PRODUCTS = {
    TEAK_SQUARE_LOGS: "Teak Square Logs",
    TEAK_ROUND_LOGS: "Teak Round Logs",
}

const TYPE = {
    INCREASE: "increase",
    DECREASE: "decrease"
}

const NOTE_CIF = () => {
    return (
        <div>
            <div>Total Price: Price per container x Quantity</div>
            <div>Insurance: 1.5% of Cargo value (Total Price)</div>
            <div>Freight: Freight rate x Quantity</div>
            <div>Total Amount: Total Price + Insurance + Freight</div>
        </div>
    )
}

const NOTE_FOB = () => {
    return (
        <div>
            <div>Total Price: Price per container * Quantity</div>
            <div>Total Amount: Total price</div>
        </div>
    )
}

const NOTE_CFR = () => {
    return (
        <div>
            <div>Total Price: Price per container x Quantity</div>
            <div>Freight: Freight rate x Quantity</div>
            <div>Total Amount: Total Price + Freight</div>
        </div>
    )
}

const INCOTERM_NOTES = {
    CIF: <NOTE_CIF />,
    FOB: <NOTE_FOB />,
    CFR: <NOTE_CFR />,
}

const Requests = () => {
    const [refreshTable, setRefreshTable] = useState(false);
    const rootDispatch = useDispatch();
    const [state, dispatch] = useReducer(formReducer, INITIAL_STATE);
    const incotermRef = useRef([]);
    const [incotermSettings, setIncotermSettings] = useState([]);
    const iOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);
    const [rows, setRows] = useState(null);
    const [rowsLoading, setRowsLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [paginationCount, setPagination] = useState(null);
    const [incotermRows, setIncotermRows] = useState(1);
    const [selectedRequestId, setSelectedRequestId] = useState(null);
    const selectRequest = (id) => setSelectedRequestId(id);
    const selectedRequest = rows && rows.find(row => row.id === selectedRequestId);
    const [openDrawer, setOpenDrawer] = useState(false);
    const toggleDrawer = (open) => (_event) => {
        setOpenDrawer(open);
    };

    const [openDialogConfirm, setOpenDialogConfirm] = useState(false);
    const handleClickOpenDialogConfirm = (e) => {
        e.preventDefault();
        setOpenDialogConfirm(true);
    };
    const handleCloseDialogConfirm = () => {
        setOpenDialogConfirm(false);
    };

    const handleCloseDrawer = () => {
        setOpenDrawer(false);
        setIncotermRows(1);
        incotermRef.current = [];
        setIncotermSettings([]);
        setSelectedRequestId(null);
    }

    const handlePaginationChange = (_event, value) => {
        setPage(value);
        window.scroll(0, 0);
    };

    const handleIncotermSize = (type) => {
        if (type === TYPE.INCREASE) {
            setIncotermRows(prev => prev + 1);
        } else if (type === TYPE.DECREASE) {
            setIncotermRows(prev => prev - 1);
        }
    };

    const handleChange = (e, index, terms) => {
        incotermRef.current[index] = {
            ...incotermRef.current[index],
            [e.target.name]: e.target.value,
        };

        if (terms === "FOB") {
            if (e.target.name === "price") {
                incotermRef.current[index] = {
                    ...incotermRef.current[index],
                    totalPrice: e.target.value * selectedRequest.quantity,
                    totalAmount: e.target.value * selectedRequest.quantity
                }
            }
        } else if (terms === "CFR") {
            if (e.target.name === "price") {
                incotermRef.current[index] = {
                    ...incotermRef.current[index],
                    totalPrice: e.target.value * selectedRequest.quantity,
                    totalAmount: incotermSettings[index]?.freight ? (e.target.value * selectedRequest.quantity) + incotermSettings[index]?.freight : 0
                }
            } else if (e.target.name === "freightRate") {
                incotermRef.current[index] = {
                    ...incotermRef.current[index],
                    freight: e.target.value * selectedRequest.quantity,
                    totalAmount: incotermSettings[index]?.totalPrice ? e.target.value * selectedRequest.quantity + incotermSettings[index].totalPrice : 0
                }
            }
        } else if (terms === "CIF") {
            if (e.target.name === "price") {
                incotermRef.current[index] = {
                    ...incotermRef.current[index],
                    totalPrice: e.target.value * selectedRequest.quantity,
                    insurance: ((0.015) * (e.target.value * selectedRequest.quantity)),
                    totalAmount: (incotermSettings[index]?.freight && incotermSettings[index]?.insurance) ? ((0.015) * (e.target.value * selectedRequest.quantity)) + incotermSettings[index]?.freight + (e.target.value * selectedRequest.quantity) : 0
                }
            } else if (e.target.name === "freightRate") {
                incotermRef.current[index] = {
                    ...incotermRef.current[index],
                    freight: e.target.value * selectedRequest.quantity,
                    totalAmount: incotermSettings[index]?.totalPrice ? (e.target.value * selectedRequest.quantity) + incotermSettings[index].insurance + incotermSettings[index].totalPrice : 0
                }
            }
        }

        setIncotermSettings([...incotermRef.current]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: SEND_REQUEST });
        const merchantService = new MerchantService();
        try {
            const payload = { incotermArray: incotermSettings, requestID: selectedRequestId }
            const { errors } = await merchantService.postOffer(payload);
            if (errors.length === 0) {
                dispatch({ type: REQUEST_SUCCESSFUL });
                handleCloseDrawer();
                handleSuccessfulRequest("You will be notified immediately the buyer accepts your quotation", 3000);
                handleCloseDialogConfirm();
                setRefreshTable(prev => !prev);
            } else {
                dispatch({ type: REQUEST_FAILED });
                handleFailedRequest("Problem completing request", 5000);
            }
        } catch (error) {
            dispatch({ type: REQUEST_FAILED });
            handleFailedRequest("Problem completing request", 5000);
        }
    };

    const handleSuccessfulRequest = (message, timeOut) => {
        const payload = {
            severity: "success",
            message,
            timeOut
        }
        rootDispatch(setAlert(payload));
    }

    const handleFailedRequest = (message, timeOut) => {
        const payload = {
            severity: "error",
            message,
            timeOut
        }
        rootDispatch(setAlert(payload));
    }

    useEffect(() => {
        selectedRequest && setOpenDrawer(true);
    }, [selectedRequest]);

    const list = () => (
        selectedRequest &&
        <Box
            component="form"
            role="presentation"
            onSubmit={handleClickOpenDialogConfirm}
            autoComplete="off"
        >
            <div className="requests-sections-body">
                <div className="requests-title-container">
                    <div>Request {selectedRequest.requestNo}</div>
                </div>
                <div className="requests-sections-container">
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
                            <div>
                                <span>Volume per container:</span>
                                <span>{selectedRequest.volume} {selectedRequest.volumeUnit}</span>
                            </div>
                        </div>
                    </section>

                    <section>
                        <div className="requests-section-title">Specifications</div>
                        <div className="request-section-body">
                            <div>
                                <span>Length:</span>
                                <span className="toLower">{selectedRequest.length} {selectedRequest.lengthUnit}</span>
                            </div>
                            {
                                selectedRequest.product === PRODUCTS.TEAK_SQUARE_LOGS &&
                                <>
                                    <div>
                                        <span>Thickness:</span>
                                        <span className="toLower">{selectedRequest.thickness} {selectedRequest.thicknessUnit}</span>
                                    </div>
                                    <div>
                                        <span>Width:</span>
                                        <span className="toLower">{selectedRequest.width} {selectedRequest.widthUnit}</span>
                                    </div>
                                    <div>
                                        <span>Drying:</span>
                                        <span>{selectedRequest.drying}</span>
                                    </div>
                                </>
                            }
                            {
                                selectedRequest.product === PRODUCTS.TEAK_ROUND_LOGS &&
                                <>
                                    <div>
                                        <span>Diameter:</span>
                                        <span className="toLower">{selectedRequest.diameter} {selectedRequest.diameterUnit}</span>
                                    </div>
                                </>
                            }
                            <div>
                                <span>Quantity:</span>
                                <span>{selectedRequest.quantity} {selectedRequest.containerSize}</span>
                            </div>
                        </div>
                    </section>

                    <section>
                        <div className="requests-section-title">Pricing and Delivery Information</div>
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

                    <section>
                        <div className="requests-section-title">Incoterm</div>
                        <div>
                            <div className="incoterm-settings-table-container">
                                <table>
                                    <thead>
                                        <tr className="incoterm-setting-heading-container">
                                            <th>Number</th>
                                            {selectedRequest.product === PRODUCTS.TEAK_ROUND_LOGS && <th>Diameter (cm)</th>}
                                            <th>Pieces/container</th>
                                            <th>Price/container</th>
                                            <th>Total price</th>
                                            {selectedRequest.terms === "CIF" && <th>Insurance</th>}
                                            {(selectedRequest.terms === "CIF" || selectedRequest.terms === "CFR") && <th>Freight Rate</th>}
                                            {(selectedRequest.terms === "CIF" || selectedRequest.terms === "CFR") && <th>Freight</th>}
                                            <th>Total amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            Array.from(Array(incotermRows)).map((_row, index) =>
                                                <tr key={index + 1}>
                                                    <td><input placeholder="eg 40-50" required type="text" onChange={(e) => handleChange(e, index, selectedRequest.terms)} name="number" value={index + 1} disabled /></td>
                                                    {selectedRequest.product === PRODUCTS.TEAK_ROUND_LOGS && <td><input placeholder="eg 40-50" required type="text" onChange={(e) => handleChange(e, index, selectedRequest.terms)} name="diameter" /></td>}
                                                    <td><input placeholder="eg 40-50" required type="text" onChange={(e) => handleChange(e, index, selectedRequest.terms)} name="noOfPieces" /></td>
                                                    <td><input placeholder="0" required type="number" onChange={(e) => handleChange(e, index, selectedRequest.terms)} name="price" /></td>
                                                    <td><input placeholder="0" required type="number" disabled onChange={(e) => handleChange(e, index, selectedRequest.terms)} name="totalPrice" value={incotermSettings[index]?.totalPrice ? incotermSettings[index]?.totalPrice : 0} /></td>
                                                    {selectedRequest.terms === "CIF" && <td><input placeholder="0" required type="number" disabled onChange={(e) => handleChange(e, index, selectedRequest.terms)} name="insurance" value={incotermSettings[index]?.insurance ? incotermSettings[index]?.insurance : 0} /></td>}
                                                    {(selectedRequest.terms === "CIF" || selectedRequest.terms === "CFR") && <td><input placeholder="0" required type="number" onChange={(e) => handleChange(e, index, selectedRequest.terms)} name="freightRate" /></td>}
                                                    {(selectedRequest.terms === "CIF" || selectedRequest.terms === "CFR") && <td><input placeholder="0" required type="number" disabled value={incotermSettings[index]?.freight ? incotermSettings[index]?.freight : 0} onChange={(e) => handleChange(e, index, selectedRequest.terms)} name="freight" /></td>}
                                                    <td><input required type="number" disabled value={incotermSettings[index]?.totalAmount ? incotermSettings[index]?.totalAmount : 0} /></td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <div className="incoterm-settings-table-note-container">Kindly note that all prices are quoted in ($)</div>
                        </div>
                    </section>

                    <section>
                        <div className="incoterm-settings-size-container">
                            <div onClick={() => handleIncotermSize(TYPE.INCREASE)}>
                                <span><AddCircleOutlineRoundedIcon /></span>
                                <span>add new field</span>
                            </div>
                            {
                                incotermRows > 1 &&
                                <div onClick={() => handleIncotermSize(TYPE.DECREASE)}>
                                    <span><RemoveCircleOutlineRoundedIcon /></span>
                                    <span>remove last field</span>
                                </div>
                            }
                        </div>
                    </section>

                    <section>
                        <div className="incoterm-settings-note-container">
                            <div>Additional Notes for {selectedRequest.terms} </div>
                            {INCOTERM_NOTES[selectedRequest.terms]}
                        </div>
                    </section>

                    <section>
                        <div>
                            <div className="button-controller"><SmallSecondary type="submit" variant="contained" >Post Quote</SmallSecondary></div>
                        </div>
                    </section>
                </div>
            </div>
        </Box>
    );


    useEffect(() => {
        const abortController = new AbortController();
        const fetchData = async () => {
            setRowsLoading(true);
            const merchantService = new MerchantService();
            try {
                const { data, errors } = await merchantService.getRequests(abortController.signal);
                if (errors.length === 0) {
                    const { totalCount } = data.data;
                    const newPaginationCount = Math.ceil(totalCount / 5);
                    setPagination(newPaginationCount);
                    const filteredData = data.data.data;
                    filteredData.map((request, index) => {
                        request.index = index + 1;
                        request.id = request._id;
                        request.product = request.quotationProducts[0].product.name;
                        request.terms = request.buyerQuotationIncoterm.label;
                        request.quantity = request.quotationProducts[0].specification.quantity;
                        request.diameter = request?.quotationProducts[0]?.specification?.diameter;
                        request.diameterUnit = request?.quotationProducts[0]?.specification?.diameterUnit;
                        request.drying = request?.quotationProducts[0]?.specification?.drying?.label;
                        request.length = request?.quotationProducts[0]?.specification.length;
                        request.thickness = request?.quotationProducts[0]?.specification.thickness;
                        request.width = request.quotationProducts[0].specification.width;
                        request.lengthUnit = request?.quotationProducts[0]?.specification?.lengthUnit;
                        request.thicknessUnit = request.quotationProducts[0].specification.thicknessUnit;
                        request.widthUnit = request?.quotationProducts[0]?.specification?.widthUnit;
                        request.species = request.quotationProducts[0].product.species.label;
                        request.speciesType = request.quotationProducts[0].product.species.type.label;
                        request.origin = request.quotationProducts[0].product.origin.country;
                        request.containerSize = request.quotationProducts[0].product.supportedShippingContainers[0].label;
                        request.volume = request.quotationProducts[0].product.volume.value;
                        request.volumeUnit = request.quotationProducts[0].product.volume.unit;
                        request.createdOn = new Date(request.createdOn).toUTCString().slice(0, 25);
                        return 1;
                    })
                    setRows(filteredData);
                }
            } catch (error) { }

            setRowsLoading(false);
        }

        fetchData();
        return () => abortController.abort();
    }, [refreshTable]);

    return (
        <div className="Requests-Tables">
            <div>
                <Dialog
                    open={openDialogConfirm}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleCloseDialogConfirm}
                    aria-describedby="alert-dialog-slide-description"
                    sx={dialogStyle}
                >
                    <DialogTitle>{"Agree to post the offer?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            Do you post this offer to the buyer?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <GenericSecondary variant="text" onClick={handleCloseDialogConfirm}>Disagree</GenericSecondary>
                        <GenericPrimaryButton variant="contained" loading={state.requestState.loading} onClick={handleSubmit}>Agree</GenericPrimaryButton>
                    </DialogActions>
                </Dialog>
            </div>

            <div>
                <Modal
                    open={openDrawer}
                    onClose={handleCloseDrawer}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    className="modal-container"
                >
                    <Box sx={inAppWider}>
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
            <div>
                {
                    rowsLoading ? <div className="dash-item-loading-container"> <CircularProgress color="inherit" /></div> :
                        rows &&
                            rows.length > 0 ?
                            <div className="requests-section-container">
                                {
                                    rows.slice(((5 * page) - 5), ((page * 5) - 1)).map((row, index) =>
                                        <section onClick={() => selectRequest(row.id)} key={index}>
                                            <div>Request Number {row.requestNo}</div>
                                            <div>{row.destination}</div>
                                            <div>{row.createdOn}</div>
                                            <div>Product: {row.product}</div>
                                        </section>
                                    )}
                                <div className="pagination-container">
                                    <Pagination showFirstButton showLastButton onChange={handlePaginationChange} siblingCount={2} boundaryCount={0} count={paginationCount} />
                                </div>
                            </div>
                            :
                            <div className="dash-item-no-data-container">You have no requests at this time</div>
                }
            </div>
        </div>
    );
}

export default Requests;