import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

const marks = [
  {
    value: 0,
    label: "0%",
  },
  {
    value: 40,
    label: "40%",
  },
  {
    value: 80,
    label: "80%",
  },
  {
    value: 100,
    label: "100%",
  },
];

function valuetext(value) {
  return `${value}%`;
}

export default function ProgressSlider() {
  return (
    <Box sx={{ width: 300 }}>
      <Slider
        aria-label="Always visible"
        defaultValue={80}
        getAriaValueText={valuetext}
        step={10}
        marks={marks}
        valueLabelDisplay="on"
      />
    </Box>
  );
}