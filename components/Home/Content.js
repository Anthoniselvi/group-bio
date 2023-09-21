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

const steps = [
  {
    label: "Personal Information",
    status: "4 fields left",
    fields: [
      {
        label: "Name",
        value: "",
      },
      {
        label: "Image",
        value: "",
      },
      {
        label: "Course",
        value: "",
      },
      {
        label: "Year",
        value: "",
      },
      {
        label: "Location",
        value: "",
      },
      {
        label: "Contact Number",
        value: "",
      },
    ],
  },
  {
    label: "Business Information",
    status: "4 fields left",
    fields: [
      {
        label: "Company Name",
        value: "",
      },
      {
        label: "Designation",
        value: "",
      },
      {
        label: "Industry",
        value: "",
      },
      {
        label: "Services Offered",
        value: "",
      },
    ],
  },
  {
    label: "Social Media Information",
    status: "2 fields left",
    fields: [
      {
        label: "LinkedIn",
        value: "",
      },
      {
        label: "Website",
        value: "",
      },
    ],
  },
];

export default function Content() {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleFieldChange = (event, index) => {
    const newSteps = [...steps];
    newSteps[activeStep].fields[index].value = event.target.value;
  };

  const handleStepLabelClick = (index) => {
    if (index === activeStep) {
      // If the clicked label is the currently active step, close it
      setActiveStep(-1);
    } else {
      // If the clicked label is not the active step, open it
      setActiveStep(index);
    }
  };
  return (
    <Box sx={{ maxWidth: 400 }} className={styles.content_container}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              // onClick={() => handleFieldChange(index)}
              onClick={() => handleStepLabelClick(index)}
              sx={{
                backgroundColor: activeStep === index ? "pink" : "transparent",
                borderRadius: 5,
                padding: 2,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="secondary">{step.label}</Typography>
                <Typography variant="caption">{step.status}</Typography>
              </div>
            </StepLabel>
            <StepContent>
              {step.fields.map((field, fieldIndex) => (
                <TextField
                  key={field.label}
                  label={field.label}
                  value={field.value}
                  onChange={(event) => handleFieldChange(event, fieldIndex)}
                  fullWidth
                  margin="normal"
                />
              ))}
              <Box sx={{ mb: 2 }}>
                <div>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {index === steps.length - 1 ? "Finish" : "Continue"}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )}
    </Box>
  );
}
