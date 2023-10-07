import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
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
import { validateStep1, validateStep2, validateStep3 } from "./Validation";
import DoneIcon from "@mui/icons-material/Done";
import handleSubmit from "./handleSubmit";
import NewStep1 from "./NewSteps/NewStep1";
import NewStep2 from "./NewSteps/NewStep2";
import NewStep3 from "./NewSteps/NewStep3";

const CustomStepIcon = (s) => {
  return (
    <div style={{ width: 22, height: 22 }}>
      <AccountCircleIcon style={{ color: "#00b4d8", fontSize: 22 }} />
    </div>
  );
};

export default function NewForm({ selectedGroup }) {
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
  console.log("selectedGroup: " + JSON.stringify(selectedGroup));
  const router = useRouter();
  const { id } = router.query;

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

  const [filledFields, setFilledFields] = useState(
    steps(selectedGroup).map(() => new Set())
  );
  const [stepContentVisibility, setStepContentVisibility] = useState(
    Array(steps(selectedGroup).length).fill(false)
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
        steps(selectedGroup).find((step) =>
          step.mandatoryFields.includes(field)
        )
    ).length;

    const progressPercentage = (filledMandatoryFieldsCount / 12) * 100;

    return progressPercentage;
  };

  const handleNext = () => {
    // Validate the fields for the current step
    let validationErrors = {};
    if (activeStep === 0) {
      validationErrors = validateStep1(inputFieldValues);
    } else if (activeStep === 1) {
      validationErrors = validateStep2(inputFieldValues);
    } else if (activeStep === 2) {
      validationErrors = validateStep3(inputFieldValues);
    }

    // If there are validation errors, set fieldErrors and return
    if (Object.keys(validationErrors).length > 0) {
      setFieldErrors(validationErrors);
      return;
    }

    // Proceed to the next step
    if (activeStep < steps(selectedGroup).length - 1) {
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
    const newValue = event.target.value;

    // Validate the field and store the error in the fieldErrors state
    let validationFunction = null;

    switch (fieldLabel) {
      case "name":
      case "location":
        validationFunction = validateStep1;
        break;
      case "course":
      case "year":
        if (groupType === "0") {
          validationFunction = validateStep1;
        }
        break;
      case "company":
      case "designation":
      case "industry":
      case "offers":
        validationFunction = validateStep2;
        break;
      case "linkedin":
      case "website":
        validationFunction = validateStep3;
        break;
      default:
        break;
    }

    if (validationFunction) {
      const error = validationFunction(newValue);
      switch (fieldLabel) {
        case "name":
          setIsNameError(!!error.name);
          break;
        case "course":
        case "year":
          if (selectedGroup.groupType === "0") {
            setIsCourseError(!!error.course);
            setIsYearError(!!error.year);
          }
          break;
        case "location":
          setIsLocationError(!!error.location);
          break;
        case "company":
          setIsCompanyError(!!error.company);
          break;
        case "designation":
          setIsDesignationError(!!error.designation);
          break;
        case "industry":
          setIsIndustryError(!!error.industry);
          break;
        case "offers":
          setIsOffersError(!!error.offers);
          break;
        case "linkedin":
          setIsLinkedinError(!!error.linkedin);
          break;
        case "website":
          setIsWebsiteError(!!error.website);
          break;
        default:
          break;
      }
    }

    // Update the field value in the inputFieldValues state
    setInputFieldValues((prevValues) => ({
      ...prevValues,
      [fieldLabel]: newValue,
    }));

    const currentStepFilledFields = filledFields[activeStep];
    if (newValue) {
      currentStepFilledFields.add(fieldLabel);
    } else {
      currentStepFilledFields.delete(fieldLabel);
    }
  };

  const calculateStepStatus = () => {
    const stepStatus = steps(selectedGroup).map((step, index) => {
      const currentStepFilledFields = filledFields[index];
      const mandatoryFieldsCount = step.mandatoryFields.length;
      let unfilledMandatoryFieldsCount = mandatoryFieldsCount;

      if (index === 0 && selectedGroup.groupType === "0") {
        // If groupType is 0 and it's the first step, set 4 fields as mandatory
        const mandatoryFieldsInStep1 = ["name", "course", "year", "location"];
        mandatoryFieldsInStep1.forEach((field) => {
          if (currentStepFilledFields.has(field)) {
            unfilledMandatoryFieldsCount--;
          }
        });
      } else if (index === 0) {
        // If it's the first step but groupType is not 0, set 2 fields as mandatory
        const mandatoryFieldsInStep1 = ["name", "location"];
        mandatoryFieldsInStep1.forEach((field) => {
          if (currentStepFilledFields.has(field)) {
            unfilledMandatoryFieldsCount--;
          }
        });
      } else if (index !== 0) {
        step.mandatoryFields.forEach((field) => {
          if (currentStepFilledFields.has(field)) {
            unfilledMandatoryFieldsCount--;
          }
        });
      }

      return unfilledMandatoryFieldsCount === 0 ? (
        <DoneIcon style={{ color: "#38b000", fontSize: 28, fontWeight: 800 }} />
      ) : (
        `${unfilledMandatoryFieldsCount} fields left`
      );
    });

    return stepStatus;
  };

  const selectedGroupId = selectedGroup.groupId;

  const handleSubmitForm = () => {
    console.log("submit btn clicked");
    handleSubmit(
      inputFieldValues,
      selectedGroupId,
      setFieldErrors,
      router,
      selectedGroup
    );
  };

  return (
    <Box className={styles.content_container}>
      <ProgressSlider progressPercentage={calculateProgressPercentage()} />
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps(selectedGroup).map((step, index) => (
          <Step
            key={step.label}
            className={styles.step}
            sx={{
              borderTopLeftRadius: activeStep === index ? 20 : 5,
              borderTopRightRadius: activeStep === index ? 20 : 5,
            }}
          >
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
            <StepContent sx={{ p: 0, margin: 0, zIndex: 10, border: "none" }}>
              {stepContentVisibility[index] && (
                <div>
                  {index === 0 && (
                    <NewStep1
                      inputFieldValues={inputFieldValues}
                      handleFieldChange={handleFieldChange}
                      fieldErrors={fieldErrors}
                      groupId={id}
                      selectedGroupType={selectedGroup.groupType}
                    />
                  )}
                  {index === 1 && (
                    <NewStep2
                      inputFieldValues={inputFieldValues}
                      handleFieldChange={handleFieldChange}
                      fieldErrors={fieldErrors}
                    />
                  )}
                  {index === 2 && (
                    <NewStep3
                      inputFieldValues={inputFieldValues}
                      handleFieldChange={handleFieldChange}
                      fieldErrors={fieldErrors}
                    />
                  )}
                </div>
              )}
              <div
                style={{
                  display: "flex",
                  gap: "20px",
                  paddingBottom: "20px",
                  paddingLeft: "20px",
                }}
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
                    activeStep === steps(selectedGroup).length - 1
                      ? handleSubmitForm
                      : handleNext
                  }
                  sx={{
                    mt: 2,
                    backgroundColor: "#03045e",
                    color: "#fff",
                    borderRadius: "20px",
                  }}
                >
                  {activeStep === steps(selectedGroup).length - 1
                    ? "Finish"
                    : "Continue"}
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
