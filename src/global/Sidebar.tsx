import { Icon, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import "./Sidebar.scss";

const Sidebar = () => {
  return (
    <div className="main-menu">
      <div className="menu-icon-container">
        <div className="menu-icon-items" title="Data-pipeline">
          <Link className="menu-link" to="/">
            <Icon className="icon">account_tree</Icon>
          </Link>
        </div>
      </div>

      <div className="menu-container">
        <Typography variant="h5">Data Pipelines</Typography>
        <div className="menu">
          <div className="menu-items">
            <Link className="menu-link" to="/pipeline/list">
              <span>Pipeline List</span>
            </Link>
          </div>
          <div className="menu-items">
            <Link className="menu-link" to="#">
              <span>Trigger Runs</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
