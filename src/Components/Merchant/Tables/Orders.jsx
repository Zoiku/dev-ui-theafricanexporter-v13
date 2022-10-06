import { DataGrid } from "@mui/x-data-grid";
import LinearProgress from '@mui/material/LinearProgress';
import Toolbar from "../../../Material/Toolbar";
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { useState, useEffect, useReducer } from "react";
import Box from '@mui/material/Box';
import { Puller } from "../../../Material/Drawer";
import MerchantService from "../../../Services/Merchant";
import Countdown from "../../Countdown";
import "../../../Styles/Order.css";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import { useDispatch } from "react-redux";
import { setAlert } from "../../../Redux/Features/Alert.js";
import Tooltip from "@mui/material/Tooltip";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from '@mui/material/IconButton';
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
import { INITIAL_STATE, formReducer } from "../../../Reducers/FormReducer";
import { REQUEST_FAILED, REQUEST_SUCCESSFUL, SEND_REQUEST } from "../../../Reducers/Actions";
import { dialogStyle } from "../../../Styles/Dialog";
import Overlay from "../../../Material/Overlay";

const ORDER_STATUS_LEVELS = {
    RECEIVED: 10,
    CONFIRMED: 30,
    "AWAITING PROOF OF PAYMENT": 30,
    "PROOF OF PAYMENT APPROVED": 40,
    PROCESSING: 60,
    SHIPPED: 80,
    DELIVERED: 100
};

const ORDER_STATUS_STEPS = {
    RECEIVED: 0,
    CONFIRMED: 2,
    "AWAITING PROOF OF PAYMENT": 2,
    "PROOF OF PAYMENT APPROVED": 3,
    PROCESSING: 4,
    SHIPPED: 5,
    DELIVERED: 6,
};

const steps = [
    {
        label: 'Order placed',
        description: "Order has been placed",
    },
    {
        label: "Confirm Order",
        description: "Confirm the order",
    },
    {
        label: "Order Approved",
        description: "Order is pending approvial",
    },
    {
        label: "Processing",
        description: "Please wait while the order is being processed",
    },
    {
        label: "Shipped",
        description: "The order is being shipped",
    },
    {
        label: "Delivered",
        description: "The order is being delivered",
    },
];

const ProgressBar = ({ status }) => {
    return (
        <div className="progress-bar-container">
            <div>
                <span>{ORDER_STATUS_LEVELS[status]}% Complete</span>
            </div>
            <div>
                <progress className="order-status-progress" max="100" value={ORDER_STATUS_LEVELS[status]} />
            </div>
        </div>
    )
};

const Orders = () => {
    const [state, dispatch] = useReducer(formReducer, INITIAL_STATE);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [refreshTable, setRefreshTable] = useState(false);
    const rootDispatch = useDispatch();
    const iOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);
    const [rows, setRows] = useState([]);
    const [rowsLoading, setRowsLoading] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const selectOrder = (id) => setSelectedOrderId(id);
    const selectedOrder = rows && rows.find(row => row.id === selectedOrderId);

    const [openDialogConfirm, setOpenDialogConfirm] = useState(false);
    const handleClickOpenDialogConfirm = () => {
        setOpenDialogConfirm(true);
    };
    const handleCloseDialogConfirm = () => {
        setOpenDialogConfirm(false);
    };

    const [openDialogReject, setOpenDialogReject] = useState(false);
    const handleClickOpenDialogReject = () => {
        setOpenDialogReject(true);
    };
    const handleCloseDialogReject = () => {
        setOpenDialogReject(false);
    };

    const handleClick = (event, id) => {
        setAnchorEl(event.currentTarget);
        selectOrder(id);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [openDrawer, setOpenDrawer] = useState(false);
    const toggleDrawer = (open) => (_event) => {
        setOpenDrawer(open);
    };

    const handleCloseDrawer = () => {
        setOpenDrawer(false);
        setSelectedOrderId(null);
    }

    const handleConfirmOrder = async () => {
        dispatch({ type: SEND_REQUEST });
        const { id } = selectedOrder;
        const merchantService = new MerchantService();
        try {
            const { errors } = await merchantService.orderConfirmation(id);
            if (errors.length === 0) {
                dispatch({ type: REQUEST_SUCCESSFUL });
                setRefreshTable(prev => !prev);
                handleSuccessfulRequest("You will be notified immediately the buyer confirms the order", 3000);
                handleCloseDialogConfirm();
            } else {
                dispatch({ type: REQUEST_FAILED });
                handleFailedRequest("Could not process your request", 5000);
            }
        } catch (error) { }
    };

    const handleCancelOrder = async () => {
        dispatch({ type: SEND_REQUEST });
        const { id } = selectedOrder;
        const merchantService = new MerchantService();
        try {
            const { errors } = await merchantService.orderRejection(id);
            if (errors.length === 0) {
                dispatch({ type: REQUEST_SUCCESSFUL });
                setRefreshTable(prev => !prev);
                handleSuccessfulRequest("Order rejected, the buyer will be notified.", 3000);
                handleCloseDialogReject();
            } else {
                dispatch({ type: REQUEST_FAILED });
                handleFailedRequest("Could not process your request", 5000);
            }
        } catch (error) { }
    };

    const handleFailedRequest = (message, timeOut) => {
        const payload = {
            severity: "error",
            message,
            timeOut
        }
        rootDispatch(setAlert(payload));
    };

    const handleSuccessfulRequest = (message, timeOut) => {
        const payload = {
            severity: "success",
            message,
            timeOut
        }
        rootDispatch(setAlert(payload));
    };

    const More = ({ id }) => (
        <div>
            <Box sx={{ display: "flex", alignItems: "center", textAlign: "center", position: "relative" }}>
                <Tooltip title="More">
                    <IconButton
                        onClick={event => handleClick(event, id)}
                        size="small"
                        aria-controls={open ? "account-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                    >
                        <MoreHorizIcon />
                    </IconButton>
                </Tooltip>
            </Box>
        </div >
    );

    const columns = [
        { field: "index", headerName: "#", width: 50 },
        { field: "orderNo", headerName: "Order #", width: 100 },
        { field: "product", headerName: "Product", width: 200 },
        { field: "terms", headerName: "Terms", width: 70 },
        { field: "quantity", headerName: "Quantity", width: 90 },
        { field: "timeLeft", headerName: "TimeLeft", width: 100, renderCell: ({ row }) => <div> <Countdown endDate={row.expiryDate} /> </div> },
        { field: "status", headerName: "Status", width: 90 },
        { field: "action", headerName: "", width: 30, renderCell: ({ row }) => <div className="simple-center-div"><More id={row.id} /></div> },
    ];

    const list = (stepperOrientation) => (
        selectedOrder &&
        <Box role="presentation" >
            <div className="requests-sections-body">
                <div className="requests-title-container">
                    <div>Order {selectedOrder.orderNo}</div>
                </div>
                <div className="requests-sections-container">
                    <section>
                        <div className="requests-section-title">Order Summary</div>
                        <div className="request-section-body">
                            {
                                selectedOrder.status === "DELIVERED" &&
                                <div>
                                    <span>Buyer:</span>
                                    <span>{selectedOrder?.user?.firstName ? selectedOrder?.user?.firstName : "--"} {selectedOrder?.user?.lastName}</span>
                                </div>
                            }
                            <div>
                                <span>Product:</span>
                                <span>{selectedOrder.product}</span>
                            </div>
                            <div>
                                <span>Terms:</span>
                                <span>{selectedOrder.terms}</span>
                            </div>
                            <div>
                                <span>Quantity:</span>
                                <span>{selectedOrder.quantity} {selectedOrder.containerSize}</span>
                            </div>
                            <div>
                                <span>Requested Date:</span>
                                <span>{selectedOrder.createdOn}</span>
                            </div>
                        </div>
                    </section>

                    <section>
                        <div className="requests-section-title">Track Order</div>
                        <div className="order-section-body">
                            <div> <ProgressBar status={selectedOrder.status} /> </div>
                        </div>
                        <div className="order-section-stepper-container">
                            <Box fullWidth>
                                <Stepper activeStep={ORDER_STATUS_STEPS[selectedOrder.status]} orientation={stepperOrientation}>
                                    {steps.map((step) => (
                                        <Step key={step.label}>
                                            <StepLabel>
                                                {step.label}
                                            </StepLabel>
                                            {
                                                stepperOrientation === "vertical" &&
                                                <StepContent>
                                                    <div>{step.description}</div>
                                                    <Box sx={{ mb: 0 }}>
                                                        <div></div>
                                                    </Box>
                                                </StepContent>
                                            }
                                        </Step>
                                    ))}
                                </Stepper>
                            </Box>
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
                const { data, errors } = await merchantService.getOrders(abortController.signal);
                if (errors.length === 0) {
                    const filteredData = data.data.data;
                    filteredData.map((order, index) => {
                        order.index = index + 1;
                        order.id = order._id;
                        order.quantity = order.request.quotationProducts[0].specification.quantity;
                        order.terms = order.request.buyerQuotationIncoterm.label;
                        order.containerSize = order.request.quotationProducts[0].product.supportedShippingContainers[0].label;
                        order.product = order.request.quotationProducts[0].product.name;
                        order.createdOn = new Date(order.createdOn).toUTCString().slice(0, 16);
                        order.expiryDate = new Date(order?.request?.expiryDate).toUTCString().slice(0, 25);
                        return 1;
                    });
                    setRows(filteredData);
                }
            } catch (error) { }
            setRowsLoading(false);
        }

        fetchData();
        return () => abortController.abort();
    }, [refreshTable]);

    return (
        <div className="Orders-Table">
            <div>
                <Dialog
                    open={openDialogConfirm}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleCloseDialogConfirm}
                    aria-describedby="alert-dialog-slide-description"
                    sx={dialogStyle}
                >
                    <DialogTitle>{"Agree to accept the order?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            Do you agree to accept the buyer's order?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <GenericSecondary variant="text" onClick={handleCloseDialogConfirm}>Disagree</GenericSecondary>
                        <GenericPrimaryButton variant="contained" loading={state.requestState.loading} onClick={handleConfirmOrder}>Agree</GenericPrimaryButton>
                    </DialogActions>
                </Dialog>

                <Dialog
                    open={openDialogReject}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleCloseDialogReject}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle>{"Agree to reject the order?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            Do you agree to reject the buyer's order?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <GenericSecondary variant="text" onClick={handleCloseDialogReject}>Disagree</GenericSecondary>
                        <GenericPrimaryButton variant="contained" loading={state.requestState.loading} onClick={handleCancelOrder}>Agree</GenericPrimaryButton>
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
                            <div>Order Details</div>
                            <div><CloseRoundedIcon onClick={handleCloseDrawer} /></div>
                        </div>
                        <div className="modal-body">
                            {list("horizontal")}
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
                        View
                    </MenuItem>
                    {
                        selectedOrder &&
                        !selectedOrder.isConfirmed &&
                        <div>
                            <MenuItem onClick={handleClickOpenDialogConfirm}>
                                Confirm
                            </MenuItem>
                            <MenuItem onClick={handleClickOpenDialogReject}>
                                Reject
                            </MenuItem>
                        </div>
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
                        <div>Order Details</div>
                        <Puller />
                    </div>

                    <div className="drawer-body">
                        {list("vertical")}
                    </div>
                </SwipeableDrawer>
            </div>

            <DataGrid
                components={{ Toolbar: Toolbar, LoadingOverlay: LinearProgress, NoRowsOverlay: () => <Overlay label="Orders" /> }}
                className="standard-table"
                checkboxSelection
                disableSelectionOnClick
                pageSize={10}
                rows={rows}
                columns={columns}
                pagination
                density="compact"
                rowsPerPageOptions={[10, 20, 30, 40, 50]}
                loading={rowsLoading}
            />
        </div>
    )
}

export default Orders;