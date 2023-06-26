import { Stack } from "@mui/material";
import { useState } from "react";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Collapse, IconButton } from "@mui/material/";

export const SectionItemCollapsable = ({ sectionTitle, children }) => {
  const [open, setOpen] = useState(false);
  const toggleSetOpen = (open) => () => {
    setOpen(open);
  };

  return (
    <section className="collapsable section_content">
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        className="collapsable section_content_title"
      >
        <div>{sectionTitle}</div>
        <div>
          {open ? (
            <IconButton onClick={toggleSetOpen(false)}>
              <ExpandLess />
            </IconButton>
          ) : (
            <IconButton onClick={toggleSetOpen(true)}>
              <ExpandMore />
            </IconButton>
          )}
        </div>
      </Stack>

      <div className="collapsable section_content_body">
        <Collapse in={open} timeout="auto" unmountOnExit>
          {children}
        </Collapse>
      </div>
    </section>
  );
};

export const SectionItem = ({ sectionTitle, children }) => {
  return (
    <section className="section_content">
      <div className="section_content_title">{sectionTitle}</div>
      <div className="section_content_body">{children}</div>
    </section>
  );
};

export const StackItem = ({ title, value, capitalize = true }) => (
  <Stack
    className="section_content_row_container"
    direction="row"
    justifyContent="space-between"
  >
    <div>{title}</div>
    <div
      style={
        capitalize
          ? { textTransform: "capitalize" }
          : { textTransform: "lowercase" }
      }
    >
      {value}
    </div>
  </Stack>
);
