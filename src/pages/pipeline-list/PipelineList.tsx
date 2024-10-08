import Header from "../../components/Header";
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridColumnVisibilityModel,
  GridRowId,
  GridToolbar,
} from "@mui/x-data-grid";
import "./PipelineList.scss";
import { Breadcrumbs, IconButton, TextField, Typography } from "@mui/material";
import Link from "@mui/material/Link";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import StopRoundedIcon from "@mui/icons-material/StopRounded";
import AccountTreeRounded from "@mui/icons-material/AccountTreeRounded";
import SearchIcon from "@mui/icons-material/Search";
import { useCallback, useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { pipelineService } from "../../services/PipelineService";
import { PipelineDescription } from "../../services/types";
import { PipelineActualDefinition } from "../pipeline-actual-definition/PipelineActualDefinition";
import { useSnackbar } from "../../components/Snackbar";

const PipelineList = () => {
  const [pipelines, setPipelines] = useState<PipelineDescription[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [openDefinitionDialog, setOpenDefinitionDialog] =
    useState<boolean>(false);
  const [selectedPipelineId, setSelectedPipelineId] = useState<string | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchPipelines = async () => {
      try {
        const data = await pipelineService.getPipelineDescriptionList();
        // console.log("============", data);
        setPipelines(data);
        setLoading(false);
        showSnackbar("Pipeline List fetched successfully!", "success");
      } catch (error) {
        console.error("Failed to fetch Pipeline List:", error);
        showSnackbar("Failed to fetch Pipeline List", "error");
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchPipelines();
  }, []); // Empty dependency array to run only on mount

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
      width: 250,
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
      type: "actions",
      width: 80,
      hideable: false,
      getActions: (params) => [
        <GridActionsCellItem
          className="actions-cell-item"
          // sx={{ color: "var(--boston-blue)", fontWeight: 600 }}
          icon={<PlayArrowRoundedIcon />}
          label="Run"
          onClick={handleRun(params.id)}
          showInMenu
        />,
        <GridActionsCellItem
          className="actions-cell-item"
          icon={<StopRoundedIcon />}
          label="Stop"
          onClick={handleStop(params.id)}
          showInMenu
        />,
        <GridActionsCellItem
          className="actions-cell-item"
          icon={<AccountTreeRounded />}
          label="Actual Definition"
          onClick={handleOpenActualDefinition(params.id)}
          showInMenu
        />,
      ],
    },
  ];

  const handleRun = useCallback(
    (id: GridRowId) => () => {
      console.log("run ", id);
    },
    []
  );

  const handleStop = useCallback(
    (id: GridRowId) => () => {
      console.log("stop ", id);
    },
    []
  );
  const handleOpenActualDefinition = useCallback(
    (id: GridRowId) => () => {
      setSelectedPipelineId(String(id));
      setOpenDefinitionDialog(true);
    },
    []
  );

  function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.preventDefault();
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
          {openDefinitionDialog && selectedPipelineId && (
            <PipelineActualDefinition
              pipelineId={selectedPipelineId}
              onClose={() => setOpenDefinitionDialog(false)}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default PipelineList;
