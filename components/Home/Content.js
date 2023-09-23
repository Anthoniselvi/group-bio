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

  // Initialize arrays to track filled fields for each step
  const [filledFields, setFilledFields] = useState(steps.map(() => new Set()));

  // Function to calculate the progress percentage
  const calculateProgressPercentage = () => {
    const filledMandatoryFieldsCount = Object.keys(inputFieldValues).filter(
      (field) =>
        inputFieldValues[field] !== "" &&
        steps.find((step) => step.mandatoryFields.includes(field))
    ).length;

    const progressPercentage = (filledMandatoryFieldsCount / 10) * 100;

    return progressPercentage;
  };

  // Function to handle the next step
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  // Function to handle going back to the previous step
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

    // Update the filled fields for the current step
    const currentStepFilledFields = filledFields[activeStep];
    if (event.target.value) {
      currentStepFilledFields.add(fieldLabel);
    } else {
      currentStepFilledFields.delete(fieldLabel);
    }

    // Calculate and update the step statuses only if the field is mandatory
    if (steps[activeStep].mandatoryFields.includes(fieldLabel)) {
      const updatedStepStatus = calculateStepStatus();
      // Here, you can use updatedStepStatus as needed in your component
    }
  };

  // Function to calculate step statuses based on the filled mandatory fields for each step
  const calculateStepStatus = () => {
    const stepStatus = steps.map((step, index) => {
      const currentStepFilledFields = filledFields[index];
      const mandatoryFieldsCount = step.mandatoryFields.length;
      let unfilledMandatoryFieldsCount = mandatoryFieldsCount;

      // Check if all mandatory fields in the step are filled
      step.mandatoryFields.forEach((field) => {
        if (currentStepFilledFields.has(field)) {
          unfilledMandatoryFieldsCount--;
        }
      });

      return `${unfilledMandatoryFieldsCount} fields left`;
    });

    return stepStatus;
  };

  // Function to handle step label clicks
  const handleStepLabelClick = (index) => {
    if (index === activeStep) {
      setActiveStep(-1);
    } else {
      setActiveStep(index);
    }
  };

  // Function to handle form submission
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
      // .post("http://localhost:2222/profile/add", postData)
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
            }}
          >
            <StepLabel
              onClick={() => handleStepLabelClick(index)}
              sx={{
                border: activeStep === index ? "#b8c0ff" : "transparent",
                borderBottom: activeStep === index ? "1px solid black" : "none",
                backgroundColor: activeStep === index ? "#eaf4f4" : "#fff",
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                padding: 2,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ fontSize: 16, fontWeight: 600 }}>
                  {step.label}
                </Typography>
                <Typography sx={{ fontSize: 12, color: "#a5a58d" }}>
                  {calculateStepStatus()[index]}
                </Typography>
              </div>
            </StepLabel>
            <StepContent sx={{ p: 0, pr: 1, backgroundColor: "#fff" }}>
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
              <Box sx={{ mb: 2 }}>
                <div>
                  <Button
                    variant="contained"
                    onClick={
                      activeStep === steps.length - 1
                        ? handleSubmit
                        : handleNext
                    }
                    sx={{ mt: 1, mr: 1 }}
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
          <Button onClick={handleReset} sx={{ mt: 1 }}>
            Reset
          </Button>
          s
        </Paper>
      )}
    </Box>
  );
}
