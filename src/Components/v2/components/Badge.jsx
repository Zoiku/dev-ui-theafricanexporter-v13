import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import { StyledBadge } from "../../../Material/Badge";
import IconButton from "@mui/material/IconButton";
import { CircularProgress } from "@mui/material/";

const MuiBadge = ({ offersTotalCount, onClick, loading }) => {
  return loading ? (
    <div className="simple-center-div primary-tae-color">
      <CircularProgress color="inherit" size={20} />
    </div>
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
