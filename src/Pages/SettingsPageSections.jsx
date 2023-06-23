import { Stack } from "@mui/material";

export const ProfileSection = ({ title, children }) => {
  return (
    <section className="profile_section">
      <div className="profile_section_title">{title}</div>
      <div className="profile_section_rows">{children}</div>
    </section>
  );
};

export const ProfileSectionRow = ({ children }) => {
  return (
    <Stack
      className="profile_row"
      direction="row"
      justifyItems="space-between"
      spacing={1}
    >
      {children}
    </Stack>
  );
};
