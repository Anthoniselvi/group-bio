import * as React from "react";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";

export default function ProfileCard() {
  const theme = useTheme();
  const router = useRouter();
  const [profilesList, setProfilesList] = useState([]);
  const [selectedLetter, setSelectedLetter] = useState(null);

  const profileCardsRef = useRef(null);

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

      // Scroll to the first profile card starting with the selected letter
      const firstProfileCardStartingWithLetter =
        profileCardsRef.current.querySelector(
          `*[data-starts-with="${letter}"]`
        );
      if (firstProfileCardStartingWithLetter) {
        firstProfileCardStartingWithLetter.scrollIntoView({
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <div style={{ display: "flex", gap: "1rem" }}>
      <div
        ref={profileCardsRef}
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
              flexDirection: "column",
              // justifyContent: "center",
              alignItems: "center",
              boxShadow: "0px 1px 5px 1px #03045e",
            }}
            key={item.profileId}
            onClick={() => navigateToSingleProfile(item)}
            data-starts-with={item.name.charAt(0).toLowerCase()}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "top",
                width: "100%",
              }}
            >
              <CardContent
                sx={{
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
                  sx={{
                    fontFamily: "Sans-serif",
                    fontSize: "15px",
                  }}
                >
                  {item.course}, {item.year}
                </Typography>
              </CardContent>
              <CardMedia
                component="div"
                sx={{
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  overflow: "hidden",
                  marginTop: 2,
                }}
              >
                {item.image ? (
                  <img
                    src={item.image}
                    style={{ width: "100%", height: "100%" }}
                    alt="image"
                  />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      background: "#00b4d8",
                      borderRadius: "50%",
                      fontSize: "20px",
                      fontWeight: "bold",
                    }}
                  >
                    {item.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </CardMedia>
            </Box>

            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "left",
                gap: "0.5em",
                padding: 0,
                paddingLeft: "1em",
                // paddingTop: "1em",
                width: "100%",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Sans-serif",
                  fontSize: "14px",
                  color: "#999999",
                }}
                component="div"
              >
                {item.designation}
                <br />
                {item.company}
                <br />
                {item.location}
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Sans-serif",
                  fontSize: "14px",
                  color: "#000000",
                  backgroundColor: "red",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  display: "inline-block",
                }}
                component="div"
              >
                {/* Services Offered: <br /> */}
                {item.offers}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
      {/* <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "absolute",
          zIndex: 4,
          padding: "0px 5px",
          cursor: "pointer",
          right: 5,
          backgroundColor: "#f8edeb",
          borderRadius: "10px",
          position: "fixed",
          height: "calc(100vh-150px)",
          justifyContent: "space-between",
        }}
      >
        {alphabet.map((letter) => (
          <p
            key={letter}
            onClick={() => handleLetterClick(letter)}
            style={{ fontSize: 13 }}
          >
            {letter.toUpperCase()}
          </p>
        ))}
      </div> */}
    </div>
  );
}
