import React, { Fragment, useEffect, useState } from "react";
import {
  Box,
  Dialog,
  DialogContent,
  IconButton,
  Tooltip,
  DialogTitle,
  DialogActions,
  Button,
  FormControl,
  Stack,
  TextField,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { pipelineService } from "../../services/PipelineService";
import { useSnackbar } from "../../components/Snackbar";
import "./PipelineCreation.scss";
import { CreatePipelineDto } from "../../services/types";
import { formatDate } from "../../utility/utils";

// Define the props to accept data via the dialog
interface PipelineCreationProps {
  onClose: () => void;
}

// Main component
export const PipelineCreation: React.FC<PipelineCreationProps> = ({
  onClose,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { showSnackbar } = useSnackbar();

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    tags: [{ key: "", value: "", error: false }], // Include tags in the form data
  });

  const [formHasError, setFormHasError] = useState<boolean>(false);

  useEffect(() => {
    const hasError = formData.tags.some((tag) => tag.error);
    setFormHasError(hasError);
  }, [formData.tags]);

  // Handle input change for main form fields
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle tags change
  const handleTagChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    const updatedTags = [...formData.tags]; // Update tags from formData
    updatedTags[index] = {
      ...updatedTags[index],
      [name]: value,
    };

    // Set specific error for the key or value
    if (name === "key") {
      updatedTags[index].error = !(
        (
          (value && updatedTags[index].value) || // Key is filled and Value is filled
          (!value && !updatedTags[index].value)
        ) // Both Key and Value are empty
      );
    } else if (name === "value") {
      updatedTags[index].error = !(
        (
          (updatedTags[index].key && value) || // Value is filled and Key is filled
          (!updatedTags[index].key && !value)
        ) // Both Key and Value are empty
      );
    }

    setFormData({
      ...formData,
      tags: updatedTags, // Update tags in formData
    });
  };

  // Add a new tag row
  const addTag = () => {
    setFormData({
      ...formData,
      tags: [...formData.tags, { key: "", value: "", error: false }], // Add new tag to formData
    });
  };

  // Remove a tag row
  const removeTag = (index: number) => {
    const updatedTags = formData.tags.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      tags: updatedTags, // Update tags in formData
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log({ formData }); // Process the form data as needed
    setLoading(true);

    // Create the pipeline DTO using the CreatePipelineDto type
    const createPipelineDto: CreatePipelineDto = {
      name: formData.name,
      uniqueId: `${formData.name}-${formatDate()}`, // Example unique ID generation
      description: formData.description,
      tags: formData.tags
        .filter((tag) => tag.key && tag.value) // Only include valid tags
        .map((tag) => ({ key: tag.key, value: tag.value })),
    };

    // showSnackbar("Pipeline Created successfully!", "success");
    try {
      await pipelineService.createPipeline(createPipelineDto);
      showSnackbar("Pipeline created successfully!", "success");
      onClose(); // Close dialog on success
    } catch (error) {
      showSnackbar("Failed to create pipeline. Please try again.", "error");
      console.error("Error creating pipeline:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <Dialog open={true} onClose={onClose} maxWidth="md" fullWidth>
        <Box className="header-view">
          <DialogTitle variant="h3" sx={{ fontWeight: "bold" }}>
            Create Pipeline
          </DialogTitle>
          <DialogActions>
            <Tooltip title="Close">
              <IconButton onClick={onClose}>
                <CloseRoundedIcon sx={{ color: "var(--white)" }} />
              </IconButton>
            </Tooltip>
          </DialogActions>
        </Box>

        <DialogContent dividers sx={{ padding: 0 }}>
          <Box className="content-view">
            <form onSubmit={handleSubmit}>
              <Stack spacing={2} sx={{ marginBottom: "20px" }}>
                <FormControl fullWidth margin="normal">
                  <TextField
                    id="name"
                    name="name"
                    label="Pipeline Name"
                    variant="outlined"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    fullWidth
                    size="small"
                  />
                </FormControl>

                <FormControl fullWidth margin="normal">
                  <TextField
                    id="description"
                    name="description"
                    label="Description"
                    variant="outlined"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    fullWidth
                    size="small"
                  />
                </FormControl>

                {/* Dynamically render tag rows */}
                {formData.tags.map((tag, index) => (
                  <Stack
                    direction="row"
                    spacing={2}
                    className="tags"
                    key={index}
                  >
                    {/* Tag Key Field */}
                    <FormControl fullWidth margin="normal">
                      <TextField
                        id={`key-${index}`}
                        name="key"
                        label={`Tag ${index + 1}`}
                        variant="outlined"
                        value={tag.key}
                        onChange={(e) =>
                          handleTagChange(
                            index,
                            e as React.ChangeEvent<HTMLInputElement>
                          )
                        }
                        error={tag.error} // Show error state
                        helperText={
                          tag.error ? "Key is required if Value is filled!" : ""
                        }
                        fullWidth
                        size="small"
                      />
                    </FormControl>

                    {/* Tag Value Field */}
                    <FormControl fullWidth margin="normal">
                      <TextField
                        id={`value-${index}`}
                        name="value"
                        label={`Value ${index + 1}`}
                        variant="outlined"
                        value={tag.value}
                        onChange={(e) =>
                          handleTagChange(
                            index,
                            e as React.ChangeEvent<HTMLInputElement>
                          )
                        }
                        error={tag.error} // Show error state
                        helperText={
                          tag.error ? "Value is required if Key is filled!" : ""
                        }
                        fullWidth
                        size="small"
                      />
                    </FormControl>

                    {/* IconButton to remove the current tag row */}
                    <Box className="remove" alignContent="center">
                      <Tooltip title="Remove">
                        <IconButton onClick={() => removeTag(index)}>
                          <RemoveCircleOutlineIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Stack>
                ))}
              </Stack>

              <Stack direction="row" spacing={2} justifyContent="space-evenly">
                {/* Button to toggle additional fields */}
                <Button variant="outlined" onClick={addTag}>
                  Add Tags
                </Button>

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={loading || formHasError}
                >
                  {loading ? "Submitting..." : "Submit"}
                </Button>
              </Stack>
            </form>
          </Box>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};
