import { Popover } from "@mui/material";

const MuiPopover = ({ anchorEl, toggleAnchorEl, children, title }) => {
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <Popover
      elevation={3}
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={toggleAnchorEl(false)}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
    >
      <div style={{ width: 200, fontSize: "small" }}>
        <div
          style={{
            padding: "10px",
            borderBottom: "1px solid #efefef",
            fontWeight: 700,
          }}
        >
          {title}
        </div>
        <div style={{ padding: "10px" }}>{children}</div>
      </div>
    </Popover>
  );
};

export default MuiPopover;
