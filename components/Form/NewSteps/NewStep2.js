import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export default function NewStep2({
  inputFieldValues,
  handleFieldChange,
  fieldErrors,
}) {
  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>Enter your Designation & Company Name</Typography>
        </AccordionSummary>
        <AccordionDetails>
          Company Name
          <TextField
            fullWidth
            id="fullWidth"
            value={inputFieldValues.company}
            onChange={(event) => handleFieldChange(event, "company")}
            error={Boolean(fieldErrors.company)}
            helperText={fieldErrors.company}
          />
          Designation
          <TextField
            fullWidth
            id="fullWidth"
            value={inputFieldValues.designation}
            onChange={(event) => handleFieldChange(event, "designation")}
            error={Boolean(fieldErrors.designation)}
            helperText={fieldErrors.designation}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography>About your Industry & Services Offered</Typography>
        </AccordionSummary>
        <AccordionDetails>
          Industry
          <TextField
            fullWidth
            id="fullWidth"
            value={inputFieldValues.industry}
            onChange={(event) => handleFieldChange(event, "industry")}
            error={Boolean(fieldErrors.industry)}
            helperText={fieldErrors.industry}
          />
          Offers
          <TextField
            fullWidth
            id="fullWidth"
            value={inputFieldValues.offers}
            onChange={(event) => handleFieldChange(event, "offers")}
            error={Boolean(fieldErrors.offers)}
            helperText={fieldErrors.offers}
          />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}