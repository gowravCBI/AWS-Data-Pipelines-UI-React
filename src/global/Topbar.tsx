import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import "./Topbar.scss";
import { useNavigate } from "react-router-dom";

const Topbar = () => {
  const navigate = useNavigate(); // Hook to navigate between routes

  const handleNavigate = () => {
    navigate("/account-switch"); // Navigate to the account switch page
  };

  return (
    <AppBar position="sticky" className="topbar-layout">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography
          variant="h3"
          sx={{ marginLeft: "10px", fontSize: "1.4rem", fontWeight: 600 }}
        >
          CBI AWS Data Pipelines
        </Typography>

        {/* Navigate Button */}
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleNavigate}
          size="small"
        >
          Switch Account
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
