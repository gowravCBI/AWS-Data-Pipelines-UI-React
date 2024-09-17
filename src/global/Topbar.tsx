import { AppBar, Toolbar, Typography } from "@mui/material";
import "./Topbar.scss";

const Topbar = () => {
  return (
    <AppBar position="sticky" className="topbar-layout">
      <Toolbar>
        <Typography
          //   variant="h6"
          sx={{ marginLeft: "10px", fontSize: "1.4rem", fontWeight: 600 }}
        >
          CBI AWS Data Pipelines
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;

// AppBar: Replaces mat-toolbar and provides a Material-UI styled top bar.
// Toolbar: A wrapper for aligning items within the AppBar.
// Typography: Used to display the title with consistent Material-UI styling.
// styled: Used for styling the AppBar to replicate the .topbar-layout styles from your Angular project.
