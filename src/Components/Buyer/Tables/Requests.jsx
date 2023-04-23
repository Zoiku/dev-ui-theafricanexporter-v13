import { DataGrid } from "@mui/x-data-grid";
import LinearProgress from '@mui/material/LinearProgress';
import Toolbar from "../../../Material/Toolbar";
import { SmallPrimary, SmallSecondary } from "../../../Material/Button";
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import { Puller } from "../../../Material/Drawer";
import BuyerService from "../../../Services/Buyer";
import Countdown from "../../Countdown";
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import { StyledBadge } from "../../../Material/Badge";
import IconButton from '@mui/material/IconButton';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { useReducer } from "react";
import { INITIAL_STATE, formReducer } from "../../../Reducers/FormReducer"
import { REQUEST_FAILED, REQUEST_SUCCESSFUL, SEND_REQUEST } from "../../../Reducers/Actions"
import Tooltip from "@mui/material/Tooltip";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch } from "react-redux";
import { setAlert } from "../../../Redux/Features/Alert.js";
import Modal from '@mui/material/Modal';
import { inAppWide, inAppWider } from "../../../Styles/Modal";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Overlay from "../../../Material/Overlay";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Transition } from "../../../Material/Dialog";
import { GenericSecondary, GenericPrimaryButton } from "../../../Material/Button";
import { inAppDialog } from "../../../Styles/Dialog";

const PRODUCTS = {
    TEAK_SQUARE_LOGS: "Teak Square Logs",
    TEAK_ROUND_LOGS: "Teak Round Logs",
}

const Requests = () => {
    const [requestedQuantity, setRequestedQuantity] = useState(0);
    const [offerSelections, setOfferSelections] = useState([]);
    const [canPlaceOrder, setCanPlaceOrder] = useState(false);
    const [viewOfferLoading, setViewOfferLoading] = useState(false);
    const rootDispatch = useDispatch();
    const [refreshTable, setRefreshTable] = useState(false);
    const [companyProfile, setCompanyProfile] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [state, dispatch] = useReducer(formReducer, INITIAL_STATE);
    const [revealCompanyProfile, setRevealCompanyProfile] = useState(false);
    const toggleCompanyProfile = (open) => (_event) => {
        setRevealCompanyProfile(open);
    };

    const iOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);
    const [rows, setRows] = useState([]);
    const [rowsLoading, setRowsLoading] = useState(false);
    const [pageSize, setPageSize] = useState(10);

    const [selectedRequestId, setSelectedRequestId] = useState(null);
    const selectRequest = (id) => setSelectedRequestId(id);
    const selectedRequest = rows && rows.find(row => row.id === selectedRequestId);

    const [openDrawer, setOpenDrawer] = useState(false);
    const toggleDrawer = (open) => (_event) => {
        setOpenDrawer(open);
    };
    const handleCloseDrawer = () => {
        setOpenDrawer(false);
        setSelectedRequestId(null);
    }

    const [openDialogConfirm, setOpenDialogConfirm] = useState(false);
    const handleClickOpenDialogConfirm = () => {
        setOpenDialogConfirm(true);
    };
    const handleCloseDialogConfirm = () => {
        setOpenDialogConfirm(false);
    };

    const [selectedOffers, setSelectedOffers] = useState(null);
    const handleSelectRequestOffers = (offers, requestedQuantity) => {
        setRequestedQuantity(requestedQuantity)
        const _offers = offers.map((_offer) => {
            return {
                id: _offer?.id,
                index: _offer?.index,
                company: _offer?.merchant?.companyName,
                expiryDate: _offer?.expiryDate,
                destination: _offer?.destination,
                quantity: _offer?.offerQuantity,
                requestNo: _offer?.requestNo,
                offer: _offer,
            }
        })

        setSelectedOffers(_offers);
        setOpenDrawerOffers(true);
    };
    const [openDrawerOffers, setOpenDrawerOffers] = useState(false);
    const toggleDrawerOffers = (open) => (_event) => { setOpenDrawerOffers(open) };
    const handleCloseDrawerOffers = () => {
        setOpenDrawerOffers(false);
        setSelectedOffers(null);
    };

    const [selectedOffer, setSelectedOffer] = useState(null);
    const handleSelectRequestOffer = async (offer) => {
        setViewOfferLoading(true);
        const { id } = offer.merchant;
        const buyerService = new BuyerService();
        try {
            const { errors, data } = await buyerService.getCompany(id);
            if (errors.length === 0) {
                const filteredData = data.data.data;
                filteredData.map(company => {
                    company.businessType = company.type.label;
                    company.memberSince = new Date(company.type.createdOn).toUTCString().slice(0, 16);
                    company.yearEstablished = company.company.year;
                    company.employees = company.company.noOfEmployees;
                    company.supplyAbility = company.company.supplyAbility;
                    return 1;
                });
                setSelectedOffer(offer);
                setOpenDrawerOffer(true);
                setCompanyProfile(filteredData[0]);
            }
        } catch (error) { }
        setViewOfferLoading(false);
    };
    const [openDrawerOffer, setOpenDrawerOffer] = useState(false);
    const toggleDrawerOffer = (open) => (_event) => { setOpenDrawerOffer(open) };
    const handleCloseDrawerOffer = () => {
        setOpenDrawerOffer(false);
        setSelectedOffer(null);
        setRevealCompanyProfile(false);
    };

    const handleClick = (event, id) => {
        setAnchorEl(event.currentTarget);
        selectRequest(id);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleMultipleSelect = (offeringIds) => {
        const selections = selectedOffers.filter(offer => offeringIds.includes(offer.id))
        const userSelection = selections.map(offer => {
            return {
                offerID: offer.id,
                merchantID: offer.offer.merchant.id,
                orderQuantity: offer.quantity
            }
        })

        const handleRequestedQuantity = () => {
            const totalSelectedOfferQuantity = userSelection.reduce((previousVal, currentVal) => {
                return previousVal + currentVal.orderQuantity;
            }, 0);

            if (totalSelectedOfferQuantity === requestedQuantity) {
                setCanPlaceOrder(true);
                setOfferSelections(userSelection);
            } else {
                setCanPlaceOrder(false);
                setOfferSelections([]);
            }
        }

        handleRequestedQuantity();
    }

    const More = ({ id }) => (
        <div>
            <Box sx={{ display: "flex", alignItems: "center", textAlign: "center", position: "relative" }}>
                <Tooltip title="More">
                    <IconButton
                        onClick={event => handleClick(event, id)}
                        size="small"
                    >
                        <MoreHorizIcon />
                    </IconButton>
                </Tooltip>
            </Box>
        </div >
    );

    const columns = [
        { field: "index", headerName: "Number", width: 80 },
        { field: "requestNo", headerName: "Request #", width: 100 },
        { field: "product", headerName: "Product", width: 150 },
        { field: "quantity", headerName: "Quantity", width: 100 },
        { field: "timeLeft", headerName: "TimeLeft", width: 100, renderCell: ({ row }) => <div> <Countdown endDate={row.expiryDate} /> </div> },
        { field: "totalOffers", headerName: "Offers", width: 100, renderCell: ({ row }) => <div><IconButton onClick={() => handleSelectRequestOffers(row.offers, row.quantity)} aria-label="cart"><StyledBadge showZero badgeContent={row.offers.length} color="primary"><RequestQuoteIcon /></StyledBadge></IconButton></div> },
        { field: "more", headerName: "", width: 30, renderCell: ({ row }) => <div className="simple-center-div"><More id={row.id} /></div> },
    ];

    const columnsOffers = [
        { field: "index", headerName: "Number", width: 80 },
        { field: "requestNo", headerName: "Number", width: 100 },
        { field: "company", headerName: "Company", width: 130 },
        { field: "quantity", headerName: "Quantity", width: 100 },
        { field: "destination", headerName: "Destination", width: 150 },
        { field: "expiryDate", headerName: "Date", width: 150 },
        { field: "more", headerName: "", width: 80, renderCell: ({ row }) => <SmallPrimary loading={viewOfferLoading} onClick={() => handleSelectRequestOffer(row?.offer)} size="small" variant="contained">View</SmallPrimary> },
    ];

    const handleOrderSubmit = async () => {
        dispatch({ type: SEND_REQUEST });
        const buyerService = new BuyerService();

        try {
            const { errors } = await buyerService.acceptOffer(offerSelections);
            if (errors.length === 0) {
                dispatch({ type: REQUEST_SUCCESSFUL });
                handleSuccessfullRequest("Your order was successfully placed", 3000);
                setRefreshTable(prev => !prev);
                handleCloseDrawerOffers();
                handleCloseDrawerOffer();
            } else {
                dispatch({ type: REQUEST_FAILED });
                handleFailedRequest("Order could not be processed, please try again", 5000);
            }
        } catch (error) { }
    }

    const handleRepost = async () => {
        dispatch({ type: SEND_REQUEST });
        const { id } = selectedRequest;
        const buyerService = new BuyerService();
        try {
            const { errors } = await buyerService.repostRequest(id);
            if (errors.length === 0) {
                dispatch({ type: REQUEST_SUCCESSFUL });
                handleSuccessfullRequest("Your request has been reposted successfully", 3000);
                handleCloseDialogConfirm();
                setRefreshTable(prev => !prev);
            } else {
                dispatch({ type: REQUEST_FAILED });
                handleFailedRequest("Problem processing request, please try again", 5000);
            }
        } catch (error) { }
    }

    const handleSuccessfullRequest = (message, timeOut) => {
        const payload = {
            severity: "success",
            message,
            timeOut
        }
        rootDispatch(setAlert(payload));
    };

    const handleFailedRequest = (message, timeOut) => {
        const payload = {
            severity: "error",
            message,
            timeOut
        }
        rootDispatch(setAlert(payload));
    };

    const list = () => (
        selectedRequest &&
        <Box role="presentation" >
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
                </div>
            </div>
        </Box>
    );

    const listOffers = () => (
        selectedOffers &&
        <Box role="presentation">
            <div>
                <div className="offers-data-grid-container">
                    <DataGrid
                        components={{ LoadingOverlay: LinearProgress, NoRowsOverlay: () => <Overlay label="Offers" /> }}
                        className="offers-standard-table"
                        checkboxSelection
                        disableSelectionOnClick
                        rows={selectedOffers}
                        columns={columnsOffers}
                        density="compact"
                        onSelectionModelChange={handleMultipleSelect}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                    />
                </div>

                <div style={{ display: "flex", justifyContent: "center" }}>
                    <SmallSecondary disabled={!canPlaceOrder} loading={state.requestState.loading} onClick={handleOrderSubmit} variant="contained">Place Order</SmallSecondary>
                </div>
            </div>
        </Box>
    );

    const listOffer = () => (
        selectedOffer &&
        <Box role="presentation">
            <div className="requests-sections-body">
                <div className="requests-section-title">Request Summary</div>
                <section className="view-offer-company-profile-section">
                    <div><span>Request:</span> <span>Request {selectedOffer.requestNo}</span></div>
                    <div><span>Product:</span> <span>{selectedOffer.product}</span></div>
                    <div><span>Terms:</span> <span>{selectedOffer.terms}</span></div>
                    <div><span>Merchant:</span> <span>{selectedOffer.merchant.firstName} {selectedOffer.merchant.lastName}</span></div>
                    <div><span>Company:</span> <span>{selectedOffer.merchant.companyName}</span></div>
                    <div><span>Destination:</span> <span>{selectedOffer.destination}</span></div>
                </section>

                <section>
                    <div>
                        <div className="requests-section-title">Incoterm</div>
                        <div className="incoterm-settings-table-container">
                            <table>
                                <thead>
                                    <tr className="incoterm-setting-heading-container">
                                        <th>Number</th>
                                        {(selectedOffer.product === "Teak Round Logs" && selectedOffer.terms !== "FOB") && <th>Diameter (cm)</th>}
                                        <th>CBM</th>
                                        <th>Price per CBM</th>
                                        <th>Pieces/container</th>
                                        <th>Price/container</th>
                                        <th>Total price</th>
                                        {selectedOffer.terms === "CIF" && <th>Insurance</th>}
                                        {selectedOffer.terms !== "FOB" && <th>Total Freight</th>}
                                        <th>Total amount</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {
                                        selectedOffer.incotermRows.length > 0 ?
                                            selectedOffer?.incotermRows.map((incoterm, index) =>
                                                <tr key={index + 1}>
                                                    <td><input disabled defaultValue={index + 1} /></td>
                                                    {(selectedOffer.product === "Teak Round Logs" && selectedOffer.terms !== "FOB") && <td><input disabled defaultValue={incoterm.diameter} /></td>}
                                                    <td><input disabled defaultValue={incoterm?.cbm} /></td>
                                                    <td><input disabled defaultValue={incoterm?.cbmprice} /></td>
                                                    <td><input disabled defaultValue={incoterm?.noOfPieces} /></td>
                                                    <td><input disabled defaultValue={incoterm?.price} /></td>
                                                    <td><input disabled defaultValue={incoterm?.totalPrice} /></td>
                                                    {selectedOffer.terms === "CIF" && <td><input disabled defaultValue={incoterm?.insurance} /></td>}
                                                    {selectedOffer.terms !== "FOB" && <td><input disabled defaultValue={incoterm?.costOfFreight} /></td>}
                                                    <td><input disabled defaultValue={incoterm.totalAmount} /></td>
                                                </tr>
                                            ) :
                                            <tr>
                                                <td><input disabled defaultValue="--" /></td>
                                                {selectedOffer.terms !== "FOB" && <td><input disabled defaultValue="--" /></td>}
                                                <td><input disabled defaultValue="--" /></td>
                                                <td><input disabled defaultValue="--" /></td>
                                                <td><input disabled defaultValue="--" /></td>
                                                <td><input disabled value="--" /></td>
                                                <td><input disabled value="--" /></td>
                                                {selectedOffer.terms === "CIF" && <td><input disabled defaultValue="--" /></td>}
                                                {selectedOffer.terms !== "FOB" && <td><input disabled defaultValue="--" /></td>}
                                                <td><input disabled defaultValue="--" /></td>
                                            </tr>
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div className="incoterm-settings-table-note-container">Kindly note that all prices are quoted in ($)</div>
                    </div>
                </section>
                
                <section className="request-offer-company-profile-section">
                    <div>
                        <div>Company Profile</div>
                        {
                            !revealCompanyProfile ? <IconButton onClick={toggleCompanyProfile(true)}><ArrowDropDownIcon /></IconButton> : <IconButton onClick={toggleCompanyProfile(false)}><ArrowDropUpIcon /></IconButton>
                        }
                    </div>

                    {
                        revealCompanyProfile &&
                        companyProfile &&
                        <div>
                            <div><span>Business Type</span><span>{companyProfile.businessType}</span></div>
                            <div><span>Member Since</span><span>{companyProfile.memberSince}</span></div>
                            <div><span>Year Established</span><span>{companyProfile.yearEstablished}</span></div>
                            <div><span>No of Employees</span><span>{companyProfile.employees}</span></div>
                            <div><span>Products</span> <span>{companyProfile.subscription.map((product, index) => <span key={index} className="special-products-container"><span>{product.product} {companyProfile.subscription.length !== index + 1 && "& "}</span></span>)}</span> </div>
                            <div><span>Supply Ability</span><span>{companyProfile.supplyAbility}</span></div>
                        </div>
                    }
                </section>
            </div>
        </Box>
    );

    useEffect(() => {
        const abortController = new AbortController();
        const fetchData = async () => {
            setRowsLoading(true);
            const buyerService = new BuyerService();
            try {
                const { data, errors } = await buyerService.getRequests(abortController.signal);
                if (errors.length === 0) {
                    const filteredData = data.data.data;
                    await Promise.all(filteredData.map(async (request, index) => {
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
                        request.expiryDate = new Date(request.expiryDate).toUTCString().slice(0, 25);
                        request.offers = (await (await buyerService.getOffers(request._id)).data.data.data).map((offer, index) => {
                            offer.index = index + 1;
                            offer.requestId = request._id;
                            offer.product = offer.request.quotationProducts[0].product.name;
                            offer.destination = offer.request.destination;
                            offer.incotermRows = offer.buyerQuotationRequestIncoterm;
                            offer.requestNo = offer.request.requestNo;
                            offer.terms = offer.request.buyerQuotationIncoterm.label;
                            offer.expiryDate = new Date(offer.createdOn).toUTCString().slice(0, 16);
                            offer.merchant = {
                                firstName: offer.merchant.firstName,
                                lastName: offer.merchant.lastName,
                                email: offer.merchant.email,
                                mobileNo: offer.merchant.mobileNo,
                                companyName: offer.merchant.companyName,
                                role: offer.merchant.role,
                                id: offer?.merchant?.id
                            };
                            return offer;
                        });
                        return 1;
                    }));

                    setRows(filteredData);
                }
            } catch (error) { }
            setRowsLoading(false);
        }

        fetchData();
        return () => abortController.abort();
    }, [refreshTable]);

    return (
        <div className="Requests-Table">
            <div>
                <Dialog
                    open={openDialogConfirm}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleCloseDialogConfirm}
                    aria-describedby="alert-dialog-slide-description"
                    sx={inAppDialog}
                    className="inAppDialog"
                >
                    <DialogTitle>{"Repost request?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            Do you agree to repost this request?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <GenericSecondary variant="text" onClick={handleCloseDialogConfirm}>Disagree</GenericSecondary>
                        <GenericPrimaryButton variant="contained" loading={state.requestState.loading} onClick={handleRepost}>Agree</GenericPrimaryButton>
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
                <Modal
                    open={openDrawerOffers}
                    onClose={handleCloseDrawerOffers}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    className="modal-container"
                >
                    <Box sx={inAppWider}>
                        <div className="modal-title-container">
                            <div>View Offers</div>
                            <div><CloseRoundedIcon onClick={handleCloseDrawerOffers} /></div>
                        </div>

                        <div className="modal-body">
                            <div className="dash-items-title-container">
                                <div>Offers List</div>
                                <div>Complete list of all offers</div>
                            </div>

                            {listOffers()}
                        </div>
                    </Box>
                </Modal>
            </div>

            <div>
                <Modal
                    open={openDrawerOffer}
                    onClose={handleCloseDrawerOffer}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    className="modal-container"
                >
                    <Box sx={inAppWide}>
                        <div className="modal-title-container">
                            <div>View Offer</div>
                            <div><CloseRoundedIcon onClick={handleCloseDrawerOffer} /></div>
                        </div>

                        <div className="modal-body">
                            {listOffer()}
                        </div>
                    </Box>
                </Modal>
            </div>

            <div>
                <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                    <MenuItem onClick={toggleDrawer(true)}>
                        View Request
                    </MenuItem>

                    {
                        selectedRequest &&
                        new Date() > new Date(selectedRequest.expiryDate) &&
                        <MenuItem onClick={handleClickOpenDialogConfirm}>
                            Repost Request
                        </MenuItem>
                    }
                </Menu>
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

                <SwipeableDrawer
                    className="drawer-container"
                    variant="temporary"
                    anchor="bottom"
                    open={openDrawerOffers}
                    onOpen={toggleDrawerOffers(true)}
                    onClose={handleCloseDrawerOffers}
                    disableBackdropTransition={!iOS} disableDiscovery={iOS}
                >
                    <div className="drawer-title-container">
                        <div>Offers List</div>
                        <Puller />
                    </div>

                    <div className="drawer-body">
                        {listOffers()}
                    </div>
                </SwipeableDrawer>

                <SwipeableDrawer
                    className="drawer-container"
                    variant="temporary"
                    anchor="bottom"
                    open={openDrawerOffer}
                    onOpen={toggleDrawerOffer(true)}
                    onClose={handleCloseDrawerOffer}
                    disableBackdropTransition={!iOS} disableDiscovery={iOS}
                >
                    <div className="drawer-title-container">
                        <div>Offer Details</div>
                        <Puller />
                    </div>

                    <div className="drawer-body">
                        {listOffer()}
                    </div>
                </SwipeableDrawer>
            </div>

            <DataGrid
                components={{ Toolbar: Toolbar, LoadingOverlay: LinearProgress, NoRowsOverlay: () => <Overlay label="Requests" /> }}
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

export default Requests;