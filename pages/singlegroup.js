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
import ProfileCard from "@/components/MembersList/ProfileCard";
import { useRouter } from "next/router";
import SingleGroupProfiles from "@/components/MembersList/SingleGroupProfiles";

export default function SingleGroup() {
  const router = useRouter();
  const { id: groupId, name } = router.query;
  const navigateToCreateProfile = (groupId) => {
    router.push({
      pathname: "/form",
      query: { id: groupId },
    });
  };
  return (
    <div style={{ padding: "1rem", marginTop: "6rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingBottom: "1rem",
        }}
      >
        <h2>{name}</h2>
        <button
          style={{
            padding: "10px 20px",
            backgroundColor: "#00b4d8",
            color: "#fff",
            borderRadius: "20px",
            border: "none",
            cursor: "pointer",
          }}
          onClick={() => navigateToCreateProfile(groupId)}
        >
          + Add
        </button>
      </div>
      <SingleGroupProfiles />
    </div>
  );
}