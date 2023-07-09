import {
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import AdminService from "../Services/Admin";
import { Stack } from "@mui/material";
import MuiButton from "../Components/v2/components/MuiButtons";

const handleGroupValidation = (
  users,
  setReloadTable,
  triggerSnackBarAlert,
  setModelLoading
) => {
  setModelLoading(true);
  const adminService = new AdminService();
  try {
    users.map(async (user) => {
      const { errors } = await adminService.approveMerchant(user);
      if (errors.length === 0) {
        setReloadTable((prev) => !prev);
        setModelLoading(false);
        triggerSnackBarAlert(
          "Merchants have been validated successfully",
          "success"
        );
      } else {
        setModelLoading(false);
        triggerSnackBarAlert(
          "Problem validation users, please try again later",
          "error"
        );
      }
    });
  } catch (error) {
    throw error;
  }
};

const Toolbar = () => {
  return (
    <GridToolbarContainer
      sx={{ display: "flex", justifyContent: "space-between" }}
    >
      <div>
        <GridToolbarFilterButton />
        <GridToolbarExport />
      </div>
    </GridToolbarContainer>
  );
};

export const MultipleValidation = (
  users,
  setReloadTable,
  triggerSnackBarAlert,
  modelLoading,
  setModelLoading
) => {
  return (
    <GridToolbarContainer
      sx={{ display: "flex", justifyContent: "space-between" }}
    >
      <Stack direction="row" spacing={2}>
        <GridToolbarFilterButton />
        <MuiButton
          variant="text"
          label="Group Validate"
          loading={modelLoading}
          disabled={users ? (users.length > 1 ? false : true) : true}
          onClick={() =>
            handleGroupValidation(
              users,
              setReloadTable,
              triggerSnackBarAlert,
              setModelLoading
            )
          }
        />
      </Stack>
    </GridToolbarContainer>
  );
};

export default Toolbar;
