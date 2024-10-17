import {
  Box,
  Breadcrumbs,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Header from "../../components/Header";
import { GridColDef, GridColumnVisibilityModel } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Link as RouterLink, useLocation, useParams } from "react-router-dom";
import { pipelineService } from "../../services/PipelineService";
import { RunDetails, PipelineTag } from "../../services/types";
import { useSnackbar } from "../../components/Snackbar";
import "./PipelineDetails.scss";
import DataGridTable from "../../components/DataGridTable";
import SearchBox from "../../components/SearchBox";

const PipelineDetails = () => {
  const { pipelineId } = useParams<{ pipelineId: string }>();
  const [loading, setLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>(""); // State for search query
  const location = useLocation(); // Access the location
  const { showSnackbar } = useSnackbar();
  const [pipelineRunDetails, setPipelineRunDetails] = useState<RunDetails[]>(
    []
  );
  const {
    pipelineName,
    pipelineTags,
    scheduledPeriod,
    scheduledStartTime,
    scheduledEndTime,
  } =
    (location.state as {
      // Destructure the passed state
      pipelineName?: string;
      pipelineTags?: PipelineTag; // Specify that pipelineTag is of type PipelineTag[]
      scheduledPeriod?: string;
      scheduledStartTime?: Date; // Change to Date
      scheduledEndTime?: Date; // Change to Date
    }) || {};

  // Ensure date objects are parsed correctly
  const formattedScheduledStartTime = scheduledStartTime
    ? new Date(scheduledStartTime).toLocaleString() // Format date as needed
    : "-";

  const formattedScheduledEndTime = scheduledEndTime
    ? new Date(scheduledEndTime).toLocaleString() // Format date as needed
    : "-";

  useEffect(() => {
    const fetchPipelinesRunDetails = async () => {
      setLoading(true);
      try {
        const data = await pipelineService.getPipelineRunDetails(
          pipelineId ?? ""
        );
        // console.log("--------", data);
        setPipelineRunDetails(data);
        setLoading(false);
        showSnackbar("List Runs of Pipeline fetched successfully!", "success");
      } catch (error) {
        console.error("Failed to fetch List Runs of Pipeline:", error);
        showSnackbar("Failed to fetch List Runs of Pipeline", "error");
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchPipelinesRunDetails();
  }, [pipelineId]);

  // Transform data for DataGrid
  const rows = pipelineRunDetails.map((pipeline) => ({
    id: pipeline.id,
    name: pipeline.name,
    parent: pipeline.parent,
    triesLeft: pipeline.triesLeft,
    headAttempt: pipeline.headAttempt,
    attemptCount: pipeline.attemptCount,
    resource: pipeline.resource,
    resourceId: pipeline.resourceId,
    resourceRegion: pipeline.resourceRegion,
    sphere: pipeline.sphere,
    type: pipeline.type,
    status: pipeline.status,
    scheduledStartTime: pipeline.scheduledStartTime,
    scheduledEndTime: pipeline.scheduledEndTime,
    actualStartTime: pipeline.actualStartTime,
    actualEndTime: pipeline.actualEndTime,
    input: pipeline.input,
    version: pipeline.version,
    componentParent: pipeline.componentParent,
  }));

  // Filter rows based on search query
  const filteredRows = rows.filter(
    (row) =>
      row.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.id.toLowerCase().includes(searchQuery.toLowerCase())
    // row.type.toString
  );

  // Add state for column visibility
  const [columnVisibilityModel, setColumnVisibilityModel] =
    useState<GridColumnVisibilityModel>({
      id: true,
      name: true,
      type: true,
      scheduledStartTime: true,
      status: true,
      actualStartTime: true,
      actualEndTime: true,
      // Set the rest of the columns to false (hidden)
      parent: false,
      triesLeft: false,
      headAttempt: false,
      attemptCount: false,
      resource: false,
      resourceId: false,
      resourceRegion: false,
      sphere: false,
      scheduledEndTime: false,
      input: false,
      version: false,
      componentParent: false,
    });

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 290,
      align: "center",
      headerAlign: "center",
      type: "string",
      hideable: false,
    },
    {
      field: "name",
      headerName: "Name",
      width: 280,
      align: "center",
      headerAlign: "center",
      type: "string",
      hideable: true,
    },
    {
      field: "parent",
      headerName: "Parent",
      width: 250,
      align: "center",
      headerAlign: "center",
      type: "string",
      hideable: true,
    },
    {
      field: "triesLeft",
      headerName: "Tries Left",
      width: 100,
      align: "center",
      headerAlign: "center",
      type: "number",
      hideable: true,
    },
    {
      field: "headAttempt",
      headerName: "Head Attempt",
      width: 350,
      align: "center",
      headerAlign: "center",
      type: "number",
      hideable: true,
    },
    {
      field: "attemptCount",
      headerName: "Attempt Count",
      width: 120,
      align: "center",
      headerAlign: "center",
      type: "number",
      hideable: true,
    },
    {
      field: "resource",
      headerName: "Resource",
      width: 250,
      align: "center",
      headerAlign: "center",
      type: "string",
      hideable: true,
    },
    {
      field: "resourceId",
      headerName: "Resource Id",
      width: 150,
      align: "center",
      headerAlign: "center",
      type: "string",
      hideable: true,
    },
    {
      field: "resourceRegion",
      headerName: "Resource Region",
      width: 150,
      align: "center",
      headerAlign: "center",
      type: "string",
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
      field: "type",
      headerName: "Type",
      width: 150,
      align: "center",
      headerAlign: "center",
      type: "string",
      hideable: true,
    },
    {
      field: "scheduledStartTime",
      headerName: "Scheduled Start Time",
      type: "dateTime",
      width: 190,
      align: "center",
      headerAlign: "center",
      hideable: true,
    },
    {
      field: "scheduledEndTime",
      headerName: "Scheduled End Time",
      type: "dateTime",
      width: 160,
      align: "center",
      headerAlign: "center",
      hideable: true,
    },
    {
      field: "status",
      headerName: "Status",
      width: 110,
      align: "center",
      headerAlign: "center",
      type: "string",
      hideable: true,
    },
    {
      field: "actualStartTime",
      headerName: "Actual Start Time",
      width: 170,
      align: "center",
      headerAlign: "center",
      type: "dateTime",
      hideable: true,
    },
    {
      field: "actualEndTime",
      headerName: "Actual End Time",
      width: 170,
      align: "center",
      headerAlign: "center",
      type: "dateTime",
      hideable: true,
    },
    {
      field: "input",
      headerName: "Input",
      width: 300,
      align: "center",
      headerAlign: "center",
      type: "string",
      hideable: true,
    },
    {
      field: "version",
      headerName: "Version",
      width: 100,
      align: "center",
      headerAlign: "center",
      type: "number",
      hideable: true,
    },
    {
      field: "componentParent",
      headerName: "Component Parent",
      width: 200,
      align: "center",
      headerAlign: "center",
      type: "string",
      hideable: true,
    },
  ];
  function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.preventDefault();
  }
  const paginationModel = { page: 0, pageSize: 10 };
  return (
    <Box className="container container-xxl" mt="20px">
      <Box
        display="flex"
        flexDirection="column"
        sx={{ marginBottom: "20px" }}
        className="container header-breadcrumbs-container"
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
            <Link
              underline="hover"
              color="var(--boston-blue)"
              to="/pipeline/list"
              aria-current="page"
              component={RouterLink}
            >
              PipelineList
            </Link>
            <Typography sx={{ color: "var(--boston-blue)", fontWeight: "600" }}>
              PipelineRunDetails
            </Typography>
          </Breadcrumbs>
        </Box>
        <Header title={`Pipeline Instance Details of ${pipelineName}`} />
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
        sx={{ marginBottom: "20px" }}
        className="details-search-container container"
      >
        <Box className="details-table">
          <TableContainer>
            <Table>
              <TableHead></TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Pipeline Id</TableCell>
                  <TableCell>{pipelineId ?? "-"}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Pipeline Name</TableCell>
                  <TableCell>{pipelineName ?? "-"}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <SearchBox searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </Box>
      <Box className="container">
        <Box
          className="schedule-info-tags-container container"
          display="flex"
          alignItems="flex-start"
          sx={{
            marginBottom: "20px",
            width: "fit-content",
            borderRadius: "10px",
            boxShadow: "2",
            marginLeft: "0px",
          }}
        >
          <Box className="schedule-info-table">
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell colSpan={2}>Schedule Information</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Start</TableCell>
                    <TableCell>{formattedScheduledStartTime}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>End</TableCell>
                    <TableCell>{formattedScheduledEndTime}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Period</TableCell>
                    <TableCell>{scheduledPeriod ?? "-"}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          <Box className="tags-table" sx={{ marginLeft: "80px" }}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell colSpan={2}>Tags</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Environment</TableCell>
                    <TableCell>{pipelineTags?.Environment ?? "-"}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>{pipelineTags?.Name ?? "-"}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Owner</TableCell>
                    <TableCell>{pipelineTags?.Owner ?? "-"}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Box>
      <Box className="container">
        <DataGridTable
          height={350}
          loading={loading}
          columns={columns}
          rows={filteredRows}
          paginationModel={paginationModel}
          columnVisibilityModel={columnVisibilityModel}
          onColumnVisibilityModelChange={setColumnVisibilityModel}
        />
      </Box>
    </Box>
  );
};

export default PipelineDetails;
