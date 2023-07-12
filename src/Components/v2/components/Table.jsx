import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import LinearProgress from "@mui/material/LinearProgress";
import Toolbar, { MultipleValidation } from "../../../Material/Toolbar";
import Overlay from "../../../Material/Overlay";
import "../../../Styles/v2/Table.css";

const rowsPerPageOptions = [10, 20, 30, 40, 50];
export const ClientSideTable = ({
  rows,
  label,
  paging,
  columns,
  height = 400,
  showToolbar = true,
  density = "compact",
  rowsLoading = false,
  checkboxSelection = true,
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
    pageSize={paging?.size}
    paginationMode="client"
    disableSelectionOnClick
    onPageChange={handlePageChange}
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

export const ServerSideTable = ({
  rows,
  label,
  paging,
  columns,
  height = 400,
  users = undefined,
  showToolbar = true,
  density = "compact",
  rowsLoading = false,
  modelLoading = undefined,
  checkboxSelection = true,
  setReloadTable = undefined,
  setModelLoading = undefined,
  showMerchantToolbar = false,
  handlePageChange = undefined,
  handlePageSizeChange = undefined,
  handleSelectionModel = undefined,
  triggerSnackBarAlert = undefined,
}) => (
  <DataGrid
    pagination
    rows={rows}
    columns={columns}
    density={density}
    loading={rowsLoading}
    paginationMode="server"
    pageSize={paging?.size}
    disableSelectionOnClick
    onPageChange={handlePageChange}
    sx={{ border: 0, height: height }}
    checkboxSelection={checkboxSelection}
    onPageSizeChange={handlePageSizeChange}
    rowsPerPageOptions={rowsPerPageOptions}
    onSelectionModelChange={handleSelectionModel}
    rowCount={paging?.totalCount}
    components={{
      LoadingOverlay: LinearProgress,
      Toolbar: showToolbar
        ? showMerchantToolbar
          ? () =>
              MultipleValidation(
                users,
                setReloadTable,
                triggerSnackBarAlert,
                modelLoading,
                setModelLoading
              )
          : Toolbar
        : undefined,
      NoRowsOverlay: () => <Overlay label={label} />,
    }}
  />
);
