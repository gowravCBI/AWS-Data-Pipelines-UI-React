import React, { createContext, useContext, useState, ReactNode, useCallback, useRef } from "react";
import { Snackbar, Alert, AlertColor } from "@mui/material";

interface SnackbarMessage {
  id: number; // Add an ID for each snackbar message
  message: string;
  severity: AlertColor;
  duration: number;
  onClose?: () => void;
}

interface SnackbarContextType {
  showSnackbar: (
    message: string,
    severity?: AlertColor,
    duration?: number,
    onClose?: () => void
  ) => void;
}

const SnackbarContext = createContext<SnackbarContextType>({
  showSnackbar: () => {},
});

let snackbarIdCounter = 0; // Counter for unique snackbar IDs

export const SnackbarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [snackbars, setSnackbars] = useState<SnackbarMessage[]>([]);
  const shownSnackbarsRef = useRef<Set<string>>(new Set()); // To keep track of shown snackbars

  const showSnackbar = useCallback(
    (
      message: string,
      severity: AlertColor = "success",
      duration: number = 3000, // Duration for auto hiding
      onClose?: () => void
    ) => {
      // Create a unique identifier for the snackbar
      const uniqueKey = `${message}-${severity}`;

      // Check if snackbar with the same message and severity has already been shown
      if (!shownSnackbarsRef.current.has(uniqueKey)) {
        shownSnackbarsRef.current.add(uniqueKey);
        setSnackbars((prev) => [
          ...prev,
          { id: snackbarIdCounter++, message, severity, duration, onClose },
        ]);

        // Automatically remove it from the ref after the duration
        setTimeout(() => {
          shownSnackbarsRef.current.delete(uniqueKey);
        }, duration);
      }
    },
    [] // No dependencies needed, as we are managing state and refs internally
  );

  const handleClose = (id: number) => {
    const snackbar = snackbars.find(snack => snack.id === id);
    if (snackbar?.onClose) {
      snackbar.onClose();
    }
    setSnackbars((prev) => prev.filter((snack) => snack.id !== id));
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      {snackbars.map((snackbar) => (
        <Snackbar
          key={snackbar.id} // Use unique ID as key
          open={true}
          autoHideDuration={snackbar.duration} // Duration for auto hiding
          onClose={() => handleClose(snackbar.id)}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          sx={{ marginBottom: `${snackbars.indexOf(snackbar) * 60}px` }} // Spacing for stacked snackbars
        >
          <Alert
            onClose={() => handleClose(snackbar.id)}
            severity={snackbar.severity}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      )).reverse()} // Reverse to show the latest at the bottom
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => useContext(SnackbarContext);
