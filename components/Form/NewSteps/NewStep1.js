import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { TextField, MenuItem, Box } from "@mui/material";
import { courseList } from "../CourseList";
import generateYearOptions from "../GenerateYear";
import styles from "@/styles/Form.module.css";
import EditIcon from "@mui/icons-material/Edit";

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

export default function NewStep1() {
  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div style={{ width: "100%", height: "100%", margin: 0, padding: 0 }}>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>Enter your Name</Typography>
        </AccordionSummary>
        <AccordionDetails>
          Name
          <TextField fullWidth id="fullWidth" />
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography>Select your Course & Year</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {/* {selectedGroupType === "0" ? ( */}
          <>
            Course
            <TextField
              // label="course"
              fullWidth
              select
              margin="normal"
              // value={inputFieldValues.course}
              // onChange={(event) => handleFieldChange(event, "course")}
              // error={Boolean(fieldErrors.course)}
              // helperText={fieldErrors.course}
            >
              {courseList.map((courseItem, index) => (
                <MenuItem key={index} value={courseItem.course}>
                  {courseItem.course}
                </MenuItem>
              ))}
            </TextField>
            Year
            <TextField
              // label="year"
              fullWidth
              select
              margin="normal"
              // value={inputFieldValues.year}
              // onChange={(event) => handleFieldChange(event, "year")}
              // error={Boolean(fieldErrors.year)}
              // helperText={fieldErrors.year}
            >
              {generateYearOptions().map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </TextField>
          </>
          {/* ) : (
            <></>
          )} */}
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography>Location</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField fullWidth id="fullWidth" />
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
      >
        <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
          <Typography>Contact Number (Optional)</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField fullWidth id="fullWidth" />
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel5"}
        onChange={handleChange("panel5")}
      >
        <AccordionSummary aria-controls="panel5d-content" id="panel5d-header">
          <Typography>Upload your Image (Optional)</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <label htmlFor="file" className={styles.righttext}>
            <p>Please select your profile picture</p>
            <Box
              sx={{
                width: 100,
                height: 100,
                backgroundColor: "lightblue",
                border: "2px dashed #ccc",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              {/* {imageUrl ? ( */}({" "}
              <img
                style={{ width: "100%", height: "100%" }}
                // src={imageUrl}
                alt="image"
              />
              ) : (
              <EditIcon
                style={{
                  marginTop: "70px",
                  marginLeft: "70px",
                  textAlign: "right",
                }}
              />
              ){/* } */}
            </Box>
          </label>
          <input
            type="file"
            id="file"
            // onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
