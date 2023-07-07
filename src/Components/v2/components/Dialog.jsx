import Dialog from "@mui/material/Dialog";
import { Transition } from "./Transition";
import {
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material/";
import "../../../Styles/v2/Dialog.css";

const MuiDialog = ({ dialogTitle, openDialog, toggleOpenDialog, children }) => {
  return (
    <Dialog
      open={openDialog}
      TransitionComponent={Transition}
      keepMounted
      onClose={toggleOpenDialog(false)}
      aria-describedby="alert-dialog-slide-description"
      className="DialogComponent"
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
