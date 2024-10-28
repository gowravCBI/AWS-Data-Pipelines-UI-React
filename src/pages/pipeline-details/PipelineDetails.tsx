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
import {
  GridActionsCellItem,
  GridColDef,
  GridColumnVisibilityModel,
  GridRowId,
} from "@mui/x-data-grid";
import { useCallback, useEffect, useState } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import { pipelineService } from "../../services/PipelineService";
import {
  PipelineField,
  RunDetails,
  PipelineTag,
  PipelineActualDefinition,
} from "../../services/types";
import { useSnackbar } from "../../components/Snackbar";
import "./PipelineDetails.scss";
import DataGridTable from "../../components/DataGridTable";
import SearchBox from "../../components/SearchBox";
import { formattedDateTime } from "../../utility/utils";
import ListAltRoundedIcon from "@mui/icons-material/ListAltRounded";

const PipelineDetails = () => {
  const { pipelineId } = useParams<{ pipelineId: string }>();
  const [loading, setLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { showSnackbar } = useSnackbar();
  const [pipelineField, setPipelineField] = useState<PipelineField>();
  const [pipelineTags, setPipelineTag] = useState<PipelineTag>();
  const [pipelineRunDetails, setPipelineRunDetails] = useState<RunDetails[]>(
    []
  );

  // Ensure date objects are parsed correctly
  const formattedScheduledStartTime = pipelineField?.scheduledStartTime
    ? formattedDateTime(pipelineField.scheduledStartTime)
    : "-";

  const formattedScheduledEndTime = pipelineField?.scheduledEndTime
    ? formattedDateTime(pipelineField.scheduledEndTime)
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

  useEffect(() => {
    const fetchPipelinesDetailById = async () => {
      setLoading(true);
      try {
        const data = await pipelineService.getPipelineDescriptionById(
          pipelineId ?? ""
        );
        const fields = data.fields;
        const tags = data.tags;
        setPipelineField(fields);
        setPipelineTag(tags);
        setLoading(false);
        // console.log("fields ", fields);
        // console.log("tags ", tags);

        showSnackbar("Detail of Pipeline fetched successfully!", "success");
      } catch (error) {
        console.error("Failed to fetch Detail of Pipeline:", error);
        showSnackbar("Failed to fetch Detail of Pipeline", "error");
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchPipelinesDetailById();
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
      actions: true,
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
      width: 250,
      align: "center",
      headerAlign: "center",
      type: "string",
      hideable: false,
    },
    {
      field: "name",
      headerName: "Name",
      width: 250,
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
      width: 200,
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
    {
      field: "actions",
      headerName: "Logs",
      type: "actions",
      width: 60,
      hideable: false,
      getActions: (params) => [
        <GridActionsCellItem
          className="actions-cell-item"
          // sx={{ color: "var(--boston-blue)", fontWeight: 600 }}
          icon={<ListAltRoundedIcon />}
          label="Logs"
          onClick={handleLogs({
            id: params.id,
            instanceName: params.row.name,
            parent: params.row.parent,
            headAttempt: params.row.headAttempt,
          })}
          // showInMenu
        />,
      ],
    },
  ];

  const handleLogs = useCallback(
    ({
        id,
        instanceName,
        parent,
        headAttempt,
      }: {
        id: GridRowId;
        instanceName: string;
        parent: string;
        headAttempt: string;
      }) =>
      async () => {
        const logUri = await fetchPipelineLogUri();

        if (!logUri) {
          console.error("No pipelineLogUri found!");
          showSnackbar("No bucketName Found in Definition!", "error");
          return;
        }
        const bucketName = logUri.split("/")[2]; // Use logUri directly here
        const prefix = `logs/${pipelineId}/${parent}/@${id}/@${headAttempt}/`;

        await downloadLogs(bucketName, prefix, instanceName);
      },
    []
  );

  // Fetch the log URI from the pipeline actual definition
  const fetchPipelineLogUri = async (): Promise<string | null> => {
    try {
      const data = await pipelineService.getPipelineActualDefinition(
        pipelineId || ""
      );

      // Check if data contains 'objects' and cast it as an array of PipelineActualDefinition
      const objects = (data as { objects?: PipelineActualDefinition[] })
        .objects;

      if (Array.isArray(objects)) {
        // Use `find` to search the objects array for the object with id "Default"
        const defaultObject = objects.find((obj: PipelineActualDefinition) => {
          if (typeof obj === "object" && obj !== null) {
            return obj.id === "Default";
          }
          return false;
        });

        // Access the pipelineLogUri if it exists in the found object
        const logUri =
          defaultObject && typeof defaultObject === "object"
            ? (defaultObject as { [key: string]: string }).pipelineLogUri
            : null;
        return logUri;
      }
    } catch (error) {
      console.error("Error fetching pipeline actual definition:", error);
      showSnackbar("Error fetching pipeline actual definition", "error");
    }
    return null;
  };
  // Download the logs as a ZIP file
  const downloadLogs = async (
    bucketName: string,
    prefix: string,
    instanceName: string
  ) => {
    try {
      const zipBlob = await pipelineService.downloadS3LogsZip(
        bucketName,
        prefix
      );
      const url = window.URL.createObjectURL(zipBlob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${instanceName}.zip`); // Set the filename for the download
      document.body.appendChild(link);
      link.click();
      link.remove(); // Clean up after download
      showSnackbar("Logs file downloaded successfully!", "success");
    } catch (error) {
      console.error("Error downloading the logs zip:", error);
      showSnackbar("Failed to download logs", "error");
    }
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
        <Header title={`Pipeline Instance Details of ${pipelineField?.name}`} />
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
        sx={{ marginBottom: "10px" }}
        className="details-container container"
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
                  <TableCell>{pipelineField?.name ?? "-"}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        {/* <SearchBox searchQuery={searchQuery} setSearchQuery={setSearchQuery} /> */}
      </Box>
      <Box
        className="container"
        display="flex"
        alignItems="flex-end"
        sx={{ marginBottom: "20px" }}
      >
        <Box
          className="schedule-info-tags-search-container container"
          display="flex"
          alignItems="flex-start"
          sx={{
            width: "fit-content",
            borderRadius: "5px",
            boxShadow: "1",
            marginLeft: "0px",
            paddingBottom: "4px",
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
                    <TableCell>
                      {pipelineField?.scheduledPeriod ?? "-"}
                    </TableCell>
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
        <SearchBox searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </Box>
      <Box>
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
