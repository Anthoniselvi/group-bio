import React from "react";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import { Box } from "@mui/material";
import Input from "@mui/material/Input"; // Import Input component

export default function SearchOver({
  searchInput,
  setSearchInput,
  onPopoverOpen,
  onPopoverClose,
  anchorEl,
}) {
  const open = Boolean(anchorEl);

  return (
    <div style={{ width: "100%" }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        padding="2%"
      >
        <SearchIcon
          style={{ color: "#121212", fontSize: 22 }}
          onClick={onPopoverOpen}
        />
      </Box>

      {/* Use Input component to display search input */}
      {open && (
        <Input
          type="text"
          id="name"
          name="name"
          style={{
            background: "#fff",
            borderRadius: "7px",
            width: "100%",
            height: "44px",
            padding: "8px 15px",
            fontWeight: 400,
            fontSize: "16px",
            lineHeight: "20px",
            color: "#101a34",
            border: "1px solid #cad3dd",
            fontFamily: "Poppins",
          }}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onBlur={onPopoverClose} // Close the popover on input blur
        />
      )}
    </div>
  );
}
