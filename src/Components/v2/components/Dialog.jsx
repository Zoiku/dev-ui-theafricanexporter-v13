import Dialog from "@mui/material/Dialog";
import { Transition } from "./Transition";
import {
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material/";
import { dialogStyle } from "../../../Styles/v2/dialog";

const MuiDialog = ({ dialogTitle, openDialog, toggleOpenDialog, children }) => {
  return (
    <Dialog
      open={openDialog}
      TransitionComponent={Transition}
      keepMounted
      onClose={toggleOpenDialog(false)}
      aria-describedby="alert-dialog-slide-description"
      sx={dialogStyle}
    >
      <DialogContent>
        <DialogContentText className="dialog_title_container">
          {dialogTitle}
        </DialogContentText>
      </DialogContent>
      <DialogActions>{children}</DialogActions>
    </Dialog>
  );
};

export default MuiDialog;
