import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Select, MenuItem } from "@mui/material";
import generateYearOptions from "./GenerateYear";

const Step1 = ({ inputFieldValues, handleFieldChange }) => {
  const [isDragging, setIsDragging] = useState(false); // Define isDragging state

  const handleImageDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);

    if (event.dataTransfer && event.dataTransfer.files) {
      const droppedFiles = event.dataTransfer.files;

      if (droppedFiles.length > 0) {
        const file = droppedFiles[0];
        // Ensure that the file is indeed a valid image
        if (file.type.startsWith("image/")) {
          // Create a URL for the dropped image
          const imageUrl = URL.createObjectURL(file);

          // Update the inputFieldValues.image state with the image URL
          handleFieldChange({ target: { value: imageUrl } }, "image");
        } else {
          console.error("Invalid file type. Please drop an image file.");
        }
      }
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true); // Set isDragging to true when dragging over the area
  };

  return (
    <>
      <TextField
        label="name"
        value={inputFieldValues.name}
        onChange={(event) => handleFieldChange(event, "name")}
        fullWidth
        margin="normal"
      />
      {/* <label htmlFor="fileInput">
        <Box
          sx={{
            mb: 2,
            ml: "60%",
            width: 100,
            height: 100,
            backgroundColor: isDragging ? "lightgray" : "lightblue",
            border: "2px dashed #ccc",
            borderRadius: "5px",
            paddingTop: "70px",
            textAlign: "right",
            cursor: "pointer",
          }}
          onDrop={(e) => handleImageDrop(e)}
          onDragOver={(e) => handleDragOver(e)}
        >
          <EditIcon />
          {inputFieldValues.image && (
            <div>
              <img
                src={inputFieldValues.image}
                alt="Uploaded Image Preview"
                style={{ maxWidth: "100%", maxHeight: "200px" }}
              />
            </div>
          )}
        </Box>
      </label>
      <input
        name="image"
        type="file"
        id="fileInput"
        style={{ display: "none" }}
        onChange={(e) => handleImageDrop(e)}
      /> */}
      <TextField
        label="course"
        fullWidth
        select
        margin="normal"
        value={inputFieldValues.course}
        onChange={(event) => handleFieldChange(event, "course")}
      >
        {/* Add your course options here */}
        <MenuItem value="Option1">Option 1</MenuItem>
        <MenuItem value="Option2">Option 2</MenuItem>
        <MenuItem value="Option3">Option 3</MenuItem>
      </TextField>
      <TextField
        label="year"
        fullWidth
        select
        margin="normal"
        value={inputFieldValues.year}
        onChange={(event) => handleFieldChange(event, "year")}
      >
        {/* Generate a list of years from 1960 to the current year */}
        {generateYearOptions().map((year) => (
          <MenuItem key={year} value={year}>
            {year}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        label="location"
        value={inputFieldValues.location}
        onChange={(event) => handleFieldChange(event, "location")}
        fullWidth
        margin="normal"
      />
      <TextField
        label="phone"
        value={inputFieldValues.phone}
        onChange={(event) => handleFieldChange(event, "phone")}
        fullWidth
        margin="normal"
      />
    </>
  );
};

export default Step1;
