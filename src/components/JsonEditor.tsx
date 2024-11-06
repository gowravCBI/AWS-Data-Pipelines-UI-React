import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import MonacoEditor from "@monaco-editor/react";
import { useSnackbar } from "./Snackbar";
import { pipelineService } from "../services/PipelineService";

interface JsonEditorProps {
  onSubmit: (jsonData: string) => void; // New prop for handling submission
  pipelineId: string; // New prop for fetching specific pipeline definition
}

const JsonEditor: React.FC<JsonEditorProps> = ({ onSubmit, pipelineId }) => {
  const { showSnackbar } = useSnackbar();

  const defaultJsonData = JSON.stringify(
    {
      objects: [
        {
          id: "value",
          name: "value",
        },
      ],
      parameters: [
        {
          id: "value",
        },
      ],
      values: {},
    },
    null,
    2
  );

  const [jsonData, setJsonData] = useState(defaultJsonData);

  useEffect(() => {
    // Function to replace keys in the fetched data object
    const replaceKeyNames = (data: Record<string, any>) => {
      const updatedData = { ...data };
      if ("parameterObj" in updatedData) {
        updatedData.parameters = updatedData.parameterObj;
        delete updatedData.parameterObj;
      }
      if ("parameterValues" in updatedData) {
        updatedData.values = updatedData.parameterValues;
        delete updatedData.parameterValues;
      }
      return updatedData;
    };

    // Fetch pipeline definition when component mounts
    const fetchPipelineDefinition = async () => {
      try {
        const fetchedData = await pipelineService.getPipelineActualDefinition(
          pipelineId
        );
        // Return the data without metadata
        const { $metadata, ...pipelineActualDefinition } = fetchedData;

        // Rename keys and set the JSON data
        const modifiedData = replaceKeyNames(pipelineActualDefinition);
        setJsonData(JSON.stringify(modifiedData, null, 2));
      } catch (error) {
        console.error("Error fetching pipeline definition:", error);
        showSnackbar(
          "Using default data, as no pipeline data was found.",
          "info"
        );
        setJsonData(defaultJsonData); // Set to default if fetching fails
      }
    };

    fetchPipelineDefinition();
  }, [pipelineId]);

  // Function to handle editor changes
  const handleEditorChange = (value: string | undefined) => {
    if (value) setJsonData(value);
  };

  // Helper function to check for empty string keys or values in the JSON structure
  const hasEmptyStringValue = (data: any): boolean => {
    if (typeof data === "object" && data !== null) {
      for (const [key, value] of Object.entries(data)) {
        // Check if either the key or value is an empty string
        if (key === "" || (typeof value === "string" && value === "")) {
          return true;
        }
        // Recursive check for nested objects or arrays
        if (typeof value === "object" && hasEmptyStringValue(value)) {
          return true;
        }
      }
    } else if (Array.isArray(data)) {
      return data.some((item) => hasEmptyStringValue(item));
    }
    return false;
  };

  // Function to validate JSON data
  const validateJsonData = (data: any): boolean => {
    try {
      // Check if jsonData has only 'objects', 'parameters', and 'values' as keys
      const allowedKeys = ["objects", "parameters", "values"];
      const parsedKeys = Object.keys(data);
      const hasOnlyAllowedKeys = parsedKeys.every((key) =>
        allowedKeys.includes(key)
      );

      if (!hasOnlyAllowedKeys || parsedKeys.length > allowedKeys.length) {
        showSnackbar(
          "JSON must only contain 'objects', 'parameters', and 'values' as keys!",
          "error"
        );
        return false;
      }

      // Check if 'objects' exists and is a non-empty array
      if (!Array.isArray(data.objects) || data.objects.length === 0) {
        showSnackbar("'objects' must be a non-empty Array!", "error");
        return false;
      }

      // Check each object in 'objects' for required keys
      const objectsValid = data.objects.every(
        (obj: Record<string, any>) =>
          obj.hasOwnProperty("id") && obj.hasOwnProperty("name")
      );

      if (!objectsValid) {
        showSnackbar(
          "Each item in 'objects' must have 'id' and 'name' keys!",
          "error"
        );
        return false;
      }

      // Check if 'parameters' exists and validate each item (if present)
      if (data.parameters) {
        if (!Array.isArray(data.parameters)) {
          showSnackbar("'parameters' must be an Array!", "error");
          return false;
        }

        const parametersValid = data.parameters.every(
          (param: Record<string, any>) => param.hasOwnProperty("id")
        );

        if (!parametersValid) {
          showSnackbar(
            "Each item in 'parameters' must have an 'id' key!",
            "error"
          );
          return false;
        }
      }

      // Check if 'values' is an object if present (allowing empty objects)
      if (
        data.values &&
        (typeof data.values !== "object" || Array.isArray(data.values))
      ) {
        showSnackbar("'values' must be an object if present!", "error");
        return false;
      }

      // Check for empty string values
      if (hasEmptyStringValue(data)) {
        showSnackbar(
          "JSON keys and values must not be empty strings!",
          "error"
        );
        return false;
      }

      return true; // No validation errors
    } catch (error) {
      console.log("json error -", error);
      showSnackbar("Invalid JSON format!", "error");
      return false; // Return false if JSON parsing fails
    }
  };

  // Function to handle saving the JSON data with validation
  const handleSave = () => {
    try {
      // Parse JSON to validate format and structure
      const parsedData = JSON.parse(jsonData);

      // Ensure 'parameters' and 'values' keys are present
      if (!parsedData.parameters) {
        parsedData.parameters = []; // Add empty array if not present
      }
      if (!parsedData.values) {
        parsedData.values = {}; // Add empty object if not present
      }

      if (validateJsonData(parsedData)) {
        showSnackbar("Pipeline Definition saved successfully!", "success");
        onSubmit(JSON.stringify(parsedData, null, 2)); // Use the passed onSubmit function
      }
    } catch (error) {
      showSnackbar("Invalid JSON format!", "error");
    }
  };

  return (
    <Box sx={{ mx: "auto" }}>
      <Box
        sx={{
          border: "1px solid #ddd",
          padding: "10px",
          borderRadius: 1,
          overflow: "hidden",
          mb: 2,
          backgroundColor: "#1E1E1E",
          height: "70vh", // Set height directly here
          width: "100%", // Set width directly here
          "@media (max-width: 600px)": {
            height: "50vh", // Adjust height for small screens
          },
        }}
      >
        <MonacoEditor
          // height="70vh"
          defaultLanguage="json"
          theme="vs-dark"
          value={jsonData}
          onChange={handleEditorChange}
          options={{
            automaticLayout: true,
            formatOnPaste: true,
            formatOnType: true,
          }}
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          size="small"
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default JsonEditor;
