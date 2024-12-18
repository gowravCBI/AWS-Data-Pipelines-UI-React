import Header from "../../components/Header";
import Box from "@mui/material/Box";
import {
  GridActionsCellItem,
  GridColDef,
  GridColumnVisibilityModel,
  GridDeleteIcon,
  GridRowId,
} from "@mui/x-data-grid";
import "./PipelineList.scss";
import { Breadcrumbs, Button, Stack, Typography } from "@mui/material";
import Link from "@mui/material/Link";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import StopRoundedIcon from "@mui/icons-material/StopRounded";
import PolylineRoundedIcon from "@mui/icons-material/PolylineRounded";
import AccountTreeRounded from "@mui/icons-material/AccountTreeRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { useCallback, useEffect, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { pipelineService } from "../../services/PipelineService";
import { PipelineDescription } from "../../services/types";
import { PipelineActualDefinition } from "../pipeline-actual-definition/PipelineActualDefinition";
import { useSnackbar } from "../../components/Snackbar";
import DataGridTable from "../../components/DataGridTable";
import SearchBox from "../../components/SearchBox";
import { PipelineCreation } from "../pipeline-creation/PipelineCreation";
import { PipelinePutDefinition } from "../pipeline-put-definition/PipelinePutDefinition";

const PipelineList = () => {
  const [pipelines, setPipelines] = useState<PipelineDescription[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [openDefinitionDialog, setOpenDefinitionDialog] =
    useState<boolean>(false);
  const [openCreationDialog, setOpenCreationDialog] = useState<boolean>(false);
  const [openPutDefinitionDialog, setOpenPutDefinitionDialog] =
    useState<boolean>(false);
  const [selectedPipelineId, setSelectedPipelineId] = useState<string | null>(
    null
  );
  const [selectedPipelineName, setSelectedPipelineName] = useState<
    string | null
  >(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPipelines = async () => {
      try {
        const data = await pipelineService.getPipelineDescriptionList();
        // console.log("============", data);
        setPipelines(data);
        showSnackbar("Pipeline List fetched successfully!", "success");
      } catch (error) {
        console.error("Failed to fetch Pipeline List:", error);
        showSnackbar("Failed to fetch Pipeline List", "error");
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
        >
          {params.value}
        </RouterLink>
      ),
    },
    {
      field: "name",
      headerName: "Pipeline Name",
      type: "string",
      width: 230,
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
      width: 150,
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
      width: 70,
      hideable: false,
      getActions: (params) => [
        <GridActionsCellItem
          className="actions-cell-item"
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
          icon={<PolylineRoundedIcon />}
          label="Put Definition"
          onClick={handleOpenPutDefinition(params.id, params.row.name)}
          showInMenu
        />,
        <GridActionsCellItem
          className="actions-cell-item"
          icon={<AccountTreeRounded />}
          label="Actual Definition"
          onClick={handleOpenActualDefinition(params.id, params.row.name)}
          showInMenu
        />,
        <GridActionsCellItem
          className="actions-cell-item"
          icon={<GridDeleteIcon />}
          label="Delete"
          onClick={handleDeletePipeline(params.id)}
          showInMenu
        />,
      ],
    },
  ];

  const handleRun = useCallback(
    (id: GridRowId) => () => {
      console.log("run ", id);
      setLoading(true); // Set loading state to true when starting the pipeline activation
      const activatePipelines = async (id: string) => {
        try {
          await pipelineService.activateDataPipeline(id);
          // console.log("============", data);
          showSnackbar("Pipeline Activated successfully!", "success");
        } catch (error) {
          console.error("Failed to Activate Pipeline :", error);
          showSnackbar("Failed to Activate Pipeline ", "error");
        } finally {
          setLoading(false);
          navigate(0); // This will refresh the current route
        }
      };
      activatePipelines(id as string);
    },
    []
  );

  const handleStop = useCallback(
    (id: GridRowId) => () => {
      console.log("stop ", id);
      setLoading(true); // Set loading state to true when starting the pipeline activation
      const deactivatePipelines = async (id: string) => {
        try {
          await pipelineService.deactivateDataPipeline(id);
          // console.log("============", data);
          showSnackbar("Pipeline Deactivated successfully!", "success");
        } catch (error) {
          console.error("Failed to Deactivate Pipeline :", error);
          showSnackbar("Failed to Deactivate Pipeline ", "error");
        } finally {
          setLoading(false);
          navigate(0); // This will refresh the current route
        }
      };
      deactivatePipelines(id as string);
    },
    []
  );
  const handleOpenPutDefinition = useCallback(
    (id: GridRowId, name: string) => () => {
      // console.log("put -----", id);
      setSelectedPipelineId(String(id));
      setSelectedPipelineName(name);
      setOpenPutDefinitionDialog(true);
    },
    []
  );
  const handleOpenActualDefinition = useCallback(
    (id: GridRowId, name: string) => () => {
      setSelectedPipelineId(String(id));
      setSelectedPipelineName(name);
      setOpenDefinitionDialog(true);
    },
    []
  );

  const handleDeletePipeline = useCallback(
    (id: GridRowId) => () => {
      setLoading(true); // Set loading state to true when starting the pipeline activation
      // console.log("PipelineId :: ", id);
      const deleteDataPipeline = async (id: string) => {
        try {
          const response = await pipelineService.deletePipeline(id);
          showSnackbar(String(response), "success");
        } catch (error) {
          console.error("Failed to Delete Pipeline :", error);
          showSnackbar(`Failed to Delete pipeline with ID: ${id}.`, "error");
        } finally {
          setLoading(false);
          navigate(0); // This will refresh the current route
        }
      };
      deleteDataPipeline(id as string);
    },
    []
  );

  const handleOpenCreatePipeline = () => {
    setOpenCreationDialog(true);
  };
  function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.preventDefault();
  }
  const paginationModel = { page: 0, pageSize: 10 };
  return (
    <Box className="container container-xxl">
      <Box
        display="flex"
        flexDirection="column"
        className=" container header-breadcrumbs-container"
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
            <Typography sx={{ color: "var(--boston-blue)", fontWeight: "600" }}>
              PipelineList
            </Typography>
          </Breadcrumbs>
        </Box>
        <Header title="Pipeline List" />
      </Box>
      <Stack
        className="operation-search-container"
        direction="row"
        spacing={2}
        alignItems="center"
        justifyContent="flex-end"
        sx={{ marginBottom: "20px", marginRight: "30px" }}
      >
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddRoundedIcon />}
          size="small"
          onClick={handleOpenCreatePipeline}
        >
          Create
        </Button>
        <SearchBox searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </Stack>
      <Box className="container pipeline-list-container">
        <DataGridTable
          height={500}
          loading={loading}
          columns={columns}
          rows={filteredRows}
          paginationModel={paginationModel}
          columnVisibilityModel={columnVisibilityModel}
          onColumnVisibilityModelChange={setColumnVisibilityModel}
        />

        {/* Conditionally render the PipelineActualDefinitionComponent dialog */}
        {openDefinitionDialog && selectedPipelineId && (
          <PipelineActualDefinition
            pipelineId={selectedPipelineId}
            pipelineName={selectedPipelineName}
            onClose={() => setOpenDefinitionDialog(false)}
          />
        )}
        {/* Conditionally render the PipelinePutDefinitionComponent dialog */}
        {openPutDefinitionDialog && selectedPipelineId && (
          <PipelinePutDefinition
            pipelineId={selectedPipelineId}
            pipelineName={selectedPipelineName}
            onClose={() => setOpenPutDefinitionDialog(false)}
          />
        )}

        {/* Conditionally render the PipelineActualDefinitionComponent dialog */}
        {openCreationDialog && (
          <PipelineCreation onClose={() => setOpenCreationDialog(false)} />
        )}
      </Box>
    </Box>
  );
};

export default PipelineList;
