// components/SearchBox.tsx
import { Box, IconButton, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";
import "./SearchBox.scss";

interface SearchBoxProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void; // Function to update search query
}

const SearchBox: React.FC<SearchBoxProps> = ({
  searchQuery,
  setSearchQuery,
}) => {
  return (
    <Box className="search-container" display="flex" alignItems="center">
      <IconButton className="icon">
        <SearchIcon />
      </IconButton>
      <TextField
        className="search-box"
        variant="outlined"
        size="small"
        placeholder="Search"
        value={searchQuery} // Bind the value to state
        onChange={(e) => setSearchQuery(e.target.value)} // Update state on input change
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
  );
};

export default SearchBox;
