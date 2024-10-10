import { Box, IconButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import AccountTreeIcon from "@mui/icons-material/AccountTree"; // Import the specific icon from MUI
import "./Sidebar.scss";

const Sidebar = () => {
  return (
    <Box className="main-menu" height={"100%"} width={"100%"} display={"flex"}>
      <Box
        className="menu-icon-container"
        padding={"10px"}
        sx={{
          backgroundColor: "lightgray",
        }}
      >
        <Box className="menu-icon-items" title="Data-pipeline">
          <IconButton
            className="menu-link"
            component={Link}
            to="/"
            title="Data-pipeline"
          >
            <AccountTreeIcon fontSize="large" />
          </IconButton>
        </Box>
      </Box>

      <Box className="menu-container" width={"100%"}>
        <Typography variant="h5">Data Pipelines</Typography>
        <Box className="menu" sx={{ display: "flex", flexDirection: "column" }}>
          <Box className="menu-items">
            <Link className="menu-link" to="/pipeline/list">
              <span>Pipeline List</span>
            </Link>
          </Box>
          <Box className="menu-items">
            <Link className="menu-link" to="#">
              <span>Trigger Runs</span>
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
