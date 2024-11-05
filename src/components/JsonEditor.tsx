import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import MonacoEditor from "@monaco-editor/react";
import { useSnackbar } from "./Snackbar";

interface JsonEditorProps {
  onSubmit: (jsonData: string) => void; // New prop for handling submission
}

const JsonEditor: React.FC<JsonEditorProps> = ({ onSubmit }) => {
  const { showSnackbar } = useSnackbar();

  const [jsonData, setJsonData] = useState(
    JSON.stringify(
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
    )
  );

  // Function to handle editor changes
  const handleEditorChange = (value: string | undefined) => {
    if (value) setJsonData(value);
  };

  // Function to validate JSON data
  const validateJsonData = (data: any): string | null => {
    // Check if jsonData has only 'objects', 'parameters', and 'values' as keys
    const allowedKeys = ["objects", "parameters", "values"];
    const parsedKeys = Object.keys(data);
    const hasOnlyAllowedKeys = parsedKeys.every((key) =>
      allowedKeys.includes(key)
    );

    if (!hasOnlyAllowedKeys || parsedKeys.length > allowedKeys.length) {
      return "JSON must only contain 'objects', 'parameters', and 'values' as keys!";
    }

    // Check if 'objects' exists and is a non-empty array
    if (!Array.isArray(data.objects) || data.objects.length === 0) {
      return "'objects' must be a non-empty Array!";
    }

    // Check each object in 'objects' for required keys
    const objectsValid = data.objects.every(
      (obj: Record<string, any>) =>
        obj.hasOwnProperty("id") && obj.hasOwnProperty("name")
    );

    if (!objectsValid) {
      return "Each item in 'objects' must have 'id' and 'name' keys!";
    }

    // Check if 'parameters' exists and validate each item (if present)
    if (data.parameters) {
      if (!Array.isArray(data.parameters)) {
        return "'parameters' must be an Array!";
      }

      const parametersValid = data.parameters.every(
        (param: Record<string, any>) => param.hasOwnProperty("id")
      );

      if (!parametersValid) {
        return "Each item in 'parameters' must have an 'id' key!";
      }
    }

    // Check if 'values' is an object if present (allowing empty objects)
    if (
      data.values &&
      (typeof data.values !== "object" || Array.isArray(data.values))
    ) {
      return "'values' must be an object if present!";
    }

    return null; // No validation errors
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

      const validationError = validateJsonData(parsedData);
      if (validationError) {
        showSnackbar(validationError, "error");
        return;
      }

      // console.log("Saved JSON:", parsedData);
      onSubmit(JSON.stringify(parsedData, null, 2)); // Use the passed onSubmit function
    } catch (error) {
      console.log("json error -", error);
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
          backgroundColor: "black",
        }}
      >
        <MonacoEditor
          height="400px"
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
        <Button variant="contained" color="primary" onClick={handleSave}>
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default JsonEditor;
