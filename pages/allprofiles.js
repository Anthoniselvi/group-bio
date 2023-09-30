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
import ProfileCard from "@/components/Dashboard/ProfileCard";
import { useRouter } from "next/router";
const steps = ["Personal Information", "Company Information"];

export default function AllProfiles() {
  const router = useRouter();
  const navigateToCreateProfile = () => {
    router.push({
      pathname: "/form",
    });
  };
  return (
    <div style={{ padding: "1rem", paddingTop: "6rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingBottom: "1rem",
        }}
      >
        <h2>Members</h2>
        <button
          style={{
            padding: "10px 20px",
            backgroundColor: "#00b4d8",
            color: "#fff",
            borderRadius: "20px",
            border: "none",
            cursor: "pointer",
          }}
          onClick={navigateToCreateProfile}
        >
          + Add
        </button>
      </div>
      <ProfileCard />
    </div>
  );
}
