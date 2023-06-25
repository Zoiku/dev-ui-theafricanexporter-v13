import {
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { TextButton as ValidateButton } from "../Material/Button.js";
import AdminService from "../Services/Admin";
import { Stack } from "@mui/material";

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
        <ValidateButton
          loading={modelLoading}
          // startIcon={<GroupAddIcon />}
          disabled={users ? (users.length > 1 ? false : true) : true}
          onClick={() =>
            handleGroupValidation(
              users,
              setReloadTable,
              triggerSnackBarAlert,
              setModelLoading
            )
          }
          size="small"
          variant="text"
        >
          Group Validate
        </ValidateButton>
      </Stack>
    </GridToolbarContainer>
  );
};

export default Toolbar;
