import { Stack } from "@mui/material";
import "../../../Styles/v2/MainBox.css";

const MainBox = ({ title, helper, children }) => {
  return (
    <Stack className="page_table_box" direction="column" spacing={2}>
      <div className="page_title_container">
        <div className="page_title">{title}</div>
        <div className="page_helper">{helper}</div>
      </div>
      <div className="page_table">{children}</div>
    </Stack>
  );
};

export default MainBox;
