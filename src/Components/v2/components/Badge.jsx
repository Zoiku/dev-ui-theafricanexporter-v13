import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import { StyledBadge } from "../../../Material/Badge";
import IconButton from "@mui/material/IconButton";
import CustomProgress from "./CustomProgress";

const MuiBadge = ({ offersTotalCount, onClick, loading }) => {
  return loading ? (
    <CustomProgress size={24} badgeLoading={true} />
  ) : (
    <IconButton
      disabled={offersTotalCount === 0}
      size="small"
      aria-label="cart"
      onClick={onClick}
    >
      <StyledBadge badgeContent={offersTotalCount} color="primary">
        <RequestQuoteIcon />
      </StyledBadge>
    </IconButton>
  );
};

export default MuiBadge;
