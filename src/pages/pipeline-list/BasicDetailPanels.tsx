import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import "./BasicDetailPanels.scss";
import { CircularProgress, IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import StopRoundedIcon from "@mui/icons-material/StopRounded";
import AccountTreeRounded from "@mui/icons-material/AccountTreeRounded";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { pipelineService } from "../../services/PipelineService";
import { PipelineDescription } from "../../services/types";
import { PipelineActualDefinition } from "../pipeline-actual-definition/PipelineActualDefinition";

// Main component
export default function BasicDetailPanels() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedPipelineId, setSelectedPipelineId] = useState<string | null>(
    null
  );
  const [pipelines, setPipelines] = useState<PipelineDescription[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showDialog, setShowDialog] = useState<boolean>(false);

  useEffect(() => {
    const fetchPipelines = async () => {
      try {
        const data = await pipelineService.getPipelineDescriptionList();
        // console.log(data);
        setPipelines(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch pipeline pipelines");
        console.error(err);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchPipelines();
  }, []); // Empty dependency array to run only on mount

  if (loading)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height={500}
      >
        <CircularProgress />
      </Box>
    ); // Show loading indicator while data is being fetched
  if (error)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height={500}
      >
        {error}
      </Box>
    ); // Show error message if there was an error fetching data

  // Handle opening the menu
  const handleMenuClick = (
    event: React.MouseEvent<HTMLElement>,
    pipelineId: string
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedPipelineId(pipelineId);
  };

  // Handle closing the menu
  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedPipelineId(null);
  };
  // Handle opening the dialog
  const handleDialogOpen = (pipelineId: string) => {
    handleMenuClose(); // Close the menu before opening the dialog
    setSelectedPipelineId(pipelineId); // Set the pipelineId to pass to the dialog
    setShowDialog(true);
  };

  // Handle closing the dialog
  const handleDialogClose = () => {
    setShowDialog(false);
    setSelectedPipelineId(null);
  };

  // Transform data for DataGrid
  const rows = pipelines.map((pipeline) => ({
    id: pipeline.pipelineId, // Required field for DataGrid
    name: pipeline.name,
    lastActivationTime:
      pipeline.fields.find((field) => field.key === "lastActivationTime")
        ?.stringValue || "",
    nextRunTime:
      pipeline.fields.find((field) => field.key === "nextRunTime")
        ?.stringValue || "",
    healthStatus:
      pipeline.fields.find((field) => field.key === "healthStatus")
        ?.stringValue || "",
    pipelineState:
      pipeline.fields.find((field) => field.key === "pipelineState")
        ?.stringValue || "",
    scheduledPeriod:
      pipeline.fields.find((field) => field.key === "scheduledPeriod")
        ?.stringValue || "",

    //! Tags
    // Environment:
    //   pipeline.tags.find((tag) => tag.key === "Environment")?.value || "",
    // Owner: pipeline.tags.find((tag) => tag.key === "Owner")?.value || "",
  }));

  // Define columns based on pipeline data
  const columns: GridColDef[] = [
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
            open={Boolean(anchorEl) && selectedPipelineId === params.row.id}
            onClose={handleMenuClose}
            sx={{
              "& .MuiPaper-root": {
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              },
            }}
          >
            <MenuItem
              onClick={() => console.log(`Run pipeline ${params.row.id}`)}
              sx={{ color: "var(--boston-blue)" }}
            >
              <PlayArrowRoundedIcon sx={{ fontSize: 30, marginRight: "8px" }} />
              Run
            </MenuItem>
            <MenuItem
              onClick={() => console.log(`Stop pipeline ${params.row.id}`)}
              sx={{ color: "var(--boston-blue)" }}
            >
              <StopRoundedIcon sx={{ fontSize: 30, marginRight: "8px" }} />
              Stop
            </MenuItem>
            <MenuItem
              onClick={() => handleDialogOpen(params.row.id)} // Open dialog here
              sx={{ color: "#224958" }}
            >
              <AccountTreeRounded sx={{ fontSize: 30, marginRight: "8px" }} />
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
        rows={rows}
        rowHeight={40}
        columnHeaderHeight={45}
        disableRowSelectionOnClick
        pagination
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[10, 15, 20]}
      />
      {/* Conditionally render the PipelineActualDefinitionComponent dialog */}
      {showDialog && selectedPipelineId && (
        <PipelineActualDefinition
          pipelineId={selectedPipelineId}
          onClose={handleDialogClose}
        />
      )}
    </Box>
  );
}
