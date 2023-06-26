import { Stack } from "@mui/material";
import { ErrorOutline } from "@mui/icons-material/";
import "../../../Styles/v2/Tip.css";

export const Tip = ({ message, children, smallText = true }) => {
  return (
    <Stack
      direction="row"
      alignItems="flex-start"
      className="tip_component"
      spacing={2}
    >
      <ErrorOutline sx={{ color: "#ee9b00" }} />
      <div
        style={smallText ? {} : { fontSize: "medium", fontWeight: "normal" }}
      >
        {children ?? message}
      </div>
    </Stack>
  );
};

export default Tip;
