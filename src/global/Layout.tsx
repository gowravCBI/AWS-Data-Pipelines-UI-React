import { useState } from "react";
import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import "./Layout.scss";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <Box className="container-layout">
      <Box className="topbar-layout">
        <Topbar />
      </Box>
      <Box className="content-layout">
        {/* Sidebar */}
        <Box
          className={`side-bar ${isSidebarOpen ? "expanded" : ""}`}
          onMouseEnter={() => setIsSidebarOpen(true)}
          onMouseLeave={() => setIsSidebarOpen(false)}
        >
          <Sidebar />
        </Box>

        {/* Main content */}
        <Box className={`main-content ${isSidebarOpen ? "expanded" : ""}`}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
