import React, { useState } from "react";
import {
  Box,
  Dialog,
  DialogContent,
  IconButton,
  Tooltip,
  CircularProgress,
  DialogTitle,
  Typography,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import { pipelineService } from "../../services/PipelineService";
import "./PipelinePutDefinition.scss";
import { useSnackbar } from "../../components/Snackbar";
import JsonEditor from "../../components/JsonEditor";

// Define the props to accept data via the dialog
interface PipelinePutDefinitionProps {
  pipelineId: string;
  pipelineName: string | null;
  onClose: () => void;
}

// Main component
export const PipelinePutDefinition: React.FC<PipelinePutDefinitionProps> = ({
  pipelineId,
  pipelineName,
  onClose,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { showSnackbar } = useSnackbar();

  const handleSubmit = async (jsonData: string) => {
    setLoading(true);
    try {
      const parsedData = JSON.parse(jsonData); // Parse JSON data
      await pipelineService.putPipelineDefinition(pipelineId, parsedData); // Call the service method
      showSnackbar("Pipeline definition updated successfully!", "success");
      onClose(); // Close the dialog after successful update
    } catch (error) {
      console.error("Error updating pipeline definition:", error);
      showSnackbar("Failed to update pipeline definition!", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={true}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      className="view-put-dialog"
    >
      <Box className="view-put-header">
        <DialogTitle
          variant="h3"
          sx={{ fontWeight: "bold", fontSize: { xs: "1.5rem", sm: "1.75rem" } }}
        >
          Put Definition - {pipelineName}
        </DialogTitle>
        <Box display="flex" justifyContent="space-around" gap={1}>
          <Tooltip
            title={
              <React.Fragment>
                {/* Tooltip Header */}
                <Typography
                  variant="h6"
                  sx={{ fontSize: "0.8rem", fontWeight: "bold" }}
                >
                  Definition JSON Rules:
                </Typography>

                {/* Tooltip Body */}
                <Typography
                  variant="body1"
                  sx={{ fontSize: "0.8rem", lineHeight: 1.5 }}
                >
                  The JSON must only include the following keys:
                  <br />
                  <strong>1. 'objects' key must contain:</strong>
                  <br />
                  - A non-empty array.
                  <br />- Each item in the array must have both
                  <strong>'id'</strong> and <strong>'name'</strong> keys.
                  <br />
                  <strong>2. 'parameters' key (optional):</strong>
                  <br />
                  - If present, it must be an array.
                  <br />- Each item in the array must have an
                  <strong>'id'</strong> key.
                  <br />
                  <strong>3. 'values' key (optional):</strong>
                  <br />- If present, it must be an object (not an array).
                </Typography>
              </React.Fragment>
            }
            arrow
          >
            <IconButton>
              <InfoRoundedIcon sx={{ color: "var(--white)" }} />
            </IconButton>
          </Tooltip>

          <Tooltip title="Close">
            <IconButton onClick={onClose}>
              <CloseRoundedIcon sx={{ color: "var(--white)" }} />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <DialogContent dividers className="view-put-dialog">
        <Box>
          {loading ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height={300}
            >
              <CircularProgress sx={{ color: "white" }} />
            </Box>
          ) : (
            <Box>
              <JsonEditor onSubmit={handleSubmit} pipelineId={pipelineId} />
            </Box>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};
