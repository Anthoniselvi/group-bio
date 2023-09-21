import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import axios from "axios";
import Footer from "@/components/Footer/Footer";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

const steps = ["Personal Information", "Company Information"];

export default function AddProfile() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});

  const [formDataStep1, setFormDataStep1] = React.useState({
    name: "",
    course: "",
    year: "",
    location: "",
    phone: "",
    photo: "",
  });

  const [formDataStep2, setFormDataStep2] = React.useState({
    company: "",
    designation: "",
    industry: "",
    offers: "",
  });

  const [formDataStep3, setFormDataStep3] = React.useState({
    linkedin: "",
    website: "",
  });

  const handleNext = () => {
    if (activeStep === 0) {
      setActiveStep(activeStep + 1);
    } else if (activeStep === 1) {
      setActiveStep(activeStep + 1);
    } else if (activeStep === 2) {
      handleComplete();
    }
  };
  const handlePrev = () => {
    if (activeStep === 2) {
      setActiveStep(activeStep - 1);
    } else if (activeStep === 1) {
      setActiveStep(activeStep - 1);
    }
  };
  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  // const handleComplete = async () => {
  //   try {
  //     // Generate a userId
  //     // const userId = await generateUserId();

  //     // Add userId to the formData
  //     const formData = {
  //       ...formDataStep1,
  //       ...formDataStep2,
  //       ...formDataStep3,
  //       // userId,
  //     };

  //     console.log("input details:" + JSON.stringify(formData));
  //     const response = await axios.post("/api/profile", formData);
  //     console.log("response : " + response);
  //     if (response.status === 201) {
  //       console.log("Profile data submitted successfully!");

  //       // Clear the form after submission
  //       setFormDataStep1({
  //         name: "",
  //         batch: "",
  //         location: "",
  //         phone: "",
  //         photo: "",
  //       });
  //       setFormDataStep2({
  //         company: "",
  //         designation: "",
  //         industry: "",
  //         offers: "",
  //       });
  //       setFormDataStep3({
  //         linkedin: "",
  //         website: "",
  //       });
  //     } else {
  //       console.error("Error submitting profile data");
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  const handleComplete = (e) => {
    e.preventDefault();
    const formData = {
      ...formDataStep1,
      ...formDataStep2,
      ...formDataStep3,
    };
    axios
      .post(
        "http://localhost:2222/profile/add",
        // `${process.env.REACT_APP_BASE_URL}/profile/add`,
        formData
      )
      .then((response) => {
        console.log(response);
        console.log("CreatedEvent: " + JSON.stringify(response.data));
      });

    setFormDataStep1({
      name: "",
      course: "",
      year: "",
      location: "",
      phone: "",
      photo: "",
    });
    setFormDataStep2({
      company: "",
      designation: "",
      industry: "",
      offers: "",
    });
    setFormDataStep3({
      linkedin: "",
      website: "",
    });
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
    setFormDataStep1({
      name: "",
      course: "",
      year: "",
      location: "",
      phone: "",
      photo: "",
    });
    setFormDataStep2({
      company: "",
      designation: "",
      industry: "",
      offers: "",
    });
    setFormDataStep3({
      linkedin: "",
      website: "",
    });
  };

  return (
    <Box
      sx={{
        width: "100%",
        padding: "1rem",
        paddingTop: "6rem",
      }}
    >
      <div style={{ paddingTop: "2rem" }}>
        {activeStep === 0 && (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <h3>Step 1</h3>
            <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
              Add your Personal information
            </Typography>
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
              label="Course"
              value={formDataStep1.course}
              onChange={(e) =>
                setFormDataStep1((prevData) => ({
                  ...prevData,
                  course: e.target.value,
                }))
              }
            />
            <TextField
              label="Year"
              value={formDataStep1.year}
              onChange={(e) =>
                setFormDataStep1((prevData) => ({
                  ...prevData,
                  year: e.target.value,
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
              label="Contact Number"
              value={formDataStep1.phone}
              onChange={(e) =>
                setFormDataStep1((prevData) => ({
                  ...prevData,
                  phone: e.target.value,
                }))
              }
            />{" "}
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
            <>
              <KeyboardBackspaceIcon onClick={handlePrev} /> <h3>Step 2</h3>
            </>
            <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
              Add your Business information
            </Typography>
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

        {activeStep === 2 && (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <>
              <KeyboardBackspaceIcon onClick={handlePrev} />
              <h3>Step 3</h3>
            </>
            <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
              URL information
            </Typography>
            <TextField
              label="LinkedIn"
              value={formDataStep3.linkedin}
              onChange={(e) =>
                setFormDataStep3((prevData) => ({
                  ...prevData,
                  linkedin: e.target.value,
                }))
              }
            />
            <TextField
              label="Website"
              value={formDataStep3.website}
              onChange={(e) =>
                setFormDataStep3((prevData) => ({
                  ...prevData,
                  website: e.target.value,
                }))
              }
            />

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

      {/* <Footer /> */}
    </Box>
  );
}
