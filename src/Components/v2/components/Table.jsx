import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import LinearProgress from "@mui/material/LinearProgress";
import Toolbar, { MultipleValidation } from "../../../Material/Toolbar";
import Overlay from "../../../Material/Overlay";
import "../../../Styles/v2/Table.css";
const rowsPerPageOptions = [10, 20, 30, 40, 50];

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

export const MuiTableUsers = ({
  rows,
  rowsLoading,
  columns,
  paging,
  handlePageChange,
  handlePageSizeChange,
  label,
  handleSelectionModel = null,
  users = null,
  setReloadTable = null,
  triggerSnackBarAlert = null,
  modelLoading = null,
  setModelLoading = null,
}) => {
  return (
    <DataGrid
      components={{
        Toolbar: () =>
          MultipleValidation(
            users,
            setReloadTable,
            triggerSnackBarAlert,
            modelLoading,
            setModelLoading
          ),
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
      onSelectionModelChange={handleSelectionModel}
    />
  );
};

export const MuiTableV1 = ({
  rows,
  rowsLoading,
  columns,
  label,
  checkboxSelection = true,
  handlePageSizeChange = null,
  handlePageChange = null,
  paging,
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
      pageSize={paging.size}
      rows={rows}
      columns={columns}
      pagination
      density="compact"
      rowsPerPageOptions={[10, 20, 30, 40, 50]}
      loading={rowsLoading}
      onPageChange={handlePageChange}
      onPageSizeChange={handlePageSizeChange}
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

const DataTable = ({
  rows,
  label,
  paging,
  columns,
  height = 400,
  showToolbar = true,
  density = "compact",
  rowsLoading = false,
  checkboxSelection = true,
  paginationMode = "client",
  handlePageChange = undefined,
  handlePageSizeChange = undefined,
  handleSelectionModel = undefined,
}) => (
  <DataGrid
    pagination
    rows={rows}
    columns={columns}
    density={density}
    loading={rowsLoading}
    pageSize={paging.size}
    disableSelectionOnClick
    onPageChange={handlePageChange}
    paginationMode={paginationMode}
    sx={{ border: 0, height: height }}
    checkboxSelection={checkboxSelection}
    onPageSizeChange={handlePageSizeChange}
    rowsPerPageOptions={rowsPerPageOptions}
    onSelectionModelChange={handleSelectionModel}
    components={{
      LoadingOverlay: LinearProgress,
      Toolbar: showToolbar ? Toolbar : undefined,
      NoRowsOverlay: () => <Overlay label={label} />,
    }}
  />
);

export default MuiTable;
