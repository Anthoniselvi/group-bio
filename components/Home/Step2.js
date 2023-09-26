import React from "react";
import TextField from "@mui/material/TextField";

const Step2 = ({ inputFieldValues, handleFieldChange }) => {
  return (
    <>
      <TextField
        label="company"
        value={inputFieldValues.company}
        onChange={(event) => handleFieldChange(event, "company")}
        fullWidth
        margin="normal"
      />
      <TextField
        label="designation"
        value={inputFieldValues.designation}
        onChange={(event) => handleFieldChange(event, "designation")}
        fullWidth
        margin="normal"
      />
      <TextField
        label="industry"
        value={inputFieldValues.industry}
        onChange={(event) => handleFieldChange(event, "industry")}
        fullWidth
        margin="normal"
      />
      <TextField
        label="offers"
        value={inputFieldValues.offers}
        onChange={(event) => handleFieldChange(event, "offers")}
        fullWidth
        margin="normal"
      />
    </>
  );
};

export default Step2;
