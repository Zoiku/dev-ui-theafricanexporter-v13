import { DataGrid } from "@mui/x-data-grid";
import LinearProgress from '@mui/material/LinearProgress';
import { CustomToolBar1 } from "../../../Material/Toolbar";
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import { Puller } from "../../../Material/Drawer";
import AdminService from "../../../Services/Admin";
import { IOSSwitch } from "../../../Material/Switches";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import { StyledBadge } from "../../../Material/Avatar";
import { setAlert, clearAlerts } from "../../../Redux/Features/Alert.js"
import { useDispatch } from "react-redux";
import { useReducer } from "react";
import { formReducer, INITIAL_STATE } from "../../../Reducers/FormReducer";
import { SEND_REQUEST, REQUEST_FAILED, REQUEST_SUCCESSFUL } from "../../../Reducers/Actions";
import Modal from '@mui/material/Modal';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { inAppSmall } from "../../../Styles/Modal";
import Overlay from "../../../Material/Overlay";

const UsersMerchant = () => {
    const [paging, setPaging] = useState({
        page: 1,
        size: 10,
        totalCount: 0
    });
    const handlePageChange = (page) => {
        setPaging({ ...paging, page: page + 1 })
    }
    const handlePageSizeChange = (size) => {
        setPaging({ ...paging, size: size })
    }
    const handleMultipleSelect = (values) => {
        setMultipleSelectedUsers(values);
    }

    const [refreshTable, setRefreshTable] = useState(false);
    // eslint-disable-next-line
    const [state, dispatch] = useReducer(formReducer, INITIAL_STATE);
    const [selectedUsers, setMultipleSelectedUsers] = useState([]);
    const rootDispatch = useDispatch();
    const iOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [rows, setRows] = useState([]);
    const [rowsLoading, setRowsLoading] = useState(false);
    const [selectedUserId, setSelectedOrderId] = useState(null);
    const selectUser = (id) => setSelectedOrderId(id);
    const selectedUser = rows && rows.find(row => row.id === selectedUserId);
    const [openDrawer, setOpenDrawer] = useState(false);
    const toggleDrawer = (open) => (_event) => {
        setOpenDrawer(open);
    };
    const handleClick = (event, id) => {
        setAnchorEl(event.currentTarget);
        selectUser(id);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleApproveMerchant = async () => {
        if (selectedUser) {
            dispatch({ type: SEND_REQUEST });
            const adminService = new AdminService();
            try {
                const { errors } = await adminService.approveMerchant(selectedUser.id);
                if (errors.length > 0) {
                    dispatch({ type: REQUEST_FAILED });
                    handleFailedActivate("Could not process request, please try again", 3000);
                } else {
                    dispatch({ type: REQUEST_SUCCESSFUL });
                    setRefreshTable(prev => !prev);
                    rootDispatch(clearAlerts());
                }
            } catch (error) {
                dispatch({ type: REQUEST_FAILED });
                handleFailedActivate("Could not process request, please try again", 3000);
            }
        }
    }

    const handleToggleActivate = async (id, status) => {
        dispatch({ type: SEND_REQUEST });
        const adminService = new AdminService();
        try {
            const { errors } = await adminService.toggleActivate(status, id);
            if (errors.length > 0) {
                dispatch({ type: REQUEST_FAILED });
                handleFailedActivate("Could not process request, please try again", 3000);
            } else {
                dispatch({ type: REQUEST_SUCCESSFUL });
                setRefreshTable(prev => !prev);
                rootDispatch(clearAlerts());
            }
        } catch (error) {
            dispatch({ type: REQUEST_FAILED });
            handleFailedActivate("Could not process request, please try again", 3000);
        }
    }

    const handleFailedActivate = (message, timeOut) => {
        const payload = {
            severity: "error",
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
        { field: "index", headerName: "Number", width: 100 },
        { field: "fullName", headerName: "Full Name", width: 200 },
        { field: "email", headerName: "Email", width: 70 },
        { field: "businessType", headerName: "Business Type", width: 70 },
        { field: "status", headerName: "Status", width: 90, renderCell: ({ row }) => row.status ? "Verified" : "Unverified" },
        { field: "isValidated", headerName: "Validated", width: 90, renderCell: ({ row }) => <IOSSwitch disabled={state.requestState.loading | row?.isValidated} onChange={() => handleApproveMerchant()} checked={row.isValidated} /> },
        { field: "activated", headerName: "Activated", width: 90, renderCell: ({ row }) => <IOSSwitch disabled={state.requestState.loading} onChange={() => handleToggleActivate(row.id, row.activated)} checked={row.activated} /> },
        { field: "more", headerName: "", width: 30, renderCell: ({ row }) => <div className="simple-center-div"><More id={row.id} /></div> },
    ];

    const list = () => (
        selectedUser &&
        <Box role="presentation" >
            <div className="users-sections-body">
                <div className="users-title-container">
                    <div></div>
                </div>
                <div className="users-sections-container">
                    <div className="user-profile-container">
                        <StyledBadge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            variant="dot"
                        >
                            <Avatar className="user-avatar" alt="User" src="/" />
                        </StyledBadge>
                        <div className="user-short-desc-container">
                            <div>{selectedUser.fullName}</div>
                            <div>{selectedUser.email}</div>
                        </div>
                    </div>

                    <div className="user-profile-sections-container Admin-Settings-Page">
                        <Box
                            component="form"
                            sx={{
                                '& > :not(style)': { width: '100%', margin: "50px 0" },
                            }}
                            autoComplete="off"
                        >
                            <section>
                                <div className="user-profile-section-title">Personal Details</div>
                                <div className="form-controller-input-duo form-controller">
                                    <TextField disabled value={selectedUser.user.firstName} size="small" fullWidth label="Full Name" variant="filled" />
                                    <TextField disabled value={selectedUser.user.lastName} size="small" fullWidth label="Full Name" variant="filled" />
                                </div>
                                <div className="form-controller-input form-controller">
                                    <TextField disabled value={selectedUser.email} size="small" fullWidth label="Email" variant="filled" />
                                </div>
                            </section>

                            {
                                selectedUser.company &&
                                <section>
                                    <div className="user-profile-section-title">Company Details</div>
                                    <div className="form-controller-input form-controller">
                                        <TextField disabled value={selectedUser.company.introduction} multiline fullWidth type="text" label="Company Introduction" variant="filled" />
                                    </div>
                                    <div className="form-controller-input-duo form-controller">
                                        <TextField disabled value={selectedUser.user.companyName} fullWidth label="Company Name" size="small" variant="filled" />
                                        <TextField disabled value={selectedUser.address} fullWidth label="Company Address" size="small" variant="filled" />
                                    </div>
                                    <div className="form-controller-input-duo form-controller">
                                        <TextField disabled value={new Date(selectedUser.type.createdOn).getFullYear()} size="small" fullWidth label="Company Year" variant="filled" />
                                        <TextField disabled value={selectedUser.company.noOfEmployees} size="small" fullWidth label="Number of Employees" variant="filled" />
                                    </div>
                                    <div className="form-controller-input form-controller">
                                        <TextField disabled value={selectedUser.businessType} size="small" fullWidth label="Business Type" variant="filled" />
                                    </div>
                                    <div className="form-controller-input form-controller">
                                        <TextField disabled value={selectedUser.company.supplyAbility} size="small" fullWidth label="Supply Ability" variant="filled" />
                                    </div>
                                </section>
                            }
                        </Box>
                    </div>
                </div>
            </div>
        </Box>
    );

    useEffect(() => {
        const abortController = new AbortController();
        const fetchData = async () => {
            setRowsLoading(true);
            const adminService = new AdminService();
            try {
                const { page, size } = paging;
                const { data, errors } = await adminService.getMerchants(abortController.signal, { page, size });
                if (errors.length === 0) {
                    setPaging({ ...paging, totalCount: data.data.totalCount });
                    const filteredData = data.data.data;
                    filteredData.map((user, index) => {
                        user.index = ((paging.size * paging.page) - (paging.size - index)) + 1
                        user.fullName = `${user.user.firstName} ${user.user.lastName}`;
                        user.email = user.user.email;
                        user.businessType = user.type.label;
                        user.status = user.user.isVerified;
                        user.activated = user.user.enabled;
                        user.id = user.user.id;
                        return 1;
                    });
                    setRows(filteredData);
                }
            } catch (error) { }
            setRowsLoading(false);
        }

        fetchData();
        return () => abortController.abort();
        // eslint-disable-next-line
    }, [paging.page, paging.size, refreshTable]);

    return (
        <div className="UsersMerchant-Table">
            <div>
                <Modal
                    open={openDrawer}
                    onClose={toggleDrawer(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    className="modal-container"
                >
                    <Box sx={inAppSmall}>
                        <div className="modal-title-container">
                            <div>User Information</div>
                            <div><CloseRoundedIcon onClick={toggleDrawer(false)} /></div>
                        </div>

                        <div className="modal-body">
                            {list()}
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
                    <MenuItem>
                        Flag User
                    </MenuItem>
                </Menu>
            </div>

            <div>
                <SwipeableDrawer
                    className="drawer-container"
                    variant="temporary"
                    anchor="bottom"
                    open={openDrawer}
                    onOpen={toggleDrawer(true)}
                    onClose={toggleDrawer(false)}
                    disableBackdropTransition={!iOS} disableDiscovery={iOS}
                >
                    <div className="drawer-title-container">
                        <div>User Information</div>
                        <Puller />
                    </div>

                    <div className="drawer-body">
                        {list()}
                    </div>
                </SwipeableDrawer>
            </div>

            <DataGrid
                components={{ Toolbar: () => CustomToolBar1(selectedUsers, dispatch, rootDispatch, setRefreshTable, state), LoadingOverlay: LinearProgress, NoRowsOverlay: () => <Overlay label="Merchants" /> }}
                className="standard-table"
                checkboxSelection
                disableSelectionOnClicks
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
                onSelectionModelChange={handleMultipleSelect}
            />
        </div>
    )
}

export default UsersMerchant;