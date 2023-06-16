import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import LinearProgress from "@mui/material/LinearProgress";
import Toolbar from "../../../Material/Toolbar";
import Overlay from "../../../Material/Overlay";

const MuiTable = ({
  rows,
  rowsLoading,
  columns,
  paging,
  handlePageChange,
  handlePageSizeChange,
  label,
}) => {
  return (
    <DataGrid
      components={{
        Toolbar: Toolbar,
        LoadingOverlay: LinearProgress,
        NoRowsOverlay: () => <Overlay label={label} />,
      }}
      className="standard-table"
      checkboxSelection
      disableSelectionOnClick
      pageSize={paging.size}
      rows={rows}
      columns={columns}
      pagination
      density="compact"
      rowsPerPageOptions={[10, 20, 30, 40, 50]}
      loading={rowsLoading}
      rowCount={paging.totalCount}
      paginationMode="server"
      onPageChange={handlePageChange}
      onPageSizeChange={handlePageSizeChange}
    />
  );
};

export const MuiTableV1 = ({
  rows,
  rowsLoading,
  columns,
  label,
}) => {
  return (
    <DataGrid
      components={{
        Toolbar: Toolbar,
        LoadingOverlay: LinearProgress,
        NoRowsOverlay: () => <Overlay label={label} />,
      }}
      className="standard-table"
      checkboxSelection
      disableSelectionOnClick
      rows={rows}
      columns={columns}
      pagination
      density="compact"
      rowsPerPageOptions={[10, 20, 30, 40, 50]}
      loading={rowsLoading}
    />
  );
};

export default MuiTable;
