import React, { Fragment, useEffect, useState } from "react";
import {
  Box,
  Dialog,
  DialogContent,
  IconButton,
  Tooltip,
  CircularProgress,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import GetAppRounded from "@mui/icons-material/GetAppRounded";
import { pipelineService } from "../../services/PipelineService";
import "./PipelineActualDefinition.scss";

// Define the props to accept data via the dialog
interface PipelineActualDefinitionProps {
  pipelineId: string;
  onClose: () => void;
}

// Main component
export const PipelineActualDefinition: React.FC<
  PipelineActualDefinitionProps
> = ({ pipelineId, onClose }) => {
  const [pipelineActualDefinition, setPipelineActualDefinition] =
    useState<Record<string, any> | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // Fetch actual pipeline definition data
    const fetchPipelineActualDefinition = async () => {
      setLoading(true);
      try {
        const data = await pipelineService.getPipelineActualDefinition(
          pipelineId
        );
        setPipelineActualDefinition(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching pipeline actual definition:", error);
        setLoading(false);
      }
    };

    fetchPipelineActualDefinition();
  }, [pipelineId]);

  // Download JSON file function
  const downloadJsonFile = () => {
    const jsonContent = JSON.stringify(pipelineActualDefinition);
    const blob = new Blob([jsonContent], { type: "application/json" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Pipeline_actual_definition_${pipelineId}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <Fragment>
      <Dialog open={true} onClose={onClose} maxWidth="md" fullWidth>
        <Box className="view-header">
          <DialogTitle variant="h3" sx={{ fontWeight: "bold" }}>
            Actual Definition
          </DialogTitle>
          <DialogActions>
            <Box
              className="icons"
              display="flex"
              justifyContent="space-around"
              gap={1}
            >
              <Tooltip title="Download">
                <IconButton onClick={downloadJsonFile}>
                  <GetAppRounded sx={{ color: "var(--white)" }} />
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

        <DialogContent dividers sx={{ padding: 0 }}>
          <Box className="view-content">
            {loading ? (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height={300}
              >
                <CircularProgress />
              </Box>
            ) : (
              <Box
                component="pre"
                sx={{
                  whiteSpace: "pre-wrap", // Ensure text wraps correctly
                  wordWrap: "break-word", // Prevent long words from overflowing
                  overflowY: "auto", // Make it scrollable vertically if content exceeds
                }}
              >
                {JSON.stringify(pipelineActualDefinition, null, 2)}
              </Box>
            )}
          </Box>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};
