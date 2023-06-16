import React from "react";
import Avatar from "@mui/material/Avatar";
import { StyledBadge } from "../Material/Avatar";

const AvatarProfile = ({ fullName }) => {
  return (
    <div>
      <StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        variant="dot"
      >
        <Avatar
          sx={{ width: 150, height: 150, fontSize: 50 }}
          alt={fullName}
          src="/"
        />
      </StyledBadge>
    </div>
  );
};

export default AvatarProfile;
