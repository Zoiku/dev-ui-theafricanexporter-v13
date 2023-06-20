import { styled } from "@mui/material/styles";
import { LoadingButton } from "@mui/lab";

export const PrimaryButton = styled(LoadingButton)({
  boxShadow: "none",
  textTransform: "none",
  background: "var(--tae-orange)",
  transition: "all 0.2s ease",
  fontSize: 18,
  width: "200px",
  padding: "10px",
  color: "#fff",
  lineHeight: 1.5,
  fontFamily: [
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),
  "&:hover": {
    boxShadow: "none",
    background: "var(--tae-orange-light)",
    color: "#fff",
  },
  "&:active": {
    boxShadow: "none",
  },
  "&:focus": {},
});

export const GenericPrimaryButton = styled(LoadingButton)({
  boxShadow: "none",
  textTransform: "none",
  background: "black",
  transition: "all 0.2s ease",
  padding: "10px",
  color: "#fff",
  lineHeight: 1.5,
  fontFamily: [
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),
  "&:hover": {
    boxShadow: "none",
    background: "black",
    color: "#fff",
  },
  "&:active": {
    boxShadow: "none",
  },
  "&:focus": {},
});

export const GenericSecondary = styled(LoadingButton)({
  boxShadow: "none",
  textTransform: "none",
  transition: "all 0.2s ease",
  padding: "10px",
  color: "black",
  lineHeight: 1.5,
  fontFamily: [
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),
  "&:hover": {
    boxShadow: "none",
    color: "black",
  },
  "&:active": {
    boxShadow: "none",
  },
  "&:focus": {},
});

export const SettingsPageUpdateButton = styled(LoadingButton)({
  boxShadow: "none",
  textTransform: "none",
  background: "var(--tae-orange)",
  transition: "all 0.2s ease",
  padding: "10px",
  color: "#fff",
  lineHeight: 1.5,
  fontFamily: [
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),
  "&:hover": {
    boxShadow: "none",
    background: "var(--tae-orange-light)",
    color: "#fff",
  },
  "&:active": {
    boxShadow: "none",
  },
  "&:focus": {},
});

export const SettingsPageUpdateButtonSecondary = styled(LoadingButton)({
  boxShadow: "none",
  textTransform: "none",
  background: "black",
  transition: "all 0.2s ease",
  padding: "10px",
  color: "#fff",
  lineHeight: 1.5,
  fontFamily: [
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),
  "&:hover": {
    boxShadow: "none",
    background: "black",
    color: "#fff",
  },
  "&:active": {
    boxShadow: "none",
  },
  "&:focus": {},
});

export const SettingsPageCancelButton = styled(LoadingButton)({
  boxShadow: "none",
  textTransform: "none",
  transition: "all 0.2s ease",
  padding: "10px",
  color: "#000",
  lineHeight: 1.5,
  fontFamily: [
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),
  "&:hover": {
    boxShadow: "none",
    color: "#000",
  },
  "&:active": {
    boxShadow: "none",
  },
  "&:focus": {},
});

export const SmallPrimary = styled(LoadingButton)({
  boxShadow: "none",
  textTransform: "none",
  background: "var(--tae-orange)",
  transition: "all 0.2s ease",
  fontSize: "small",
  color: "#fff",
  lineHeight: 1.5,
  fontFamily: [
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),
  "&:hover": {
    boxShadow: "none",
    background: "var(--tae-orange-light)",
    color: "#fff",
  },
  "&:active": {
    boxShadow: "none",
  },
  "&:focus": {},
});

export const SmallSecondary = styled(LoadingButton)({
  boxShadow: "none",
  textTransform: "none",
  background: "black",
  transition: "all 0.2s ease",
  fontSize: "small",
  color: "#fff",
  lineHeight: 1.5,
  fontFamily: [
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),
  "&:hover": {
    boxShadow: "none",
    background: "black",
    color: "#fff",
  },
  "&:active": {
    boxShadow: "none",
  },
  "&:focus": {},
});

export const GenericSmall = styled(LoadingButton)({
  boxShadow: "none",
  textTransform: "none",
  transition: "all 0.2s ease",
  fontSize: "small",
  padding: "10px",
  lineHeight: 1.5,
  fontFamily: [
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),
  "&:hover": {
    boxShadow: "none",
  },
  "&:active": {
    boxShadow: "none",
  },
  "&:focus": {},
});

export const SmallCancel = styled(LoadingButton)({
  boxShadow: "none",
  textTransform: "none",
  background: "red",
  transition: "all 0.2s ease",
  fontSize: "small",
  color: "#fff",
  lineHeight: 1.5,
  fontFamily: [
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),
  "&:hover": {
    boxShadow: "none",
    background: "red",
    color: "#fff",
  },
  "&:active": {
    boxShadow: "none",
  },
  "&:focus": {},
});

export const TextButton = styled(LoadingButton)({
  // fontWeight: 500
});

export const EmptyButton = styled(LoadingButton)({
  boxShadow: "none",
  textTransform: "none",
  color: "black",
  transition: "all 0.2s ease",
  lineHeight: 1.5,
  borderColor: "black",
  fontWeight: 600,
  fontFamily: [
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),
  "&:hover": {
    boxShadow: "none",
    color: "black",
    borderColor: "black",
  },
  "&:active": {
    boxShadow: "none",
    color: "black",
    borderColor: "black",
  },
  "&:focus": {},
});

export const SmallSecondaryV2 = styled(LoadingButton)({
  boxShadow: "none",
  textTransform: "none",
  background: "#444",
  transition: "all 0.2s ease",
  fontSize: "small",
  color: "#fff",
  lineHeight: 1.5,
  fontFamily: [
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),
  "&:hover": {
    boxShadow: "none",
    background: "#333",
    color: "#fff",
  },
  "&:active": {
    boxShadow: "none",
  },
  "&:focus": {},
});
