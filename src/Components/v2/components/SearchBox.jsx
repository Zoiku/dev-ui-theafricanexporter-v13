import React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

export const SearchBox = () => {
  return (
    <Paper
      component="form"
      sx={{
        boxShadow: "none",
        border: "1px solid rgb(220, 220, 220)",
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        style={{
          padding: "5px",
          display: "grid",
          placeContent: "center",
        }}
      >
        <SearchIcon />
      </div>

      <InputBase
        name="search"
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search"
        inputProps={{
          "aria-label": "search frequently asked questions",
        }}
      />
    </Paper>
  );
};

export default SearchBox;
