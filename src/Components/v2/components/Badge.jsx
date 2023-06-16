import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import { StyledBadge } from "../../../Material/Badge";
import IconButton from "@mui/material/IconButton";

const MuiBadge = ({ offers }) => {
  return (
    <IconButton disabled={offers.length === 0} size="small" aria-label="cart">
      <StyledBadge badgeContent={offers.length} color="primary">
        <RequestQuoteIcon />
      </StyledBadge>
    </IconButton>
  );
};

export default MuiBadge;
