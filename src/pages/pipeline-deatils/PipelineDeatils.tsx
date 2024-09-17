import { Box, IconButton, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import BasicDetailPanels from "../../components/BasicDetailPanels";
import Header from "../../components/Header";

const PipelineDeatils = () => {
  return (
    <Box className="container container-xxl" mt="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Pipeline List" subtitle="Welcome to your dashboard" />
        <Box className="search-container">
          <IconButton className="icon">
            <SearchIcon />
          </IconButton>
          <TextField
            className="search-box"
            variant="outlined"
            size="small"
            placeholder="Search"
            sx={{
              backgroundColor: "whitesmoke",
              border: "none",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  border: "none",
                },
              },
            }}
            fullWidth
          />
        </Box>
      </Box>

      <Box className="container">
        <Box className="table-container container">
          <BasicDetailPanels />
        </Box>
      </Box>
    </Box>
  );
};

export default PipelineDeatils;
