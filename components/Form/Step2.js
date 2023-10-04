import React from "react";
import TextField from "@mui/material/TextField";

const Step2 = ({ inputFieldValues, handleFieldChange, fieldErrors }) => {
  return (
    <>
      <TextField
        label="company"
        value={inputFieldValues.company}
        onChange={(event) => handleFieldChange(event, "company")}
        fullWidth
        margin="normal"
        error={Boolean(fieldErrors.company)}
        helperText={fieldErrors.company}
      />
      <TextField
        label="designation"
        value={inputFieldValues.designation}
        onChange={(event) => handleFieldChange(event, "designation")}
        fullWidth
        margin="normal"
        error={Boolean(fieldErrors.designation)}
        helperText={fieldErrors.designation}
      />
      <TextField
        label="industry"
        value={inputFieldValues.industry}
        onChange={(event) => handleFieldChange(event, "industry")}
        fullWidth
        margin="normal"
        error={Boolean(fieldErrors.industry)}
        helperText={fieldErrors.industry}
      />
      <TextField
        label="offers"
        value={inputFieldValues.offers}
        onChange={(event) => handleFieldChange(event, "offers")}
        fullWidth
        margin="normal"
        error={Boolean(fieldErrors.offers)}
        helperText={fieldErrors.offers}
      />
    </>
  );
};

export default Step2;
