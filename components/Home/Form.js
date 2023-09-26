import React, { useState } from "react";
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
  const handleStepLabelClick = (index) => {
    // if (index === activeStep) {
    //   setActiveStep(-1);
    // } else {
    //   setActiveStep(index);
    // }
  };

  const handleFieldChange = (event, fieldLabel) => {
    setInputFieldValues((prevValues) => ({
      ...prevValues,
      [fieldLabel]: event.target.value,
    }));
    // console.log("Updated inputFieldValues:", inputFieldValues);
  };

  const handleSubmit = (file) => {
    const formData = new FormData();

    for (const fieldLabel in inputFieldValues) {
      formData.append(fieldLabel, inputFieldValues[fieldLabel]);
      console.log(`Appended ${fieldLabel}: ${inputFieldValues[fieldLabel]}`);
    }

    axios
      .post(`${process.env.NEXT_PUBLIC_BASE_URL}/profile/add`, formData)
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
        {/* Step 1 */}
        <Step className={styles.step}>
          <StepLabel
            className={styles.label}
            onClick={() => handleStepLabelClick(index)}
            icon={<CustomStepIcon />}
          >
            Personal Information
          </StepLabel>
          <StepContent sx={{ p: 0, pr: 1 }}>
            <Step1
              inputFieldValues={inputFieldValues}
              handleFieldChange={handleFieldChange}
            />
            <Button
              variant="contained"
              onClick={handleNext}
              sx={{ mt: 2, backgroundColor: "#3e5c76" }}
            >
              Continue
            </Button>
          </StepContent>
        </Step>

        {/* Step 2 */}
        <Step className={styles.step}>
          <StepLabel className={styles.label} icon={<CustomStepIcon />}>
            Business Information
          </StepLabel>
          <StepContent sx={{ p: 0, pr: 1 }}>
            <Step2
              inputFieldValues={inputFieldValues}
              handleFieldChange={handleFieldChange}
            />
            <Button
              variant="contained"
              onClick={handleNext}
              sx={{ mt: 2, backgroundColor: "#3e5c76" }}
            >
              Continue
            </Button>
            <Button
              onClick={handleBack}
              sx={{ mt: 2, ml: 2, color: "#3e5c76" }}
            >
              Back
            </Button>
          </StepContent>
        </Step>

        {/* Step 3 */}
        <Step className={styles.step}>
          <StepLabel className={styles.label} icon={<CustomStepIcon />}>
            Social Media Information
          </StepLabel>
          <StepContent sx={{ p: 0, pr: 1 }}>
            <Step3
              inputFieldValues={inputFieldValues}
              handleFieldChange={handleFieldChange}
            />
            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{ mt: 2, backgroundColor: "#3e5c76" }}
            >
              Finish
            </Button>
            <Button
              onClick={handleBack}
              sx={{ mt: 2, ml: 2, color: "#3e5c76" }}
            >
              Back
            </Button>
          </StepContent>
        </Step>
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
