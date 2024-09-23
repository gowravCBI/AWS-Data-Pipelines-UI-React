import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Header from "../../components/Header";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { pipelineService } from "../../services/PipelineService";
import { RunDetails, PipelineTag } from "../../services/types";
import { CircularProgress } from "@mui/material";
import "./PipelineDetails.scss";

const PipelineDetails = () => {
  const { pipelineId } = useParams<{ pipelineId: string }>();
  const [pipelineName, setPipelineName] = useState<string>("");
  const [pipelineRunDetails, setPipelineRunDetails] = useState<RunDetails[]>(
    []
  );
  const [pipelineTags, setPipelineTags] = useState<PipelineTag[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPipelinesRunDetails = async () => {
      setLoading(true);
      try {
        const data = await pipelineService.getPipelineRunDetails(
          pipelineId || ""
        );
        if (data && data.length > 0) {
          setPipelineName(data[0].name);
          setPipelineRunDetails(data[0].runDetails || []);
          setPipelineTags(data[0].tags || []);
          // console.log(pipelineTags);

          setLoading(false);
        }
      } catch (err) {
        setError("Failed to fetch pipeline pipelines");
        console.error(err);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchPipelinesRunDetails();
  }, [pipelineId]);

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
        height={300}
      >
        {error}
      </Box>
    ); // Show error message if there was an error fetching data

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 310,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "name",
      headerName: "Name",
      width: 310,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "type",
      headerName: "Type",
      width: 160,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "scheduledStartTime",
      headerName: "Scheduled Start Time",
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
    },
    {
      field: "actualStartTime",
      headerName: "Actual Start Time",
      width: 160,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "actualEndTime",
      headerName: "Actual End Time",
      width: 160,
      align: "center",
      headerAlign: "center",
    },
  ];

  const paginationModel = { page: 0, pageSize: 5 };
  return (
    <Box className="container container-xxl" mt="20px">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{ marginBottom: "20px" }}
        className="header"
      >
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
                  {pipelineRunDetails.length > 0 ? (
                    <>
                      <TableRow>
                        <TableCell>Start</TableCell>
                        <TableCell>
                          {pipelineRunDetails[0].scheduledStartTime}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>End</TableCell>
                        <TableCell>
                          {pipelineRunDetails[0].scheduledEndTime}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Period</TableCell>
                        <TableCell>
                          {pipelineRunDetails[0].scheduledEndTime}
                        </TableCell>
                      </TableRow>
                    </>
                  ) : (
                    <TableRow>
                      <TableCell colSpan={2} align="center">
                        No schedule information available.
                      </TableCell>
                    </TableRow>
                  )}
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
                  {pipelineTags.length > 0 ? (
                    <>
                      <TableRow>
                        <TableCell>Environment</TableCell>
                        <TableCell>
                          {pipelineTags.find((tag) => tag.key === "Environment")
                            ?.value || ""}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>
                          {pipelineTags.find((tag) => tag.key === "Name")
                            ?.value || ""}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Owner</TableCell>
                        <TableCell>
                          {pipelineTags.find((tag) => tag.key === "Owner")
                            ?.value || ""}
                        </TableCell>
                      </TableRow>
                    </>
                  ) : (
                    <TableRow>
                      <TableCell colSpan={2} align="center">
                        No schedule information available.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Box>

      <Box className="container">
        <DataGrid
          sx={{ boxShadow: "4", height: 300 }}
          rows={pipelineRunDetails}
          columns={columns}
          rowHeight={40}
          columnHeaderHeight={45}
          disableRowSelectionOnClick
          pagination
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10, 15]}
        />
      </Box>
    </Box>
  );
};

export default PipelineDetails;
