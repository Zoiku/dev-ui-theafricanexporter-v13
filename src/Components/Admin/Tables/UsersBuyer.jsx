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
          setPaging({ ...paging, totalCount: data.data.totalCount });
          const filteredData = data.data.data.map((user, index) => {
            return {
              index: paging.size * paging.page - (paging.size - index) + 1,
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
    return () => abortController.abort();
    // eslint-disable-next-line
  }, [paging.page, paging.size, reloadTable]);

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
