import React from "react";
import TextField from "@mui/material/TextField";

const Step3 = ({ inputFieldValues, handleFieldChange }) => {
  return (
    <>
      <TextField
        label="linkedIn"
        value={inputFieldValues.linkedin}
        onChange={(event) => handleFieldChange(event, "linkedin")}
        fullWidth
        margin="normal"
      />
      <TextField
        label="website"
        value={inputFieldValues.website}
        onChange={(event) => handleFieldChange(event, "website")}
        fullWidth
        margin="normal"
      />
    </>
  );
};

export default Step3;
