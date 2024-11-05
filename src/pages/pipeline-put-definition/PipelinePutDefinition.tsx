import React, { useState } from "react";
import {
  Box,
  Dialog,
  DialogContent,
  IconButton,
  Tooltip,
  CircularProgress,
  DialogTitle,
  DialogActions,
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
  onClose: () => void;
}

// Main component
export const PipelinePutDefinition: React.FC<PipelinePutDefinitionProps> = ({
  pipelineId,
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
    <Dialog open={true} onClose={onClose} maxWidth="md" fullWidth>
      <Box className="view-put-header">
        <DialogTitle variant="h3" sx={{ fontWeight: "bold" }}>
          Put Definition
        </DialogTitle>
        <DialogActions>
          <Box display="flex" justifyContent="space-around" gap={1}>
            <Tooltip
              title={
                <React.Fragment>
                  <Typography
                    variant="h6"
                    sx={{ fontSize: "0.8rem", fontWeight: "bold" }}
                  >
                    Definition Json Rules:
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ fontSize: "0.7rem", lineHeight: 1.3 }}
                  >
                    1. The JSON must only include the following keys:
                    <br />- <strong>'objects'</strong>
                    <br />- <strong>'parameters'</strong>
                    <br />- <strong>'values'</strong>
                    <br />
                    No other keys are allowed, and the names must match exactly.
                    <br />
                    2. The <strong>'objects'</strong> key must contain:
                    <br />
                    - A non-empty array.
                    <br />- Each item in the array must have both{" "}
                    <strong>'id'</strong> and <strong>'name'</strong> keys.
                    <br />
                    3. The <strong>'parameters'</strong> key is optional:
                    <br />
                    - It can be empty.
                    <br />
                    - If present, it must be an array.
                    <br />- Each item in the array must have an{" "}
                    <strong>'id'</strong> key.
                    <br />
                    4. The <strong>'values'</strong> key is also optional:
                    <br />
                    - It can be empty.
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
        </DialogActions>
      </Box>

      <DialogContent dividers className="view-put-dialog">
        <Box className="view-put-content">
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
              <JsonEditor onSubmit={handleSubmit} />
            </Box>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};
