import React from "react";
import Avatar from "@mui/material/Avatar";
import { StyledBadge } from "../Material/Avatar";

const AvatarProfile = ({ fullName }) => {
  return (
    <div>
      <StyledBadge
        overlap="rectangular"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        variant="dot"
      >
        <Avatar
          variant="rounded"
          sx={{ width: 100, height: 100, fontSize: 50 }}
          alt={fullName}
          src="/"
        />
      </StyledBadge>
    </div>
  );
};

export default AvatarProfile;
