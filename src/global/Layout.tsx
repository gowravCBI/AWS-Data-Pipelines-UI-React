import { useState, useEffect, ReactNode } from "react";
import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import "./Layout.scss";

interface LayoutProps {
  children: ReactNode; // Specify the type for children prop
}
const Layout = ({ children }: LayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); //false`

  useEffect(() => {
    // Initialize sidebar width and main content margin
    const mySidebarElement = document.getElementById("my-sidebar-layout");
    const mainElement = document.getElementById("main");
    if (mySidebarElement && mainElement) {
      mySidebarElement.style.width = isSidebarOpen ? "300px" : "72px";
      mainElement.style.marginLeft = isSidebarOpen ? "300px" : "72px";
    }
  }, [isSidebarOpen]);

  return (
    <Box className="container-layout">
      <Box className="topbar-layout">
        <Topbar />
      </Box>
      <Box className="content-layout">
        <Box
          id="my-sidebar-layout"
          className="side-bar"
          onMouseEnter={() => setIsSidebarOpen(true)}
          onMouseLeave={() => setIsSidebarOpen(false)} //true
        >
          <Sidebar />
        </Box>
        <Box id="main" className="main-content">
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
