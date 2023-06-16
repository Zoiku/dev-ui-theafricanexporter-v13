import { ORDER_STATUS_LEVELS } from "./OrderStatus";
import { Stack } from "@mui/material";

export const ProgressBar = ({ status }) => {
  return (
    <Stack direction="column" width={"100%"}>
      <small style={{ fontWeight: 500 }}>
        {ORDER_STATUS_LEVELS[status]}% Complete
      </small>
      <progress
        style={{ width: "100%" }}
        max="100"
        value={ORDER_STATUS_LEVELS[status]}
      />
    </Stack>
  );
};
