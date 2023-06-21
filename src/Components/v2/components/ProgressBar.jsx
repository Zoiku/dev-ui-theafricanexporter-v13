import { ORDER_STATUS_LEVELS } from "./OrderStatus";
import { Stack } from "@mui/material";

export const ProgressBar = ({ status }) => {
  return (
    <Stack direction="column" width={"100%"}>
      <div style={{ color: "gray" }}>
        {ORDER_STATUS_LEVELS[status]}% Complete
      </div>
      <progress
        style={{ width: "100%" }}
        max="100"
        value={ORDER_STATUS_LEVELS[status]}
      />
    </Stack>
  );
};
