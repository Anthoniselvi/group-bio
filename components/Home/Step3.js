import React from "react";
import TextField from "@mui/material/TextField";

const Step3 = ({ inputFieldValues, handleFieldChange, fieldErrors }) => {
  return (
    <>
      <TextField
        label="linkedIn"
        value={inputFieldValues.linkedin}
        onChange={(event) => handleFieldChange(event, "linkedin")}
        fullWidth
        margin="normal"
        error={Boolean(fieldErrors.linkedin)}
        helperText={fieldErrors.linkedin}
      />
      <TextField
        label="website"
        value={inputFieldValues.website}
        onChange={(event) => handleFieldChange(event, "website")}
        fullWidth
        margin="normal"
        error={Boolean(fieldErrors.website)}
        helperText={fieldErrors.website}
      />
    </>
  );
};

export default Step3;
