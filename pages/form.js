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
import AddProfile from "@/components/Dashboard/AddProfile";
import CreateMember from "@/components/Home/createMember";
const steps = ["Personal Information", "Company Information"];

export default function Form() {
  return (
    <div>
      {/* <AddProfile /> */}
      <CreateMember />
    </div>
  );
}
