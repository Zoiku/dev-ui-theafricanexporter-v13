import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import LinearProgress from "@mui/material/LinearProgress";
import Toolbar from "../../../Material/Toolbar";
import Overlay from "../../../Material/Overlay";
import "../../../Styles/v2/Table.css";

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
      className="main_table_box_standard main_table_all"
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
  checkboxSelection = true,
}) => {
  return (
    <DataGrid
      components={{
        Toolbar: Toolbar,
        LoadingOverlay: LinearProgress,
        NoRowsOverlay: () => <Overlay label={label} />,
      }}
      className="main_table_box_standard main_table_all"
      checkboxSelection={checkboxSelection}
      disableSelectionOnClick
      pageSize={10}
      rows={rows}
      columns={columns}
      pagination
      density="compact"
      rowsPerPageOptions={[10, 20, 30, 40, 50]}
      loading={rowsLoading}
    />
  );
};

export const MuiTableV2 = ({
  rows,
  rowsLoading,
  columns,
  checkboxSelection = true,
  handleSelectionModel = null,
}) => {
  return (
    <DataGrid
      components={{
        LoadingOverlay: LinearProgress,
      }}
      className="main_table_box_offerings_table main_table_all"
      checkboxSelection={checkboxSelection}
      disableSelectionOnClick
      rows={rows}
      columns={columns}
      pagination
      density="compact"
      rowsPerPageOptions={[10, 20, 30, 40, 50]}
      loading={rowsLoading}
      onSelectionModelChange={handleSelectionModel}
    />
  );
};

export default MuiTable;
