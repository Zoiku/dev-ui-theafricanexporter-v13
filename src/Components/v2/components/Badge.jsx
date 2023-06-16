import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import { StyledBadge } from "../../../Material/Badge";
import IconButton from "@mui/material/IconButton";

const MuiBadge = ({ offersTotalCount, onClick }) => {
  return (
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
