import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import { useRouter } from "next/router";

export default function FilteredProfile() {
  const router = useRouter();
  const { searchResult, searchQuery } = router.query;
  console.log("searchResult :" + JSON.stringify(searchResult));
  const filteredData = JSON.parse(searchResult);

  const navigateToSingleProfile = (item) => {
    router.push({
      pathname: "/singleprofile",
      query: { id: item.id }, // Pass the clicked item's ID as a query parameter
    });
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
          <div>
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
                image={item.image}
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
                    {item.role}, {item.companyName}
                    <br />
                    {item.city}
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
                    {item.servicesOffered}
                  </Typography>
                </CardContent>
              </Box>
            </Card>
          ))}
        </>
      ) : (
        <p>No Results found</p>
      )}
    </div>
  );
}
