import {
  Box,
  Breadcrumbs,
  IconButton,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import Header from "../../components/Header";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { pipelineService } from "../../services/PipelineService";
import { RunDetails, PipelineTag } from "../../services/types";
import "./PipelineDetails.scss";

const PipelineDetails = () => {
  const { pipelineId } = useParams<{ pipelineId: string }>();
  const location = useLocation(); // Access the location
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

  const [pipelineRunDetails, setPipelineRunDetails] = useState<RunDetails[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>(""); // State for search query

  useEffect(() => {
    const fetchPipelinesRunDetails = async () => {
      setLoading(true);
      try {
        const data = await pipelineService.getPipelineRunDetails(
          pipelineId || ""
        );
        // console.log("--------", data);
        setPipelineRunDetails(data);
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
    actualStartTime: pipeline.actualStartTime,
    actualEndTime: pipeline.actualEndTime,
    scheduledStartTime: pipeline.scheduledStartTime,
    scheduledEndTime: pipeline.scheduledEndTime,
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

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 310,
      align: "center",
      headerAlign: "center",
      type: "string",
      hideable: false,
    },
    {
      field: "name",
      headerName: "Name",
      width: 310,
      align: "center",
      headerAlign: "center",
      type: "string",
      hideable: false,
    },
    {
      field: "type",
      headerName: "Type",
      width: 160,
      align: "center",
      headerAlign: "center",
      type: "string",
    },
    {
      field: "scheduledStartTime",
      headerName: "Scheduled Start Time",
      type: "dateTime",
      width: 160,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "status",
      headerName: "Status",
      width: 140,
      align: "center",
      headerAlign: "center",
      type: "string",
    },
    {
      field: "actualStartTime",
      headerName: "Actual Start Time",
      width: 160,
      align: "center",
      headerAlign: "center",
      type: "dateTime",
    },
    {
      field: "actualEndTime",
      headerName: "Actual End Time",
      width: 160,
      align: "center",
      headerAlign: "center",
      type: "dateTime",
    },
  ];
  function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
  }
  const paginationModel = { page: 0, pageSize: 5 };
  return (
    <Box className="container container-xxl" mt="20px">
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
        <Box>
          <TableContainer className="details-table">
            <Table>
              <TableHead></TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Pipeline Id</TableCell>
                  <TableCell>{pipelineId}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Pipeline Name</TableCell>
                  <TableCell>{pipelineName}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
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
      <Box className="container">
        <Box
          display="flex"
          // justifyContent="space-around"
          alignItems="flex-start"
          sx={{
            marginBottom: "20px",
            width: "fit-content",
            borderRadius: "10px",
            boxShadow: "2",
            marginLeft: "0px",
          }}
          className="schedule-info-tags-container container"
        >
          <Box>
            <TableContainer className="schedule-info-table">
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
                    <TableCell>{scheduledPeriod || "-"}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          <Box sx={{ marginLeft: "80px" }}>
            <TableContainer className="tags-table">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell colSpan={2}>Tags</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Environment</TableCell>
                    <TableCell>{pipelineTags?.Environment || "-"}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>{pipelineTags?.Name || "-"}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Owner</TableCell>
                    <TableCell>{pipelineTags?.Owner || "-"}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Box>

      <Box className="container">
        <DataGrid
          sx={{ boxShadow: "4", height: 350 }}
          loading={loading}
          rows={filteredRows}
          columns={columns}
          rowHeight={40}
          columnHeaderHeight={45}
          disableRowSelectionOnClick
          pagination
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10, 15]}
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            loadingOverlay: {
              variant: "skeleton",
              noRowsVariant: "skeleton",
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default PipelineDetails;
