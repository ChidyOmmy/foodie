import React from "react";
import { Typography, Box } from "@mui/material";
import { YellowText as YT } from "./StyledComponents";
import burger from "../images/burger.png";

import Search from "./Search";

const Hero = () => {
  return (
    <Box
      sx={{
        paddingTop: 15,
        display: "flex",
        flexDirection: "row"
      }}>
      <Box
        sx={{
          display: "inline-block",
          width: "50%"
        }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "space-between",
            justifyContent: "space-between",
            gap: 2
          }}>
          <Typography variant='h5'>
            <YT>EPIC</YT> 😍 FOOD <br></br>
            EPIC 😋
            <YT> TASTE </YT>{" "}
          </Typography>
          <Typography>
            Take a journey around the bank without breaking the bank. Visit our
            restaurant for an exquisite culinary experience.
          </Typography>
          <Typography>
            Bringing the world to your plate one dish a time.
          </Typography>
          <Box>
            <Box sx={{ marginTop: 20 }}>
              <Search />
            </Box>
          </Box>
        </Box>
      </Box>
      <Box sx={{ width: "50%" }}>
        <Box
          component='img'
          alt='hero background'
          sx={{
            width: "75%",
            marginLeft: -6,
            marginTop: -12,
            display: "inline-block"
          }}
          src={burger}></Box>
      </Box>
    </Box>
  );
};

export default Hero;
