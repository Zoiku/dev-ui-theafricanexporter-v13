import { Stack } from "@mui/material";

export const SectionItem = ({ sectionTitle, children }) => {
  return (
    <section className="section_content">
      <div className="section_content_title">{sectionTitle}</div>
      <div className="section_content_body">{children}</div>
    </section>
  );
};

export const StackItem = ({ title, value }) => (
  <Stack
    className="section_content_row_container"
    direction="row"
    justifyContent="space-between"
  >
    <div>{title}</div>
    <div>{value}</div>
  </Stack>
);
