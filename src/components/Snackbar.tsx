// src/components/CustomSnackbar.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";
import { Snackbar, Alert, AlertColor } from "@mui/material";

// Define Snackbar context types
interface SnackbarContextType {
  showSnackbar: (
    message: string,
    severity?: AlertColor, // "success" | "error" | "info" | "warning"
    duration?: number,      // Custom duration for the Snackbar
    onClose?: () => void    // Callback function when the Snackbar closes
  ) => void;
}

// No-op function for the context initialization
const SnackbarContext = createContext<SnackbarContextType>({
  showSnackbar: () => {},
});

// Custom Snackbar Provider Component
export const SnackbarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>("success");
  const [snackbarDuration, setSnackbarDuration] = useState<number>(6000);
  const [onSnackbarClose, setOnSnackbarClose] = useState<(() => void) | null>(null);

  const showSnackbar = (
    message: string,
    severity: AlertColor = "success",  // Default severity is "success"
    duration: number = 6000,           // Default duration is 6000ms (6 seconds)
    onClose?: () => void               // Optional close callback
  ) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarDuration(duration);
    setOnSnackbarClose(() => onClose || null);
    setSnackbarOpen(true);
  };

  const handleClose = () => {
    setSnackbarOpen(false);
    if (onSnackbarClose) {
      onSnackbarClose(); // Trigger the optional callback if provided
    }
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={snackbarDuration}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }} // Positioning the Snackbar
      >
        <Alert onClose={handleClose} severity={snackbarSeverity}  variant="filled" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

// Custom hook to use Snackbar in other components
export const useSnackbar = () => useContext(SnackbarContext);
