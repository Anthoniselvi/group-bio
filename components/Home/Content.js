import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import styles from "@/styles/Home.module.css";
import axios from "axios";
import { steps } from "./steps";
import ProgressSlider from "./ProgressSlider";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"; // Firebase Storage Imports
import { storage } from "../../firebase";
// Your Axios Base URL for API Requests
const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const CustomStepIcon = () => {
  return (
    <div style={{ width: 22, height: 22 }}>
      <AccountCircleIcon style={{ color: "rgb(1, 180, 228)", fontSize: 22 }} />
    </div>
  );
};

export default function Content() {
  const [activeStep, setActiveStep] = useState(0);
  const [inputFieldValues, setInputFieldValues] = useState({
    name: "",
    course: "",
    year: "",
    location: "",
    phone: "",
    company: "",
    designation: "",
    industry: "",
    offers: "",
    linkedin: "",
    website: "",
    image: "", // Image field added
  });

  const [filledFields, setFilledFields] = useState(steps.map(() => new Set()));

  const calculateProgressPercentage = () => {
    const filledMandatoryFieldsCount = Object.keys(inputFieldValues).filter(
      (field) =>
        inputFieldValues[field] !== "" &&
        steps.find((step) => step.mandatoryFields.includes(field))
    ).length;

    const progressPercentage = (filledMandatoryFieldsCount / 11) * 100; // 11 fields including the image

    return progressPercentage;
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // Function to reset to the first step
  const handleReset = () => {
    setActiveStep(0);
  };

  // Function to handle field changes
  const handleFieldChange = (event, fieldLabel) => {
    const value = event.target.value;

    setInputFieldValues((prevValues) => ({
      ...prevValues,
      [fieldLabel]: value || "", // Use an empty string as a default if the value is null
    }));

    const currentStepFilledFields = filledFields[activeStep];
    if (value) {
      currentStepFilledFields.add(fieldLabel);
    } else {
      currentStepFilledFields.delete(fieldLabel);
    }

    if (steps[activeStep].mandatoryFields.includes(fieldLabel)) {
      const updatedStepStatus = calculateStepStatus();
    }
  };

  const calculateStepStatus = () => {
    const stepStatus = steps.map((step, index) => {
      const currentStepFilledFields = filledFields[index];
      const mandatoryFieldsCount = step.mandatoryFields.length;
      let unfilledMandatoryFieldsCount = mandatoryFieldsCount;

      step.mandatoryFields.forEach((field) => {
        if (currentStepFilledFields.has(field)) {
          unfilledMandatoryFieldsCount--;
        }
      });

      return `${unfilledMandatoryFieldsCount} fields left`;
    });

    return stepStatus;
  };

  const handleStepLabelClick = (index) => {
    if (index === activeStep) {
      setActiveStep(-1);
    } else {
      setActiveStep(index);
    }
  };

  const handleSubmit = async () => {
    const postData = {
      name: inputFieldValues.name,
      course: inputFieldValues.course,
      year: inputFieldValues.year,
      location: inputFieldValues.location,
      phone: inputFieldValues.phone,
      company: inputFieldValues.company,
      designation: inputFieldValues.designation,
      industry: inputFieldValues.industry,
      offers: inputFieldValues.offers,
      linkedin: inputFieldValues.linkedin,
      website: inputFieldValues.website,
    };

    try {
      // Upload image to Firebase Storage
      const downloadURL = await uploadImageToFirebaseStorage(
        inputFieldValues.image, // Pass the image file
        inputFieldValues.name // Use name as the display name for the image
      );

      // Update the image field in postData
      postData.image = downloadURL;

      // Send a POST request to your API to save the profile data to MongoDB
      await axios.post(`${API_BASE_URL}/profile/add`, postData);

      console.log("Profile added successfully!");
      // Redirect or perform any desired action on successful submission
    } catch (error) {
      console.error("Error adding profile: ", error);
    }
  };

  const uploadImageToFirebaseStorage = async (file, displayName) => {
    const date = new Date().getTime();
    const storageRef = ref(storage, `${displayName + date}`);

    await uploadBytesResumable(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];

    // Check if a valid image file was dropped
    if (droppedFile && droppedFile.type.startsWith("image/")) {
      setInputFieldValues((prevValues) => ({
        ...prevValues,
        image: droppedFile,
      }));
    }
  };

  // Event listener for drag-over and drag-enter to allow dropping files
  const handleDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
  };

  return (
    <Box className={styles.content_container}>
      <ProgressSlider progressPercentage={calculateProgressPercentage()} />
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={index}>
            <StepLabel>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    fontSize: 16,
                    fontWeight: 600,
                    color: activeStep === index ? "#fff" : "#121212",
                  }}
                >
                  {step.label}
                </Typography>
                <Typography
                  sx={{
                    fontSize: 12,
                    color: activeStep === index ? "#edf2f4" : "#a5a58d",
                  }}
                >
                  {calculateStepStatus()[index]}
                </Typography>
              </div>
            </StepLabel>
            <StepContent sx={{ p: 0, pr: 1 }}>
              {step.fields.map((field, fieldIndex) => (
                <TextField
                  key={field.label}
                  label={field.label}
                  value={inputFieldValues[field.label]}
                  onChange={(event) => handleFieldChange(event, field.label)}
                  fullWidth
                  margin="normal"
                />
              ))}

              {/* Conditionally render the image input in the final step */}
              {index === steps.length - 1 && (
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  style={{
                    border: "2px dashed #ccc",
                    padding: "20px",
                    textAlign: "center",
                    cursor: "pointer",
                  }}
                >
                  <label htmlFor="file" style={{ cursor: "pointer" }}>
                    Upload an avatar
                  </label>
                  <input
                    required
                    style={{ display: "none" }}
                    type="file"
                    id="file"
                    onChange={(event) => handleFieldChange(event, "image")}
                  />
                </div>
              )}

              <Box sx={{ mb: 2 }}>
                <div>
                  <Button
                    variant="contained"
                    onClick={
                      activeStep === steps.length - 1
                        ? handleSubmit
                        : handleNext
                    }
                    sx={{ mt: 1, mr: 1, backgroundColor: "#3e5c76" }}
                  >
                    {index === steps.length - 1 ? "Finish" : "Continue"}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1 }}
                  >
                    Back
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length - 1 && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button
            onClick={handleReset}
            sx={{ mt: 1, backgroundColor: "#003049", color: "#fff" }}
          >
            Reset
          </Button>
        </Paper>
      )}
    </Box>
  );
}
