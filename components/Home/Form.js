import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import styles from "@/styles/Home.module.css";
import axios from "axios";
import ProgressSlider from "./ProgressSlider";
import EditIcon from "@mui/icons-material/Edit";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import { steps } from "./steps";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const CustomStepIcon = () => {
  return (
    <div style={{ width: 22, height: 22 }}>
      <AccountCircleIcon style={{ color: "rgb(1, 180, 228)", fontSize: 22 }} />
    </div>
  );
};

export default function Form() {
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
  const [stepContentVisibility, setStepContentVisibility] = useState(
    Array(steps.length).fill(false) // Initialize all steps as hidden
  );

  const handleStepLabelClick = (index) => {
    // Toggle the visibility of the clicked step's content
    setStepContentVisibility((prevVisibility) => {
      const updatedVisibility = [...prevVisibility];
      updatedVisibility[index] = !updatedVisibility[index];
      return updatedVisibility;
    });

    // Set the active step to the clicked step if it's currently hidden
    if (!stepContentVisibility[index]) {
      setActiveStep(index);
    } else {
      setActiveStep(-1); // Hide the content if it's currently shown
    }
  };
  useEffect(() => {
    setStepContentVisibility((prevVisibility) => {
      const updatedVisibility = [...prevVisibility];
      updatedVisibility[0] = true;
      return updatedVisibility;
    });
  }, []);
  const calculateProgressPercentage = () => {
    const filledMandatoryFieldsCount = Object.keys(inputFieldValues).filter(
      (field) =>
        inputFieldValues[field] !== "" &&
        steps.find((step) => step.mandatoryFields.includes(field))
    ).length;

    const progressPercentage = (filledMandatoryFieldsCount / 12) * 100;

    return progressPercentage;
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

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

    // Calculate and update the step statuses only if the field is mandatory
    if (steps[activeStep].mandatoryFields.includes(fieldLabel)) {
      const updatedStepStatus = calculateStepStatus();
      // Here, you can use updatedStepStatus as needed in your component
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
  const handleSubmit = (file) => {
    const formData = new FormData();

    for (const fieldLabel in inputFieldValues) {
      formData.append(fieldLabel, inputFieldValues[fieldLabel]);
      console.log(`Appended ${fieldLabel}: ${inputFieldValues[fieldLabel]}`);
    }
    console.log("formData: " + JSON.stringify(inputFieldValues));
    axios
      .post(`${process.env.NEXT_PUBLIC_BASE_URL}/profile/add`, inputFieldValues)
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
          <Step key={step.label} className={styles.step}>
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
              {/* Conditionally display step content based on visibility */}
              {stepContentVisibility[index] && (
                <div>
                  {index === 0 && (
                    <Step1
                      inputFieldValues={inputFieldValues}
                      handleFieldChange={handleFieldChange}
                    />
                  )}
                  {index === 1 && (
                    <Step2
                      inputFieldValues={inputFieldValues}
                      handleFieldChange={handleFieldChange}
                    />
                  )}
                  {index === 2 && (
                    <Step3
                      inputFieldValues={inputFieldValues}
                      handleFieldChange={handleFieldChange}
                    />
                  )}
                </div>
              )}
              <div>
                <Button
                  variant="contained"
                  onClick={handleBack}
                  sx={{ mt: 2, ml: 2, color: "#3e5c76" }}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  onClick={
                    activeStep === steps.length - 1 ? handleSubmit : handleNext
                  }
                  sx={{ mt: 2, backgroundColor: "#3e5c76" }}
                >
                  {activeStep === steps.length - 1 ? "Finish" : "Continue"}
                </Button>
              </div>{" "}
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === 3 && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button
            onClick={() => setActiveStep(0)}
            sx={{ mt: 2, backgroundColor: "#003049", color: "#fff" }}
          >
            Reset
          </Button>
        </Paper>
      )}
    </Box>
  );
}
