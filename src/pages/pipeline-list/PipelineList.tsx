import Header from "../../components/Header";
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridColDef,
  GridColumnVisibilityModel,
  GridToolbar,
} from "@mui/x-data-grid";
import "./PipelineList.scss";
import {
  Breadcrumbs,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import Link from "@mui/material/Link";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import StopRoundedIcon from "@mui/icons-material/StopRounded";
import AccountTreeRounded from "@mui/icons-material/AccountTreeRounded";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { pipelineService } from "../../services/PipelineService";
import { PipelineDescription } from "../../services/types";
import { PipelineActualDefinition } from "../pipeline-actual-definition/PipelineActualDefinition";

const PipelineList = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedPipelineId, setSelectedPipelineId] = useState<string | null>(
    null
  );
  const [pipelines, setPipelines] = useState<PipelineDescription[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>(""); // State for search query

  useEffect(() => {
    const fetchPipelines = async () => {
      try {
        const data = await pipelineService.getPipelineDescriptionList();
        console.log("============", data);
        setPipelines(data);
        setLoading(false);
      } catch (err) {
        console.log(error);
        setError("Failed to fetch pipeline pipelines");
        console.error(err);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchPipelines();
  }, []); // Empty dependency array to run only on mount

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
    id: pipeline.pipelineId,
    name: pipeline.name,
    firstActivationTime: pipeline.fields.firstActivationTime,
    lastActivationTime: pipeline.fields.lastActivationTime,
    nextRunTime: pipeline.fields.nextRunTime,
    latestRunTime: pipeline.fields.latestRunTime,
    creationTime: pipeline.fields.creationTime,
    sphere: pipeline.fields.sphere,
    healthStatusUpdatedTime: pipeline.fields.healthStatusUpdatedTime,
    scheduledStartTime: pipeline.fields.scheduledStartTime,
    scheduledEndTime: pipeline.fields.scheduledEndTime,
    healthStatus: pipeline.fields.healthStatus,
    pipelineCreator: pipeline.fields.pipelineCreator,
    version: pipeline.fields.version,
    pipelineState: pipeline.fields.pipelineState,
    accountId: pipeline.fields.accountId,
    uniqueId: pipeline.fields.uniqueId,
    userId: pipeline.fields.userId,
    scheduledPeriod: pipeline.fields.scheduledPeriod,
    tags: pipeline.tags,
  }));

  // Filter rows based on search query
  const filteredRows = rows.filter(
    (row) =>
      row.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Add state for column visibility
  const [columnVisibilityModel, setColumnVisibilityModel] =
    useState<GridColumnVisibilityModel>({
      id: true,
      name: true,
      lastActivationTime: true,
      nextRunTime: true,
      healthStatus: true,
      pipelineState: true,
      scheduledPeriod: true,
      actions: true,
      // Set the rest of the columns to false (hidden)
      creationTime: false,
      sphere: false,
      healthStatusUpdatedTime: false,
      scheduledStartTime: false,
      scheduledEndTime: false,
      latestRunTime: false,
      pipelineCreator: false,
      version: false,
      accountId: false,
      uniqueId: false,
      userId: false,
      firstActivationTime: false,
    });

  // Define columns based on pipeline data
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Pipeline ID",
      width: 200,
      type: "string",
      align: "center",
      headerAlign: "center",
      hideable: false,
      renderCell: (params) => (
        <RouterLink
          to={`/pipeline/details/${params.value}`}
          className="pipeline-id-link"
          state={{
            pipelineId: params.row.id,
            pipelineName: params.row.name,
            scheduledPeriod: params.row.scheduledPeriod,
            scheduledStartTime: params.row.scheduledStartTime,
            scheduledEndTime: params.row.scheduledEndTime,
            pipelineTags: params.row.tags, // Assuming PipelineTag is inside fields
          }}
        >
          {params.value}
        </RouterLink>
      ),
    },
    {
      field: "name",
      headerName: "Pipeline Name",
      type: "string",
      width: 240,
      align: "center",
      headerAlign: "center",
      hideable: true,
    },
    {
      field: "firstActivationTime",
      headerName: "First Activation Time",
      type: "dateTime",
      width: 180,
      align: "center",
      headerAlign: "center",
      hideable: true,
    },
    {
      field: "lastActivationTime",
      headerName: "Last Activation Time",
      type: "dateTime",
      width: 190,
      align: "center",
      headerAlign: "center",
      hideable: true,
    },
    {
      field: "nextRunTime",
      headerName: "Next Run Time",
      type: "dateTime",
      width: 170,
      align: "center",
      headerAlign: "center",
      hideable: true,
    },
    {
      field: "latestRunTime",
      headerName: "Latest Run Time",
      type: "dateTime",
      width: 180,
      align: "center",
      headerAlign: "center",
      hideable: true,
    },
    {
      field: "creationTime",
      headerName: "Creation Time",
      type: "dateTime",
      width: 180,
      align: "center",
      headerAlign: "center",
      hideable: true,
    },
    {
      field: "sphere",
      headerName: "Sphere",
      type: "string",
      width: 100,
      align: "center",
      headerAlign: "center",
      hideable: true,
    },
    {
      field: "healthStatusUpdatedTime",
      headerName: "Health Status Updated Time",
      type: "dateTime",
      width: 180,
      align: "center",
      headerAlign: "center",
      hideable: true,
    },
    {
      field: "scheduledStartTime",
      headerName: "Scheduled Start Time",
      type: "dateTime",
      width: 180,
      align: "center",
      headerAlign: "center",
      hideable: true,
    },
    {
      field: "scheduledEndTime",
      headerName: "Scheduled End Time",
      type: "dateTime",
      width: 180,
      align: "center",
      headerAlign: "center",
      hideable: true,
    },
    {
      field: "healthStatus",
      headerName: "Health Status",
      type: "string",
      width: 140,
      align: "center",
      headerAlign: "center",
      hideable: true,
    },
    {
      field: "pipelineCreator",
      headerName: "Pipeline Creator",
      type: "string",
      width: 350,
      align: "center",
      headerAlign: "center",
      hideable: true,
    },
    {
      field: "version",
      headerName: "Version",
      type: "number",
      width: 100,
      align: "center",
      headerAlign: "center",
      hideable: true,
    },
    {
      field: "pipelineState",
      headerName: "Pipeline State",
      type: "string",
      width: 150,
      align: "center",
      headerAlign: "center",
      hideable: true,
    },
    {
      field: "accountId",
      headerName: "Account Id",
      type: "number",
      width: 150,
      align: "center",
      headerAlign: "center",
      hideable: true,
    },
    {
      field: "uniqueId",
      headerName: "Unique Id",
      type: "string",
      width: 300,
      align: "center",
      headerAlign: "center",
      hideable: true,
    },
    {
      field: "userId",
      headerName: "User Id",
      type: "number",
      width: 150,
      align: "center",
      headerAlign: "center",
      hideable: true,
    },
    {
      field: "scheduledPeriod",
      headerName: "Scheduled Period",
      type: "string",
      width: 170,
      align: "center",
      headerAlign: "center",
      hideable: true,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      align: "center",
      headerAlign: "center",
      hideable: false,
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
  function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
  }
  const paginationModel = { page: 0, pageSize: 10 };
  return (
    <Box className="container container-xxl" mt="20px">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="flex-end"
        sx={{ marginBottom: "20px" }}
        className="container header-search-container"
      >
        <Box
          display="flex"
          flexDirection="column"
          sx={{ marginBottom: "20px" }}
          className="header"
        >
          <Box role="presentation" onClick={handleClick}>
            <Breadcrumbs aria-label="breadcrumb">
              <Link
                underline="hover"
                color="var(--boston-blue)"
                to="/"
                component={RouterLink}
              >
                Home
              </Link>
              <Typography
                sx={{ color: "var(--boston-blue)", fontWeight: "600" }}
              >
                PipelineList
              </Typography>
            </Breadcrumbs>
          </Box>
          <Header title="Pipeline List" />
        </Box>

        <Box className="search-container">
          <IconButton className="icon">
            <SearchIcon />
          </IconButton>
          <TextField
            className="search-box"
            variant="outlined"
            size="small"
            placeholder="Search"
            value={searchQuery} // Bind the value to state
            onChange={(e) => setSearchQuery(e.target.value)} // Update state on input change
            sx={{
              backgroundColor: "whitesmoke",
              border: "none",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  border: "none",
                },
              },
            }}
            fullWidth
          />
        </Box>
      </Box>
      <Box className="container ">
        <Box className="container pipeline-list-container">
          <DataGrid
            sx={{ boxShadow: "4", height: 500 }}
            loading={loading}
            columns={columns}
            rows={filteredRows}
            rowHeight={40}
            columnHeaderHeight={45}
            disableRowSelectionOnClick
            pagination
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[10, 15, 20]}
            slots={{ toolbar: GridToolbar }}
            slotProps={{
              loadingOverlay: {
                variant: "skeleton",
                noRowsVariant: "skeleton",
              },
            }}
            columnVisibilityModel={columnVisibilityModel} // Apply column visibility model
            onColumnVisibilityModelChange={
              (newModel) => setColumnVisibilityModel(newModel) // Update state when column visibility changes
            }
          />
          {/* Conditionally render the PipelineActualDefinitionComponent dialog */}
          {showDialog && selectedPipelineId && (
            <PipelineActualDefinition
              pipelineId={selectedPipelineId}
              onClose={handleDialogClose}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default PipelineList;
