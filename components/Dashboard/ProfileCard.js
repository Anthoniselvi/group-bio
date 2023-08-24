import * as React from "react";
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
import { data } from "../data";
import { useRouter } from "next/router";
import TopBar from "../TopBar/TopBar";

export default function ProfileCard() {
  const theme = useTheme();
  const router = useRouter();
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
      }}
    >
      {data.map((item) => (
        <Card
          sx={{ display: "flex", padding: "1em" }}
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
            alt="Live from space album cover"
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
                flex: "1 0 auto",
                padding: 0,
                paddingLeft: "1em",
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
                {item.role} - {item.companyName}
              </Typography>
              {/* <Typography
                sx={{
                  fontFamily: "Sans-serif",
                  fontSize: "14px",
                  color: "#000000",
                  fontWeight: 600,
                }}
                component="div"
              >
                {item.companyName}
              </Typography> */}
              <Typography
                sx={{
                  fontFamily: "Sans-serif",
                  fontSize: "14px",
                  color: "#999999",
                  // color: "#000000",
                  // fontWeight: 600,
                }}
                // variant="subtitle1"
                // color="text.secondary"
                component="div"
              >
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
    </div>
  );
}
