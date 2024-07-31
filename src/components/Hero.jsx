import React from "react";
import { Typography, Box, Stack } from "@mui/material";
import { YellowText as YT } from "./StyledComponents";
import burger from "../images/burger.png";
import { useTheme } from "@mui/material/styles";

import Search from "./Search";

const Hero = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        paddingTop: 15,
        display: "flex",
        flexDirection: "row",
        [theme.breakpoints.down("md")]: {
          flexDirection: "column",
          paddingTop: 5
        }
      }}>
      <Box
        sx={{
          display: "inline-block",
          width: "50%",
          [theme.breakpoints.down("md")]: {
            width: "100%"
          }
        }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "space-between",
            justifyContent: "space-between",
            gap: 2
          }}>
          <Stack direction='row' spacing={4} alignItems='center'>
            <Box>
              <Typography variant='h5'>
                <YT>EPIC</YT> 😍 FOOD <br></br>
                EPIC 😋
                <YT> TASTE </YT>{" "}
              </Typography>
            </Box>
            <Box
              component='img'
              alt='hero background'
              sx={{
                height: 100,
                [theme.breakpoints.up("md")]: {
                  display: "none"
                }
              }}
              src={burger}></Box>
          </Stack>
          <Typography>
            Take a journey around the bank without breaking the bank. Visit our
            restaurant for an exquisite culinary experience.
          </Typography>
          <Typography>
            Bringing the world to your plate one dish a time.
          </Typography>
          <Box>
            <Box
              sx={{
                marginTop: 20,
                [theme.breakpoints.down("md")]: { marginTop: 5 }
              }}>
              <Search />
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          width: "50%",
          [theme.breakpoints.down("md")]: {
            display: "none"
          }
        }}>
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
