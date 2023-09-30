import React, { useState, useEffect } from "react";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Paper,
  Typography,
} from "@mui/material";
import styles from "@/styles/Home.module.css";
import axios from "axios";
import ProgressSlider from "./ProgressSlider";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import { steps } from "./steps";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

// Import validation functions from Validation.js
import * as Validation from "./Validation";

const CustomStepIcon = (s) => {
  return (
    <div style={{ width: 22, height: 22 }}>
      <AccountCircleIcon style={{ color: "#00b4d8", fontSize: 22 }} />
    </div>
  );
};

export default function Form() {
  const [activeStep, setActiveStep] = useState(0);
  const [isNameError, setIsNameError] = useState(false);
  const [isCourseError, setIsCourseError] = useState(false);
  const [isYearError, setIsYearError] = useState(false);
  const [isLocationError, setIsLocationError] = useState(false);
  const [isCompanyError, setIsCompanyError] = useState(false);
  const [isDesignationError, setIsDesignationError] = useState(false);
  const [isIndustryError, setIsIndustryError] = useState(false);
  const [isOffersError, setIsOffersError] = useState(false);
  const [isLinkedinError, setIsLinkedinError] = useState(false);
  const [isWebsiteError, setIsWebsiteError] = useState(false);

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
    Array(steps.length).fill(false)
  );
  const [fieldErrors, setFieldErrors] = useState({});

  const handleStepLabelClick = (index) => {
    setStepContentVisibility((prevVisibility) => {
      const updatedVisibility = [...prevVisibility];
      updatedVisibility[index] = !updatedVisibility[index];
      return updatedVisibility;
    });

    if (!stepContentVisibility[index]) {
      setActiveStep(index);
    } else {
      setActiveStep(-1);
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
    if (activeStep < steps.length - 1) {
      setStepContentVisibility((prevVisibility) => {
        const updatedVisibility = [...prevVisibility];
        updatedVisibility[activeStep] = false;
        updatedVisibility[activeStep + 1] = true;
        return updatedVisibility;
      });

      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setStepContentVisibility((prevVisibility) => {
        const updatedVisibility = [...prevVisibility];
        updatedVisibility[activeStep] = false;
        updatedVisibility[activeStep - 1] = true;
        return updatedVisibility;
      });

      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };

  const handleFieldChange = (event, fieldLabel) => {
    setInputFieldValues((prevValues) => ({
      ...prevValues,
      [fieldLabel]: event.target.value,
    }));
    if (fieldLabel === "name") {
      const validationFunction = Validation.validateName;
      const error = validationFunction(event.target.value);
      setIsNameError(!!error); // Set the error state based on validation result
    } else if (fieldLabel === "course") {
      const validationFunction = Validation.validateCourse; // Use the appropriate validation function for "Course"
      const error = validationFunction(event.target.value);
      setIsCourseError(!!error); // Set the error state based on validation result
    } else if (fieldLabel === "year") {
      const validationFunction = Validation.validateYear; // Use the appropriate validation function for "Course"
      const error = validationFunction(event.target.value);
      setIsYearError(!!error); // Set the error state based on validation result
    } else if (fieldLabel === "location") {
      const validationFunction = Validation.validateLocation; // Use the appropriate validation function for "Course"
      const error = validationFunction(event.target.value);
      setIsLocationError(!!error); // Set the error state based on validation result
    } else if (fieldLabel === "company") {
      const validationFunction = Validation.validateLocation; // Use the appropriate validation function for "Course"
      const error = validationFunction(event.target.value);
      setIsCompanyError(!!error); // Set the error state based on validation result
    } else if (fieldLabel === "designation") {
      const validationFunction = Validation.validateLocation;
      const error = validationFunction(event.target.value);
      setIsDesignationError(!!error);
    } else if (fieldLabel === "industry") {
      const validationFunction = Validation.validateLocation;
      const error = validationFunction(event.target.value);
      setIsIndustryError(!!error);
    } else if (fieldLabel === "offers") {
      const validationFunction = Validation.validateLocation;
      const error = validationFunction(event.target.value);
      setIsOffersError(!!error);
    } else if (fieldLabel === "linkedin") {
      const validationFunction = Validation.validateLocation;
      const error = validationFunction(event.target.value);
      setIsLinkedinError(!!error);
    } else if (fieldLabel === "website") {
      const validationFunction = Validation.validateLocation;
      const error = validationFunction(event.target.value);
      setIsWebsiteError(!!error);
    }
    const currentStepFilledFields = filledFields[activeStep];
    if (event.target.value) {
      currentStepFilledFields.add(fieldLabel);
    } else {
      currentStepFilledFields.delete(fieldLabel);
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

  const handleSubmit = () => {
    const fieldErrors = {};

    // Iterate through input fields and validate them
    for (const fieldLabel in inputFieldValues) {
      const validationFunction =
        Validation[
          `validate${fieldLabel.charAt(0).toUpperCase() + fieldLabel.slice(1)}`
        ];
      if (validationFunction) {
        const error = validationFunction(inputFieldValues[fieldLabel]);
        if (error) {
          fieldErrors[fieldLabel] = error;
          switch (fieldLabel) {
            case "name":
              setIsNameError(true);
              break;
            case "course":
              setIsCourseError(true);
              break;
            case "year":
              setIsYearError(true);
              break;
            case "location":
              setIsLocationError(true);
              break;
            case "company":
              setIsCompanyError(true);
              break;
            case "designation":
              setIsDesignationError(true);
              break;
            case "industry":
              setIsIndustryError(true);
              break;
            case "offers":
              setIsOffersError(true);
              break;
            case "linkedin":
              setIsLinkedinError(true);
              break;
            case "website":
              setIsWebsiteError(true);
              break;
            default:
              break;
          }
        }
      }
    }

    if (Object.keys(fieldErrors).length > 0) {
      setFieldErrors(fieldErrors);
      // setIsNameError(true);
    } else {
      // If there are no validation errors, proceed with the API request
      const formData = new FormData();

      for (const fieldLabel in inputFieldValues) {
        formData.append(fieldLabel, inputFieldValues[fieldLabel]);
        console.log(`Appended ${fieldLabel}: ${inputFieldValues[fieldLabel]}`);
      }
      console.log("formData: " + JSON.stringify(inputFieldValues));
      axios
        .post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/profile/add`,
          inputFieldValues
        )
        .then((response) => {
          console.log("Profile added successfully!");
        })
        .catch((error) => {
          console.error("Error adding profile: ", error);
        });
    }
  };

  return (
    <Box className={styles.content_container}>
      <ProgressSlider progressPercentage={calculateProgressPercentage()} />
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step
            key={step.label}
            className={styles.step}
            sx={{
              borderTopLeftRadius: activeStep === index ? 20 : 5,
              borderTopRightRadius: activeStep === index ? 20 : 5,
            }}
          >
            {console.log("isNameError : " + isNameError)}
            {console.log("isCourseError : " + isCourseError)}
            {console.log("YearError : " + isYearError)}
            {console.log("LocationError : " + isLocationError)}
            {console.log("Company Error : " + isCompanyError)}
            {console.log("Designation Error : " + isDesignationError)}
            {console.log("Industry Error : " + isIndustryError)}
            {console.log("Offers Error : " + isOffersError)}
            {console.log("Lnkedin Error : " + isLinkedinError)}
            {console.log("isWebsite Error : " + isWebsiteError)}

            <StepLabel
              onClick={() => handleStepLabelClick(index)}
              sx={{
                border: activeStep === index ? "#03045e" : "transparent",
                borderBottom:
                  activeStep === index ? "1px solid #03045e" : "none",
                backgroundColor: activeStep === index ? "#03045e" : "#fff",
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
                    color:
                      (index === 0 && isNameError) ||
                      (index === 0 && isCourseError) ||
                      (index === 0 && isYearError) ||
                      (index === 0 && isLocationError)
                        ? "red"
                        : (index === 1 && isCompanyError) ||
                          (index === 1 && isDesignationError) ||
                          (index === 1 && isIndustryError) ||
                          (index === 1 && isOffersError)
                        ? "red "
                        : (index === 2 && isLinkedinError) ||
                          (index === 2 && isWebsiteError)
                        ? "red "
                        : activeStep === index
                        ? "#edf2f4"
                        : "#a5a58d",
                  }}
                >
                  {calculateStepStatus()[index]}
                </Typography>
              </div>
            </StepLabel>
            <StepContent sx={{ p: 0, pr: 1, zIndex: 10, border: "none" }}>
              {stepContentVisibility[index] && (
                <div>
                  {index === 0 && (
                    <Step1
                      inputFieldValues={inputFieldValues}
                      handleFieldChange={handleFieldChange}
                      fieldErrors={fieldErrors}
                    />
                  )}
                  {index === 1 && (
                    <Step2
                      inputFieldValues={inputFieldValues}
                      handleFieldChange={handleFieldChange}
                      fieldErrors={fieldErrors}
                    />
                  )}
                  {index === 2 && (
                    <Step3
                      inputFieldValues={inputFieldValues}
                      handleFieldChange={handleFieldChange}
                      fieldErrors={fieldErrors}
                    />
                  )}
                </div>
              )}
              <div
                style={{ display: "flex", gap: "20px", paddingBottom: "20px" }}
              >
                <Button
                  variant="contained"
                  onClick={handleBack}
                  sx={{
                    mt: 2,
                    backgroundColor: "#00b4d8",
                    color: "#fff",
                    borderRadius: "20px",
                  }}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  onClick={
                    activeStep === steps.length - 1 ? handleSubmit : handleNext
                  }
                  sx={{
                    mt: 2,
                    backgroundColor: "#03045e",
                    color: "#fff",
                    borderRadius: "20px",
                  }}
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
