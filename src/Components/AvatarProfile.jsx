import React from "react";
import Avatar from "@mui/material/Avatar";
import { StyledBadge } from "../Material/Avatar";

const AvatarProfile = ({
  fullName,
  variant = "rounded",
  width = 100,
  height = 100,
  fontSize = 50,
}) => {
  return (
    <div>
      <StyledBadge
        overlap={variant}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        variant="dot"
      >
        <Avatar
          variant={variant}
          sx={{ width: width, height: height, fontSize: fontSize }}
          alt={fullName}
          src="/"
        />
      </StyledBadge>
    </div>
  );
};

export default AvatarProfile;
