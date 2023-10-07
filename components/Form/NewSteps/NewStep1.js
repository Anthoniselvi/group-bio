import * as React from "react";
import { useState, useEffect } from "react";
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

export default function NewStep1({
  inputFieldValues,
  handleFieldChange,
  fieldErrors,
  groupId,
  selectedGroupType,
}) {
  const [expanded, setExpanded] = React.useState("panel1");
  const [file, setFile] = useState(null);
  const [per, setPerc] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  useEffect(() => {
    const uploadFile = () => {
      if (file) {
        const name = new Date().getTime() + file.name;
        const storageRef = ref(storage, name);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            setPerc(progress);
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
              default:
                break;
            }
          },
          (error) => {
            console.log(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setImageUrl(downloadURL);
              handleFieldChange({ target: { value: downloadURL } }, "image"); // Update inputFieldValues.image
            });
          }
        );
      }
    };
    uploadFile();
  }, [file, handleFieldChange]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
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
          <TextField
            fullWidth
            id="fullWidth"
            value={inputFieldValues.name}
            onChange={(event) => handleFieldChange(event, "name")}
            error={Boolean(fieldErrors.name)}
            helperText={fieldErrors.name}
          />
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
          {selectedGroupType === "0" ? (
            <>
              Course
              <TextField
                // label="course"
                fullWidth
                select
                margin="normal"
                value={inputFieldValues.course}
                onChange={(event) => handleFieldChange(event, "course")}
                error={Boolean(fieldErrors.course)}
                helperText={fieldErrors.course}
              >
                {courseList.map((courseItem, index) => (
                  <MenuItem key={index} value={courseItem.course}>
                    {courseItem.course}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                // label="year"
                fullWidth
                select
                margin="normal"
                value={inputFieldValues.year}
                onChange={(event) => handleFieldChange(event, "year")}
                error={Boolean(fieldErrors.year)}
                helperText={fieldErrors.year}
              >
                {generateYearOptions().map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </TextField>
            </>
          ) : (
            <></>
          )}
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
          <TextField
            fullWidth
            id="fullWidth"
            value={inputFieldValues.location}
            onChange={(event) => handleFieldChange(event, "location")}
            error={Boolean(fieldErrors.location)}
            helperText={fieldErrors.location}
          />
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
          <TextField
            fullWidth
            id="fullWidth"
            value={inputFieldValues.phone}
            onChange={(event) => handleFieldChange(event, "phone")}
          />
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
              {imageUrl ? (
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
              )}
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
