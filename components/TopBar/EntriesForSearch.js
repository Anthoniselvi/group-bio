import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import SearchOver from "./SearchOver";

const EntriesForSearch = ({}) => {
  const [searchInput, setSearchInput] = useState("");
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setIsPopoverOpen(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setIsPopoverOpen(false);
  };
  return (
    <Box
      p="2%"
      width="100%"
      height="100%"
      display="flex"
      flexDirection="column"
      gap="5%"
    >
      <SearchOver
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        onPopoverOpen={handleClick}
        onPopoverClose={handleClose}
        anchorEl={anchorEl}
      />
      <Box></Box>
    </Box>
  );
};

export default EntriesForSearch;
