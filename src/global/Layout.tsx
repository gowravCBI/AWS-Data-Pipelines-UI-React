import { useState, useEffect, ReactNode, useRef } from "react";
import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import "./Layout.scss";

interface LayoutProps {
  children: ReactNode; // Specify the type for children prop
}

const Layout = ({ children }: LayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement | null>(null); // Using ref instead of document.getElementById
  const mainRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Dynamically adjust the width and margin based on sidebar state
    if (sidebarRef.current && mainRef.current) {
      sidebarRef.current.style.width = isSidebarOpen ? "300px" : "72px";
      mainRef.current.style.marginLeft = isSidebarOpen ? "300px" : "72px";
    }
  }, [isSidebarOpen]);

  return (
    <Box className="container-layout">
      <Box className="topbar-layout">
        <Topbar />
      </Box>
      <Box className="content-layout">
        <Box
          ref={sidebarRef}
          id="my-sidebar-layout"
          className="side-bar"
          onMouseEnter={() => setIsSidebarOpen(true)}
          onMouseLeave={() => setIsSidebarOpen(false)}
        >
          <Sidebar />
        </Box>
        <Box ref={mainRef} id="main" className="main-content">
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
