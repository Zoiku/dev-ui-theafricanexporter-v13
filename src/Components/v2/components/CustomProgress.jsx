import { Stack } from "@mui/material";
import {
  BeatLoader,
  HashLoader,
  PropagateLoader,
  PuffLoader,
} from "react-spinners";

const CustomProgress = ({
  size = 5,
  tableRowsLoading = false,
  tutorialLoading = false,
  pageLoading = false,
  badgeLoading = false,
}) => {
  return (
    <Stack direction="row" width="100%">
      {tableRowsLoading && <BeatLoader size={size} color="gray" />}
      {pageLoading && <HashLoader size={size} color="#ee9b00" />}
      {tutorialLoading && <PropagateLoader size={size} color="#ee9b00" />}
      {badgeLoading && <PuffLoader size={size} color="gray" />}
    </Stack>
  );
};

export default CustomProgress;
