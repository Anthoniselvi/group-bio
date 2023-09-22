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

const steps = [
  {
    label: "Personal Information",
    status: "4 fields left",
    fields: [
      {
        label: "name",
        value: "",
      },
      {
        label: "image",
        value: "",
      },
      {
        label: "course",
        value: "",
      },
      {
        label: "year",
        value: "",
      },
      {
        label: "location",
        value: "",
      },
      {
        label: "phone",
        value: "",
      },
    ],
  },
  {
    label: "Business Information",
    status: "4 fields left",
    fields: [
      {
        label: "company",
        value: "",
      },
      {
        label: "designation",
        value: "",
      },
      {
        label: "industry",
        value: "",
      },
      {
        label: "offers",
        value: "",
      },
    ],
  },
  {
    label: "Social Media Information",
    status: "2 fields left",
    fields: [
      {
        label: "linkedin",
        value: "",
      },
      {
        label: "website",
        value: "",
      },
    ],
  },
];

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

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleFieldChange = (event, fieldLabel) => {
    setInputFieldValues((prevValues) => ({
      ...prevValues,
      [fieldLabel]: event.target.value,
    }));
  };

  const handleStepLabelClick = (index) => {
    if (index === activeStep) {
      setActiveStep(-1);
    } else {
      setActiveStep(index);
    }
  };

  const handleSubmit = () => {
    // Create an object containing the data to be sent in the POST request
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

    // Send a POST request using Axios
    axios
      .post("http://localhost:2222/profile/add", postData)
      .then((response) => {
        console.log("Profile added successfully!");
        // You can perform any additional actions here, such as redirecting the user or updating the UI.
      })
      .catch((error) => {
        console.error("Error adding profile: ", error);
        // Handle the error, e.g., display an error message to the user.
      });
  };

  return (
    <Box sx={{ maxWidth: 400 }} className={styles.content_container}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.index}>
            <StepLabel
              onClick={() => handleStepLabelClick(index)}
              sx={{
                backgroundColor: activeStep === index ? "pink" : "transparent",
                borderRadius: 5,
                padding: 2,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h6">{step.label}</Typography>
                <Typography variant="body2">{step.status}</Typography>
              </div>
            </StepLabel>
            <StepContent>
              {step.fields.map((field, fieldIndex) => (
                // <TextField
                //   key={field.label}
                //   label={field.label}
                //   value={inputFieldValues[field.label]}
                //   onChange={(event) => handleFieldChange(event, field.label)}
                //   fullWidth
                //   margin="normal"
                // />

                <input
                  key={field.label}
                  type="text"
                  name={field.label}
                  value={inputFieldValues[field.label]}
                  onChange={(event) => handleFieldChange(event, field.label)}
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
        </Paper>
      )}
    </Box>
  );
}
