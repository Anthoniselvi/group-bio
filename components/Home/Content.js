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
import EditIcon from "@mui/icons-material/Edit";

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
    image: "",
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
  });

  const [filledFields, setFilledFields] = useState(steps.map(() => new Set()));

  const calculateProgressPercentage = () => {
    const filledMandatoryFieldsCount = Object.keys(inputFieldValues).filter(
      (field) =>
        inputFieldValues[field] !== "" &&
        steps.find((step) => step.mandatoryFields.includes(field))
    ).length;

    const progressPercentage = (filledMandatoryFieldsCount / 10) * 100;

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
    setInputFieldValues((prevValues) => ({
      ...prevValues,
      [fieldLabel]: event.target.value,
    }));

    const currentStepFilledFields = filledFields[activeStep];
    if (event.target.value) {
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
  const handleImageDrop = (event) => {
    event.preventDefault();

    // Check if files are available in the event dataTransfer
    if (
      event.dataTransfer &&
      event.dataTransfer.files &&
      event.dataTransfer.files.length > 0
    ) {
      const file = event.dataTransfer.files[0];

      const reader = new FileReader();
      reader.onload = (e) => {
        setInputFieldValues((prevValues) => ({
          ...prevValues,
          image: e.target.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleSubmit = () => {
    const postData = {
      name: inputFieldValues.name,
      image: inputFieldValues.image,
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

    axios
      .post(`${process.env.NEXT_PUBLIC_BASE_URL}/profile/add`, postData)
      .then((response) => {
        console.log("Profile added successfully!");
      })
      .catch((error) => {
        console.error("Error adding profile: ", error);
      });
  };

  return (
    <Box className={styles.content_container}>
      <ProgressSlider progressPercentage={calculateProgressPercentage()} />
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step
            key={step.index}
            sx={{
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              borderRadius: 5,
              backgroundColor: "#ffffff",
            }}
          >
            <StepLabel
              onClick={() => handleStepLabelClick(index)}
              sx={{
                border: activeStep === index ? "#b8c0ff" : "transparent",
                borderBottom: activeStep === index ? "1px solid black" : "none",
                backgroundColor: activeStep === index ? "#3e5c76" : "#fff",
                borderTopLeftRadius: activeStep === index ? 20 : 5,
                borderTopRightRadius: activeStep === index ? 20 : 5,
                padding: 2,
              }}
              icon={
                activeStep === index ? <CustomStepIcon /> : <CustomStepIcon />
              }
            >
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
              <label htmlFor="fileInput">
                <Box
                  sx={{
                    mb: 2,
                    ml: "60%",
                    width: 100,
                    height: 100,
                    backgroundColor: "lightblue",
                    border: "2px dashed #ccc",
                    borderRadius: "5px",
                    paddingTop: "70px",
                    textAlign: "right",
                    cursor: "pointer",
                  }}
                  onDrop={(e) => handleImageDrop(e)} // Corrected the event handler here
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
                type="file"
                id="fileInput"
                style={{ display: "none" }}
                onChange={(e) => handleImageDrop(e)} // Corrected the event handler here
              />

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
