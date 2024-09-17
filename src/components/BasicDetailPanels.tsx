import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import "./BasicDetailPanels.scss";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import StopRoundedIcon from "@mui/icons-material/StopRounded";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import { useState } from "react";
import { Link } from "react-router-dom";

// Sample pipelines data
const pipelines = [
  {
    id: "df-108629H99LAQP69P9OVE",
    name: "cbi-set-anaplan-trigger",
    lastActivationTime: "2023-10-11T22:18:24",
    nextRunTime: "2024-02-13T12:00:00",
    healthStatus: "HEALTHY",
    pipelineState: "SCHEDULED",
    scheduledPeriod: "1 day",
    scheduleInfo: {
      start: "2023-10-10T12:00:00",
      end: "2024-02-13T02:48:37",
      period: "1 day",
    },
    tags: {
      Environment: "non-production",
      Name: "cbi-set-accounts-nonbuys-report-trigger-mon",
      Owner: "salesexecutionteamproductengineering@cbrands.com",
    },
  },
  {
    id: "df-100622299CUZZ673XLXDO",
    name: "cbi-set-upc-planogram",
    lastActivationTime: "2024-02-13T02:48:37",
    nextRunTime: "2024-02-13T02:48:37",
    healthStatus: "ERROR",
    pipelineState: "FINISHED",
    scheduledPeriod: "100 years",
    scheduleInfo: null,
    tags: {
      Environment: "non-production",
      Name: "cbi-set-accounts-nonbuys-report-trigger-mon",
      Owner: "salesexecutionteamproductengineering@cbrands.com",
    },
  },
  {
    id: "df-108629399LAUP66P9OVE",
    name: "cbi-set-anaplan-trigger",
    lastActivationTime: "2023-10-11T22:18:24",
    nextRunTime: "2024-02-13T12:00:00",
    healthStatus: "HEALTHY",
    pipelineState: "SCHEDULED",
    scheduledPeriod: "1 day",
    scheduleInfo: {
      start: "2023-10-10T12:00:00",
      end: "2024-02-13T02:48:37",
      period: "1 day",
    },
    tags: {
      Environment: "non-production",
      Name: "cbi-set-accounts-nonbuys-report-trigger-mon",
      Owner: "salesexecutionteamproductengineering@cbrands.com",
    },
  },
  {
    id: "df-105622299CTYZZ673XLXDO",
    name: "cbi-set-upc-planogram",
    lastActivationTime: "2024-02-13T02:48:37",
    nextRunTime: "2024-02-13T02:48:37",
    healthStatus: "ERROR",
    pipelineState: "FINISHED",
    scheduledPeriod: "100 years",
    scheduleInfo: null,
    tags: {
      Environment: "non-production",
      Name: "cbi-set-accounts-nonbuys-report-trigger-mon",
      Owner: "salesexecutionteamproductengineering@cbrands.com",
    },
  },
  {
    id: "df-108629399LPQP69P9OVE",
    name: "cbi-set-anaplan-trigger",
    lastActivationTime: "2023-10-11T22:18:24",
    nextRunTime: "2024-02-13T12:00:00",
    healthStatus: "HEALTHY",
    pipelineState: "SCHEDULED",
    scheduledPeriod: "1 day",
    scheduleInfo: {
      start: "2023-10-10T12:00:00",
      end: "2024-02-13T02:48:37",
      period: "1 day",
    },
    tags: {
      Environment: "non-production",
      Name: "cbi-set-accounts-nonbuys-report-trigger-mon",
      Owner: "salesexecutionteamproductengineering@cbrands.com",
    },
  },
  {
    id: "df-105622299CUZ7673XLXDO",
    name: "cbi-set-upc-planogram",
    lastActivationTime: "2024-02-13T02:48:37",
    nextRunTime: "2024-02-13T02:48:37",
    healthStatus: "ERROR",
    pipelineState: "FINISHED",
    scheduledPeriod: "100 years",
    scheduleInfo: null,
    tags: {
      Environment: "non-production",
      Name: "cbi-set-accounts-nonbuys-report-trigger-mon",
      Owner: "salesexecutionteamproductengineering@cbrands.com",
    },
  },
  {
    id: "df-108629J99LAQP66P9OVE",
    name: "cbi-set-anaplan-trigger",
    lastActivationTime: "2023-10-11T22:18:24",
    nextRunTime: "2024-02-13T12:00:00",
    healthStatus: "HEALTHY",
    pipelineState: "SCHEDULED",
    scheduledPeriod: "1 day",
    scheduleInfo: {
      start: "2023-10-10T12:00:00",
      end: "2024-02-13T02:48:37",
      period: "1 day",
    },
    tags: {
      Environment: "non-production",
      Name: "cbi-set-accounts-nonbuys-report-trigger-mon",
      Owner: "salesexecutionteamproductengineering@cbrands.com",
    },
  },
  {
    id: "df-105622299CU4Z673XLXDO",
    name: "cbi-set-upc-planogram",
    lastActivationTime: "2024-02-13T02:48:37",
    nextRunTime: "2024-02-13T02:48:37",
    healthStatus: "ERROR",
    pipelineState: "FINISHED",
    scheduledPeriod: "100 years",
    scheduleInfo: null,
    tags: {
      Environment: "non-production",
      Name: "cbi-set-accounts-nonbuys-report-trigger-mon",
      Owner: "salesexecutionteamproductengineering@cbrands.com",
    },
  },
  {
    id: "df-108629399LAQW69P9OVE",
    name: "cbi-set-anaplan-trigger",
    lastActivationTime: "2023-10-11T22:18:24",
    nextRunTime: "2024-02-13T12:00:00",
    healthStatus: "HEALTHY",
    pipelineState: "SCHEDULED",
    scheduledPeriod: "1 day",
    scheduleInfo: {
      start: "2023-10-10T12:00:00",
      end: "2024-02-13T02:48:37",
      period: "1 day",
    },
    tags: {
      Environment: "non-production",
      Name: "cbi-set-accounts-nonbuys-report-trigger-mon",
      Owner: "salesexecutionteamproductengineering@cbrands.com",
    },
  },
  {
    id: "df-105622Y99CUZZ673XLXDO",
    name: "cbi-set-upc-planogram",
    lastActivationTime: "2024-02-13T02:48:37",
    nextRunTime: "2024-02-13T02:48:37",
    healthStatus: "ERROR",
    pipelineState: "FINISHED",
    scheduledPeriod: "100 years",
    scheduleInfo: null,
    tags: {
      Environment: "non-production",
      Name: "cbi-set-accounts-nonbuys-report-trigger-mon",
      Owner: "salesexecutionteamproductengineering@cbrands.com",
    },
  },
  {
    id: "df-198629399LAQP66P9OVE",
    name: "cbi-set-anaplan-trigger",
    lastActivationTime: "2023-10-11T22:18:24",
    nextRunTime: "2024-02-13T12:00:00",
    healthStatus: "HEALTHY",
    pipelineState: "SCHEDULED",
    scheduledPeriod: "1 day",
    scheduleInfo: {
      start: "2023-10-10T12:00:00",
      end: "2024-02-13T02:48:37",
      period: "1 day",
    },
    tags: {
      Environment: "non-production",
      Name: "cbi-set-accounts-nonbuys-report-trigger-mon",
      Owner: "salesexecutionteamproductengineering@cbrands.com",
    },
  },
  {
    id: "df-105622299CDZZ673XLXDO",
    name: "cbi-set-upc-planogram",
    lastActivationTime: "2024-02-13T02:48:37",
    nextRunTime: "2024-02-13T02:48:37",
    healthStatus: "ERROR",
    pipelineState: "FINISHED",
    scheduledPeriod: "100 years",
    scheduleInfo: null,
    tags: {
      Environment: "non-production",
      Name: "cbi-set-accounts-nonbuys-report-trigger-mon",
      Owner: "salesexecutionteamproductengineering@cbrands.com",
    },
  },
  {
    id: "df-108629199L9QP69P9OVE",
    name: "cbi-set-anaplan-trigger",
    lastActivationTime: "2023-10-11T22:18:24",
    nextRunTime: "2024-02-13T12:00:00",
    healthStatus: "HEALTHY",
    pipelineState: "SCHEDULED",
    scheduledPeriod: "1 day",
    scheduleInfo: {
      start: "2023-10-10T12:00:00",
      end: "2024-02-13T02:48:37",
      period: "1 day",
    },
    tags: {
      Environment: "non-production",
      Name: "cbi-set-accounts-nonbuys-report-trigger-mon",
      Owner: "salesexecutionteamproductengineering@cbrands.com",
    },
  },
  {
    id: "df-105621299C8ZZ673XLXDO",
    name: "cbi-set-upc-planogram",
    lastActivationTime: "2024-02-13T02:48:37",
    nextRunTime: "2024-02-13T02:48:37",
    healthStatus: "ERROR",
    pipelineState: "FINISHED",
    scheduledPeriod: "100 years",
    scheduleInfo: null,
    tags: {
      Environment: "non-production",
      Name: "cbi-set-accounts-nonbuys-report-trigger-mon",
      Owner: "salesexecutionteamproductengineering@cbrands.com",
    },
  },
  {
    id: "df-128629399LAQP63P9OVE",
    name: "cbi-set-anaplan-trigger",
    lastActivationTime: "2023-10-11T22:18:24",
    nextRunTime: "2024-02-13T12:00:00",
    healthStatus: "HEALTHY",
    pipelineState: "SCHEDULED",
    scheduledPeriod: "1 day",
    scheduleInfo: {
      start: "2023-10-10T12:00:00",
      end: "2024-02-13T02:48:37",
      period: "1 day",
    },
    tags: {
      Environment: "non-production",
      Name: "cbi-set-accounts-nonbuys-report-trigger-mon",
      Owner: "salesexecutionteamproductengineering@cbrands.com",
    },
  },
  {
    id: "df-101622299CUTZ673XLXDO",
    name: "cbi-set-upc-planogram",
    lastActivationTime: "2024-02-13T02:48:37",
    nextRunTime: "2024-02-13T02:48:37",
    healthStatus: "ERROR",
    pipelineState: "FINISHED",
    scheduledPeriod: "100 years",
    scheduleInfo: null,
    tags: {
      Environment: "non-production",
      Name: "cbi-set-accounts-nonbuys-report-trigger-mon",
      Owner: "salesexecutionteamproductengineering@cbrands.com",
    },
  },
];


// Main component
export default function BasicDetailPanels() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [currentPipelineId, setCurrentPipelineId] = useState<string | null>(
    null
  );

  // Handle opening the menu
  const handleMenuClick = (
    event: React.MouseEvent<HTMLElement>,
    pipelineId: string
  ) => {
    setAnchorEl(event.currentTarget);
    setCurrentPipelineId(pipelineId);
  };

  // Handle closing the menu
  const handleMenuClose = () => {
    setAnchorEl(null);
    setCurrentPipelineId(null);
  };

  // Define columns based on pipeline data
  const columns: GridColDef<(typeof pipelines)[number]>[] = [
    {
      field: "id",
      headerName: "Pipeline ID",
      width: 200,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <Link
          to={`/pipeline/details/${params.value}`}
          className="pipeline-id-link"
        >
          {params.value}
        </Link>
      ),
    },
    {
      field: "name",
      headerName: "Pipeline Name",
      width: 190,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "lastActivationTime",
      headerName: "Last Activation Time",
      width: 190,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "nextRunTime",
      headerName: "Next Run Time",
      width: 190,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "healthStatus",
      headerName: "Health Status",
      width: 170,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "pipelineState",
      headerName: "Pipeline State",
      width: 170,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "scheduledPeriod",
      headerName: "Scheduled Period",
      width: 170,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 90,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <>
          <IconButton
            onClick={(event) => handleMenuClick(event, params.row.id)}
            aria-controls="actions-menu"
            aria-haspopup="true"
          >
            <MoreVertIcon />
          </IconButton>

          {/* Dropdown menu */}
          <Menu
            id="actions-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl) && currentPipelineId === params.row.id}
            onClose={handleMenuClose}
          >
            <MenuItem
              onClick={() => console.log(`Run pipeline ${params.row.id}`)}
              sx={{ color: "#224958" }}
            >
              <PlayArrowRoundedIcon sx={{ fontSize: 30, marginRight: "8px" }} />
              Run
            </MenuItem>
            <MenuItem
              onClick={() => console.log(`Stop pipeline ${params.row.id}`)}
              sx={{ color: "#224958" }}
            >
              <StopRoundedIcon sx={{ fontSize: 30, marginRight: "8px" }} />
              Stop
            </MenuItem>
            <MenuItem
              onClick={() =>
                console.log(`Download definition for pipeline ${params.row.id}`)
              }
              sx={{ color: "#224958" }}
            >
              <DownloadRoundedIcon sx={{ fontSize: 30, marginRight: "8px" }} />
              Actual Definition
            </MenuItem>
          </Menu>
        </>
      ),
    },
  ];

  const paginationModel = { page: 0, pageSize: 10 };
  return (
    <Box className="pipeline-list-container">
      <DataGrid
        sx={{ boxShadow: "4", height: 500 }}
        columns={columns}
        rows={pipelines}
        rowHeight={40}
        columnHeaderHeight={45}
        disableRowSelectionOnClick
        pagination
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[10, 15, 20]}
      />
    </Box>
  );
}
