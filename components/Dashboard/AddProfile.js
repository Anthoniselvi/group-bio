import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField"; // Import TextField from Material-UI
import axios from "axios";
import Footer from "@/components/Footer/Footer";
const steps = ["Personal Information", "Company Information"];

export default function AddProfile() {
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

  const handleComplete = async () => {
    try {
      // Combine form data from both steps
      const formData = { ...formDataStep1, ...formDataStep2 };

      // Send POST request to your API endpoint
      const response = await axios.post("/api/profile", formData);
      console.log("response : " + JSON.stringify(response));
      if (response.status === 201) {
        console.log("Profile data submitted successfully!");
        // Reset the form data if needed
        setFormDataStep1({
          formDataStep1,
        });
        setFormDataStep2({
          formDataStep2,
        });
      } else {
        console.error("Error submitting profile data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
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
      industry: "",
      offers: "",
    });
  };

  return (
    <Box
      sx={{
        width: "100%",
        padding: "1rem",
        paddingTop: "8rem",
      }}
    >
      {/* <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper> */}
      <div style={{ paddingTop: "2rem" }}>
        {activeStep === 0 && (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <h3>Step 1</h3>
            <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
              Add your Personal information
            </Typography>
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
            <TextField
              label="Photo"
              value={formDataStep1.photo}
              onChange={(e) =>
                setFormDataStep1((prevData) => ({
                  ...prevData,
                  photo: e.target.value,
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
                borderRadius: "20px",
                "&:hover": { backgroundColor: "#01b4e4", color: "#121212" },
              }}
            >
              Continue
            </Button>
          </div>
        )}

        {activeStep === 1 && (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <h3>Step 2</h3>
            <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
              Add your Business information
            </Typography>
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
                borderRadius: "20px",
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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 1000,
          paddingTop: "10vh",
        }}
      >
        <Button backgroundColor="secondary">Call Now</Button>
        <Button>Whatsapp Now</Button>
      </div>
      {/* <Footer /> */}
    </Box>
  );
}
