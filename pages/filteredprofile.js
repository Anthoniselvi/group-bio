import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useRouter } from "next/router";
import styles from "@/styles/SingleProfile.module.css";

export default function FilteredProfile() {
  const router = useRouter();
  const { searchResult, searchQuery } = router.query;

  const navigateToAllProfiles = () => {
    router.push({
      pathname: "/",
    });
  };

  let filteredData = []; // Initialize with an empty array

  try {
    if (searchResult) {
      filteredData = JSON.parse(searchResult);
    }
  } catch (error) {
    console.error("Error parsing JSON:", error);
  }
  const navigateToSingleProfile = (item) => {
    router.push({
      pathname: "/singleprofile",
      query: { id: item.profileId }, // Pass the clicked item's ID as a query parameter
    });
  };
  const getFirstLetterCapital = (name) => {
    return name.charAt(0).toUpperCase();
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        cursor: "pointer",
        padding: "1rem",
        paddingTop: "7rem",
      }}
    >
      {filteredData ? (
        <>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <KeyboardBackspaceIcon
              style={{ cursor: "pointer" }}
              onClick={navigateToAllProfiles}
            />
            Results for <strong>"{searchQuery}"</strong>
          </div>

          {filteredData.map((item) => (
            <Card
              sx={{
                display: "flex",
                padding: "1em",
                paddingTop: 0,
                paddingBottom: 0,
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "0px 1px 5px 1px #90e0ef",
              }}
              key={item.profileId}
              onClick={() => navigateToSingleProfile(item)}
            >
              {/* <CardMedia
                component="img"
                sx={{
                  width: 70,
                  height: 70,
                  borderRadius: "50%",
                }}
                image={item.photo}
                alt="Profile Image"
              /> */}
              {item.image ? (
                // Display the image if it is available
                <img
                  src={item.image}
                  alt="Profile"
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                  }}
                />
              ) : (
                // Display the first letter of the name in capital if no image is available
                <div className={styles.nameInitial}>
                  <p className={styles.firstletter}>
                    {getFirstLetterCapital(item.name)}
                  </p>
                </div>
              )}
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
        </>
      ) : (
        <p style={{ color: "black" }}>No Results found</p>
      )}
    </div>
  );
}
