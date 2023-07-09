import React from "react";
import { styled } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { fontFamily } from "./FontFamily";
import { styling } from "./ButtonsStyles";

const MuiButtons = ({
  label,
  width = "auto",
  type = "submit",
  loading = false,
  disabled = false,
  buttonType = "001",
  onClick = undefined,
  startIcon = undefined,
  variant = "contained",
}) => {
  const { styles } = styling(buttonType);
  const Button = styled(LoadingButton)({
    width: width,
    padding: styles.padding,
    fontSize: styles.size.font,
    transition: styles.transition,
    color: styles.colors.text.default,
    textTransform: styles.textTransform,
    background: styles.colors.background.default,
    fontFamily: [...fontFamily].join(","),
    "&:hover": {
      color: styles.colors.text.hover,
      background: styles.colors.background.hover,
    },
  });

  return (
    <Button
      disabled={disabled}
      disableElevation
      loading={loading}
      variant={variant}
      type={type}
      onClick={onClick}
      startIcon={startIcon}
    >
      <span>{label}</span>
    </Button>
  );
};

export default MuiButtons;
