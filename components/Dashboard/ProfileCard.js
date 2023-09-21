import * as React from "react";
import { useEffect, useState } from "react"; // Import useEffect and useState
import axios from "axios"; // Import Axios
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import { useRouter } from "next/router";
import TopBar from "../TopBar/TopBar";

export default function ProfileCard() {
  const theme = useTheme();
  const router = useRouter();
  const [data, setData] = useState([]); // State to store the fetched data

  const navigateToSingleProfile = (item) => {
    router.push({
      pathname: "/singleprofile",
      query: { id: item._id }, // Pass the clicked item's ID as a query parameter
    });
  };

  useEffect(() => {
    // Fetch data from your API endpoint when the component mounts
    axios
      .get("http://localhost:2222/profile/all")
      .then((response) => {
        setData(response.data);
        console.log("Data:" + JSON.stringify(response.data));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        cursor: "pointer",
      }}
    >
      {data.map((item) => (
        <Card
          sx={{
            display: "flex",
            padding: "1em",
            paddingTop: 0,
            paddingBottom: 0,
            justifyContent: "center",
            alignItems: "center",
          }}
          key={item.id}
          onClick={() => navigateToSingleProfile(item)}
        >
          <CardMedia
            component="img"
            sx={{
              width: 70,
              height: 70,
              borderRadius: "50%",
            }}
            image={item.photo}
            alt="Profile Image"
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "top",
              width: "100%",
            }}
          >
            <CardContent
              sx={{
                // flex: "1 0 auto",
                display: "flex",
                flexDirection: "column",
                gap: "0.5em",
                padding: 0,
                paddingLeft: "1em",
                paddingTop: "1em",
              }}
            >
              <Typography
                component="div"
                // variant="h5"
                sx={{
                  fontFamily: "Sans-serif",
                  fontSize: "17px",
                  fontWeight: 600,
                }}
              >
                {item.name}
              </Typography>

              <Typography
                sx={{
                  fontFamily: "Sans-serif",
                  fontSize: "14px",
                  color: "#999999",
                }}
                // variant="subtitle1"
                // color="text.secondary"
                component="div"
              >
                {item.designation}, {item.company}
                <br />
                {item.location}
              </Typography>

              <Typography
                sx={{
                  fontFamily: "Sans-serif",
                  fontSize: "14px",
                  color: "#000000",
                }}
                // variant="subtitle1"
                // color="text.secondary"
                component="div"
              >
                Services Offered: <br />
                {item.offers}
              </Typography>
            </CardContent>
          </Box>
        </Card>
      ))}
    </div>
  );
}
