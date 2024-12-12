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
