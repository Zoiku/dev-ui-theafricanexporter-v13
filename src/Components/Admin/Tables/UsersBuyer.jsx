import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import AdminService from "../../../Services/Admin";
import DrawerModal from "../../v2/components/DrawerModal";
import MuiTable from "../../v2/components/Table";
import { Box, Stack, MenuItem } from "@mui/material";
import { MuiMoreV1 } from "../../More";
import { normalBox } from "../../../Styles/v2/box";
import { SectionItem, StackItem } from "../../v2/components/Lists";
import AvatarProfile from "../../AvatarProfile";
import MuiSwitch from "../../v2/components/Switch";
import { setAlert } from "../../../Redux/Features/Alert.js";

const UsersBuyer = () => {
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

  const [reloadTable, setReloadTable] = useState(false);

  const rootDispatch = useDispatch();

  const [rows, setRows] = useState([]);
  const [rowsLoading, setRowsLoading] = useState(false);

  const [rowsButtonState, setRowsButtonState] = useState({
    activated: {
      id: null,
      loading: false,
    },
  });

  const [selectedUser, setSelectedUser] = useState(null);
  const [openUserView, setOpenUserView] = useState(false);
  const toggleOpenUserView = (open) => () => {
    setOpenUserView(open);
    !open && setSelectedUser(null);
  };
  const handleOpenUserView = (id) => () => {
    const user = rows.find((row) => row.id === id);
    setSelectedUser(user);
    setOpenUserView(true);
  };

  const triggerSnackBarAlert = (message, severity) => {
    const payload = {
      severity,
      message,
    };
    rootDispatch(setAlert(payload));
  };

  const toggleActivate = async (status, id) => {
    setRowsButtonState({
      ...rowsButtonState,
      activated: {
        id: id,
        loading: true,
      },
    });
    const adminService = new AdminService();
    try {
      const { errors } = await adminService.toggleActivate(status, id);
      if (errors.length === 0) {
        setReloadTable((prev) => !prev);
        triggerSnackBarAlert(
          `Status of buyer with ID: ${id} updated`,
          "success"
        );
      } else {
        triggerSnackBarAlert(
          `Status of buyer with ID: ${id} could not be updated`,
          "error"
        );
      }
    } catch (error) {
      throw error;
    }
    setRowsButtonState({
      ...rowsButtonState,
      activated: {
        id: null,
        loading: false,
      },
    });
  };

  const handleToggleButtonsActions = (actionType, id, status) => () => {
    switch (actionType) {
      case "ACTIVATE":
        toggleActivate(status, id);
        break;
      default:
        break;
    }
  };

  const columns = [
    { field: "index", headerName: "Number", width: 80 },
    { field: "name", headerName: "Full Name", width: 200 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "joinedSince", headerName: "Joined Since", width: 150 },
    {
      field: "verified",
      headerName: "Status",
      width: 100,
      renderCell: ({ row }) => (
        <Stack direction="row" width={"100%"}>
          <MuiSwitch checked={row?.verified} disabled />
        </Stack>
      ),
    },
    {
      field: "activated",
      headerName: "Activated",
      width: 100,
      renderCell: ({ row }) => (
        <Stack direction="row" width={"100%"}>
          <MuiSwitch
            checked={row?.activated}
            onChange={handleToggleButtonsActions(
              "ACTIVATE",
              row.id,
              row?.activated
            )}
            disabled={
              rowsButtonState.activated.id === row.id &&
              rowsButtonState.activated.loading
            }
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
            <MenuItem onClick={handleOpenUserView(row.id)}>View</MenuItem>
          </MuiMoreV1>
        </Stack>
      ),
    },
  ];

  useEffect(() => {
    const abortController = new AbortController();
    const fetchData = async () => {
      setRowsLoading(true);
      const adminService = new AdminService();
      try {
        const { data, errors } = await adminService.getBuyers(
          abortController.signal,
          paging
        );
        if (errors.length === 0) {
          const filteredData = data.data.data.map((user, index) => {
            return {
              index: index + 1,
              id: user?.id,
              name: `${user?.firstName} ${user?.lastName}`,
              email: user?.email,
              verified: user?.isVerified,
              activated: user?.enabled,
              mobile: user?.mobileNo,
              joinedSince: new Date(user?.createdOn).toLocaleDateString(),
              company: {
                name: user?.companyName,
                country: user?.country,
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
  }, [paging, reloadTable]);

  const UserView = () => {
    return (
      selectedUser && (
        <Box>
          <Stack
            sx={{ margin: "0 0 40px 0" }}
            direction="row"
            spacing={2}
            alignItems="center"
          >
            <AvatarProfile fullName={selectedUser?.name} />
            <strong style={{ fontSize: 25 }}>{selectedUser?.name}</strong>
          </Stack>

          <div>
            <SectionItem sectionTitle="Personal Details">
              <StackItem title="Full Name" value={selectedUser?.name} />
              <StackItem title="Email" value={selectedUser?.email} />
              <StackItem title="Mobile" value={"+" + selectedUser?.mobile} />
            </SectionItem>

            <SectionItem sectionTitle="Company Details">
              <StackItem title="Name" value={selectedUser?.company?.name} />
              <StackItem
                title="Country"
                value={selectedUser?.company?.country}
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
        boxStyle={normalBox}
        openState={openUserView}
        toggleOpenState={toggleOpenUserView}
        title="User Information"
      >
        <UserView />
      </DrawerModal>

      <MuiTable
        rows={rows}
        rowsLoading={rowsLoading}
        columns={columns}
        label=""
        paging={paging}
        handlePageChange={handlePageChange}
        handlePageSizeChange={handlePageSizeChange}
      />
    </main>
  );
};

export default UsersBuyer;

// import { DataGrid } from "@mui/x-data-grid";
// import LinearProgress from '@mui/material/LinearProgress';
// import Toolbar from "../../../Material/Toolbar";
// import SwipeableDrawer from '@mui/material/SwipeableDrawer';
// import { useState, useEffect } from "react";
// import Box from '@mui/material/Box';
// import { Puller } from "../../../Material/Drawer";
// import AdminService from "../../../Services/Admin";
// import { IOSSwitch } from "../../../Material/Switches";
// import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
// import IconButton from "@mui/material/IconButton";
// import Tooltip from "@mui/material/Tooltip";
// import TextField from '@mui/material/TextField';
// import Avatar from '@mui/material/Avatar';
// import { StyledBadge } from "../../../Material/Avatar";
// import { setAlert, clearAlerts } from "../../../Redux/Features/Alert.js"
// import { useDispatch } from "react-redux";
// import { useReducer } from "react";
// import { formReducer, INITIAL_STATE } from "../../../Reducers/FormReducer";
// import { SEND_REQUEST, REQUEST_FAILED, REQUEST_SUCCESSFUL } from "../../../Reducers/Actions";
// import Modal from '@mui/material/Modal';
// import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
// import { inAppSmall } from "../../../Styles/Modal";
// import Overlay from "../../../Material/Overlay";

// const UsersBuyer = () => {
//     const [paging, setPaging] = useState({
//         page: 1,
//         size: 10,
//         totalCount: 0
//     });
//     const handlePageChange = (page) => {
//         setPaging({ ...paging, page: page + 1 })
//     }
//     const handlePageSizeChange = (size) => {
//         setPaging({ ...paging, size: size })
//     }

//     const [refreshTable, setRefreshTable] = useState(false);
//     const [state, dispatch] = useReducer(formReducer, INITIAL_STATE);
//     const rootDispatch = useDispatch();
//     const iOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);
//     const [anchorEl, setAnchorEl] = useState(null);
//     const open = Boolean(anchorEl);
//     const [rows, setRows] = useState([]);
//     const [rowsLoading, setRowsLoading] = useState(false);
//     const [selectedUserId, setSelectedOrderId] = useState(null);
//     const selectUser = (id) => setSelectedOrderId(id);
//     const selectedUser = rows && rows.find(row => row.id === selectedUserId);
//     const [openDrawer, setOpenDrawer] = useState(false);
//     const toggleDrawer = (open) => (_event) => {
//         setOpenDrawer(open);
//     };
//     const handleClick = (event, id) => {
//         setAnchorEl(event.currentTarget);
//         selectUser(id);
//     };
//     const handleClose = () => {
//         setAnchorEl(null);
//     };

//     const handleToggleActivate = async (email, status) => {
//         dispatch({ type: SEND_REQUEST });
//         const adminService = new AdminService();
//         try {
//             const { errors } = await adminService.toggleActivate(email, status);
//             if (errors.length > 0) {
//                 dispatch({ type: REQUEST_FAILED });
//                 handleFailedToggleActivate("Could not process request, please try again", 3000);
//             } else {
//                 dispatch({ type: REQUEST_SUCCESSFUL });
//                 setRefreshTable(prev => !prev);
//                 rootDispatch(clearAlerts());
//             }
//         } catch (error) {
//             dispatch({ type: REQUEST_FAILED });
//             handleFailedToggleActivate("Could not process request, please try again", 3000);
//         }
//     }

//     const handleFailedToggleActivate = (message, timeOut) => {
//         const payload = {
//             severity: "error",
//             message,
//             timeOut
//         }
//         rootDispatch(setAlert(payload));
//     };

//     const More = ({ id }) => (
//         <div>
//             <Box sx={{ display: "flex", alignItems: "center", textAlign: "center", position: "relative" }}>
//                 <Tooltip title="More">
//                     <IconButton
//                         onClick={event => handleClick(event, id)}
//                         size="small"
//                         aria-controls={open ? "account-menu" : undefined}
//                         aria-haspopup="true"
//                         aria-expanded={open ? "true" : undefined}
//                     >
//                         <MoreHorizIcon />
//                     </IconButton>
//                 </Tooltip>
//             </Box>
//         </div >
//     );

//     const columns = [
//         { field: "index", headerName: "Number", width: 80 },
//         { field: "fullName", headerName: "Full Name", width: 150 },
//         { field: "email", headerName: "Email", width: 100 },
//         { field: "joinedSince", headerName: "Joined Since", width: 150 },
//         { field: "status", headerName: "Status", width: 100, renderCell: ({ row }) => <IOSSwitch disabled checked={row.status} /> },
//         { field: "activated", headerName: "Activated", width: 100, renderCell: ({ row }) => <IOSSwitch disabled={state.requestState.loading ? true : false} onChange={() => handleToggleActivate(row.email, row.activated)} checked={row.activated} /> },
//         { field: "more", headerName: "", width: 30, renderCell: ({ row }) => <div className="simple-center-div"><More id={row.id} /></div> },
//     ];

//     const list = () => (
//         selectedUser &&
//         <Box role="presentation" >
//             <div className="users-sections-body">
//                 <div className="users-sections-container">
//                     <div className="user-profile-container">
//                         <StyledBadge
//                             overlap="circular"
//                             anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
//                             variant="dot"
//                         >
//                             <Avatar className="user-avatar" alt={selectedUser.fullName} src="/" />
//                         </StyledBadge>
//                         <div className="user-short-desc-container">
//                             <div>{selectedUser.fullName}</div>
//                             <div>{selectedUser.email}</div>
//                         </div>
//                     </div>

//                     <div className="user-profile-sections-container Admin-Settings-Page">
//                         <Box
//                             component="form"
//                             sx={{
//                                 '& > :not(style)': { width: '100%', margin: "50px 0" },
//                             }}
//                             autoComplete="off"
//                         >
//                             <section>
//                                 <div className="user-profile-section-title">Personal Details</div>
//                                 <div className="form-controller-input-duo form-controller">
//                                     <TextField disabled value={selectedUser.firstName} size="small" fullWidth label="Full Name" variant="outlined" />
//                                     <TextField disabled value={selectedUser.lastName} size="small" fullWidth label="Full Name" variant="outlined" />
//                                 </div>
//                                 <div className="form-controller-input form-controller">
//                                     <TextField disabled value={selectedUser.email} size="small" fullWidth label="Email" variant="outlined" />
//                                 </div>
//                             </section>
//                         </Box>
//                     </div>
//                 </div>
//             </div>
//         </Box>
//     );

//     useEffect(() => {
//         const abortController = new AbortController();
//         const fetchData = async () => {
//             setRowsLoading(true);
//             const adminService = new AdminService();
//             try {
//                 const { page, size } = paging;
//                 const { data, errors } = await adminService.getBuyers(abortController.signal, { page, size });
//                 if (errors.length === 0) {
//                     setPaging({ ...paging, totalCount: data.data.totalCount });
//                     const filteredData = data.data.data;
//                     filteredData.map((user, index) => {
//                         user.index = ((paging.size * paging.page) - (paging.size - index)) + 1;
//                         user.fullName = `${user.firstName} ${user.lastName}`;
//                         user.joinedSince = new Date(user.createdOn).toUTCString().slice(0, 16);
//                         user.status = user.isVerified;
//                         user.activated = user.enabled;
//                         return 1;
//                     });
//                     setRows(filteredData);
//                 }
//             } catch (error) { }
//             setRowsLoading(false);
//         }

//         fetchData();
//         return () => abortController.abort();
//         // eslint-disable-next-line
//     }, [paging.page, paging.size, refreshTable]);

//     return (
//         <div className="UsersBuyer-Table">
//             <div>
//                 <Modal
//                     open={openDrawer}
//                     onClose={toggleDrawer(false)}
//                     aria-labelledby="modal-modal-title"
//                     aria-describedby="modal-modal-description"
//                     className="modal-container"
//                 >
//                     <Box sx={inAppSmall}>
//                         <div className="modal-title-container">
//                             <div>User Information</div>
//                             <div><CloseRoundedIcon onClick={toggleDrawer(false)} /></div>
//                         </div>
//                         <div className="modal-body">
//                             {list()}
//                         </div>
//                     </Box>
//                 </Modal>
//             </div>

//             <div>
//                 <Menu
//                     anchorEl={anchorEl}
//                     id="account-menu"
//                     open={open}
//                     onClose={handleClose}
//                     onClick={handleClose}
//                     transformOrigin={{ horizontal: "right", vertical: "top" }}
//                     anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
//                 >
//                     <MenuItem onClick={toggleDrawer(true)}>
//                         View
//                     </MenuItem>
//                     <MenuItem>
//                         Flag User
//                     </MenuItem>
//                 </Menu>
//             </div>

//             <div>
//                 <SwipeableDrawer
//                     className="drawer-container"
//                     variant="temporary"
//                     anchor="bottom"
//                     open={openDrawer}
//                     onOpen={toggleDrawer(true)}
//                     onClose={toggleDrawer(false)}
//                     disableBackdropTransition={!iOS} disableDiscovery={iOS}
//                 >
//                     <div className="drawer-title-container">
//                         <div>User Information</div>
//                         <Puller />
//                     </div>

//                     <div className="drawer-body">
//                         {list()}
//                     </div>
//                 </SwipeableDrawer>
//             </div>

//             <DataGrid
//                 components={{ Toolbar: Toolbar, LoadingOverlay: LinearProgress, NoRowsOverlay: () => <Overlay label="Buyers" /> }}
//                 className="standard-table"
//                 checkboxSelection
//                 disableSelectionOnClick
//                 pageSize={paging.size}
//                 rows={rows}
//                 columns={columns}
//                 pagination
//                 density="compact"
//                 rowsPerPageOptions={[10, 20, 30, 40, 50]}
//                 loading={rowsLoading}
//                 rowCount={paging.totalCount}
//                 paginationMode="server"
//                 onPageChange={handlePageChange}
//                 onPageSizeChange={handlePageSizeChange}
//             />
//         </div>
//     )
// }

// export default UsersBuyer;
