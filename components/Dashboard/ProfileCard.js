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
import Photo from "./photo.png";
import Image from "next/image";

export default function ProfileCard() {
  const theme = useTheme();
  const router = useRouter();
  const [profilesList, setProfilesList] = useState([]);
  const [selectedLetter, setSelectedLetter] = useState(null);

  const navigateToSingleProfile = (item) => {
    router.push({
      pathname: "/singleprofile",
      query: { id: item.profileId },
    });
  };

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/profile/all`)
      .then((response) => {
        const sortedProfiles = response.data.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setProfilesList(sortedProfiles);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

  const filterProfilesByLetter = (letter) => {
    const filtered = profilesList.filter(
      (item) => item.name.charAt(0).toLowerCase() === letter
    );
    return filtered;
  };

  const handleLetterClick = (letter) => {
    if (selectedLetter === letter) {
      setSelectedLetter(null);
      router.push({
        pathname: "/filteredprofile",
        query: { searchResult: JSON.stringify(profilesList), searchQuery: "" },
      });
    } else {
      setSelectedLetter(letter);
      const filteredData = filterProfilesByLetter(letter);
      router.push({
        pathname: "/filteredprofile",
        query: {
          searchResult: JSON.stringify(filteredData),
          searchQuery: letter,
        },
      });
    }
  };

  return (
    <div style={{ display: "flex", gap: "1rem" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          gap: "1rem",
        }}
      >
        {profilesList.map((item) => (
          <Card
            sx={{
              display: "flex",
              padding: "0 1em",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0px 1px 5px 1px #121212",
            }}
            key={item.profileId}
            onClick={() => navigateToSingleProfile(item)}
          >
            <CardMedia
              component="div"
              sx={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                overflow: "hidden",
              }}
            >
              <img
                src={item.image}
                style={{ width: "100%", height: "100%" }}
                alt="image"
              />
              {/* <Image
              src={`/${item.image}`}
              alt="Profile Image"
              width={70}
              height={70}
              objectFit="cover"
            /> */}
            </CardMedia>

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
                  component="div"
                  // variant="h5"
                  sx={{
                    fontFamily: "Sans-serif",
                    fontSize: "15px",
                  }}
                >
                  {item.course}, {item.year}
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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "absolute",
          zIndex: 4,
          padding: "0px 5px",
          right: 5,
          backgroundColor: "#f8edeb",
          borderRadius: "10px",
        }}
      >
        {alphabet.map((letter) => (
          <p
            key={letter}
            onClick={() => handleLetterClick(letter)}
            // ...rest of the button styling...
          >
            {letter.toUpperCase()}
          </p>
        ))}
      </div>
    </div>
  );
}
