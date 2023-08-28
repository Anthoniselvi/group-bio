import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField"; // Import TextField from Material-UI

const steps = ["Personal Information", "Company Information"];

export default function HorizontalNonLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});

  // Add state variables to hold form data for each step
  const [formDataStep1, setFormDataStep1] = React.useState({
    name: "",
    batch: "",
    location: "",
    dob: "",
    interests: "",
    photo: "",
  });

  const [formDataStep2, setFormDataStep2] = React.useState({
    designation: "",
    company: "",
    industry: "",
    offers: "",
  });

  const handleNext = () => {
    // Update the next step logic based on the active step
    if (activeStep === 0) {
      // Handle data collection for Step 1
      // You can validate the data here before proceeding to the next step
      setActiveStep(activeStep + 1);
    } else if (activeStep === 1) {
      // Handle data collection for Step 2
      // You can validate the data here before submitting the form
      handleComplete(); // Automatically complete the second step
    }
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);

    // Log form data for Step 1 and Step 2
    console.log("Step 1 Data:", formDataStep1);
    console.log("Step 2 Data:", formDataStep2);
    handleReset();
    // handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
    setFormDataStep1({
      name: "",
      batch: "",
      location: "",
      dob: "",
      interests: "",
      photo: "",
    });
    setFormDataStep2({
      designation: "",
      company: "",
      offers: "",
    });
  };

  return (
    <Box sx={{ width: "100%", padding: "1rem", paddingTop: "8rem" }}>
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div style={{ paddingTop: "2rem" }}>
        {activeStep === 0 && (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            {/* <Typography sx={{ mt: 2, mb: 1, py: 1 }}>Step 1</Typography> */}
            {/* Render input fields for Step 1 */}
            <TextField
              label="Name"
              value={formDataStep1.name}
              onChange={(e) =>
                setFormDataStep1((prevData) => ({
                  ...prevData,
                  name: e.target.value,
                }))
              }
            />
            <TextField
              label="Batch"
              value={formDataStep1.batch}
              onChange={(e) =>
                setFormDataStep1((prevData) => ({
                  ...prevData,
                  batch: e.target.value,
                }))
              }
            />
            <TextField
              label="Location"
              value={formDataStep1.location}
              onChange={(e) =>
                setFormDataStep1((prevData) => ({
                  ...prevData,
                  location: e.target.value,
                }))
              }
            />
            <TextField
              label="Date of Birth"
              value={formDataStep1.dob}
              onChange={(e) =>
                setFormDataStep1((prevData) => ({
                  ...prevData,
                  dob: e.target.value,
                }))
              }
            />
            <TextField
              label="Interests"
              value={formDataStep1.interests}
              onChange={(e) =>
                setFormDataStep1((prevData) => ({
                  ...prevData,
                  interests: e.target.value,
                }))
              }
            />
            {/* Render other input fields for Step 1 */}
            <Button
              onClick={handleNext}
              sx={{
                mr: 1,
                backgroundColor: "#032541",
                color: "#fff",
                "&:hover": { backgroundColor: "#01b4e4", color: "#121212" },
              }}
            >
              Next
            </Button>
          </div>
        )}

        {activeStep === 1 && (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            {/* <Typography sx={{ mt: 2, mb: 1, py: 1 }}>Step 2</Typography> */}
            {/* Render input fields for Step 2 */}
            <TextField
              label="Designation"
              value={formDataStep2.designation}
              onChange={(e) =>
                setFormDataStep2((prevData) => ({
                  ...prevData,
                  designation: e.target.value,
                }))
              }
            />
            <TextField
              label="Company"
              value={formDataStep2.company}
              onChange={(e) =>
                setFormDataStep2((prevData) => ({
                  ...prevData,
                  company: e.target.value,
                }))
              }
            />
            <TextField
              label="Industry"
              value={formDataStep2.industry}
              onChange={(e) =>
                setFormDataStep2((prevData) => ({
                  ...prevData,
                  industry: e.target.value,
                }))
              }
            />
            <TextField
              label="Offers"
              value={formDataStep2.offers}
              onChange={(e) =>
                setFormDataStep2((prevData) => ({
                  ...prevData,
                  offers: e.target.value,
                }))
              }
            />
            {/* Render other input fields for Step 2 */}
            <Button
              onClick={handleComplete}
              sx={{
                mr: 1,
                backgroundColor: "#032541",
                color: "#fff",
                "&:hover": { backgroundColor: "#01b4e4", color: "#121212" },
              }}
            >
              Submit
            </Button>
          </div>
        )}

        {Object.keys(completed).length === steps.length && (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        )}
      </div>
    </Box>
  );
}
