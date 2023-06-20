import * as React from "react";
import PropTypes from "prop-types";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import { Stack } from "@mui/material";

const normalise = (value, max) => ((value - 0) * 100) / (max - 0);

export const MuiLinearProgress = ({ value, completedValue }) => {
  const normalisedValue = normalise(value, completedValue);
  return (
    <Stack
      width={"100%"}
      direction="row"
      alignItems="center"
      justifyItems="space-between"
    >
      <Box sx={{ width: "100%", mr: 1, color: "#888" }}>
        <LinearProgress
          color="inherit"
          variant="determinate"
          value={normalisedValue}
        />
      </Box>
      <Stack
        direction="row"
        justifyContent="flex-end"
        sx={{ minWidth: 70, fontSize: "small" }}
        spacing={0.5}
      >
        <span style={{ fontWeight: 600 }}>{value}</span>
        <span>of</span>
        <span style={{ fontWeight: 600 }}>{completedValue}</span>
      </Stack>
    </Stack>
  );
};

MuiLinearProgress.propTypes = {
  value: PropTypes.number.isRequired,
};
