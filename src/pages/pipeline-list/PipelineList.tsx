import { Box, IconButton, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Header from "../../components/Header";
import "./PipelineList.scss";
import BasicDetailPanels from "./BasicDetailPanels";

const PipelineList = () => {
  return (
    <Box className="container container-xxl" mt="20px">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{ marginBottom: "20px" }}
        className="header"
      >
        <Header title="Pipeline List" />
      </Box>
      <Box
        display="flex"
        justifyContent="flex-end"
        alignItems="flex-start"
        sx={{ marginBottom: "20px" }}
        className="container"
      >
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

      <Box className="container ">
        <Box className="container ">
          <BasicDetailPanels />
        </Box>
      </Box>
    </Box>
  );
};

export default PipelineList;
