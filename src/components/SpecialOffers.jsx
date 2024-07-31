import { Stack, Box, Typography, Divider, useTheme } from "@mui/material";
import React from "react";
import kisinia from "../images/kisinia.png";
import { YellowText as YT } from "./StyledComponents";

const SpecialOffers = () => {
  const theme = useTheme();
  return (
    <Stack
      sx={{
        flexDirection: "row",
        justifyContent: "space-between",
        [theme.breakpoints.down("sm")]: {
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          maxWidth: "100%"
        }
      }}>
      <Box
        component='img'
        src={kisinia}
        sx={{
          height: 415,
          [theme.breakpoints.down("sm")]: {
            height: 315,
            maxWidth: "100%"
          }
        }}
        height={415}
      />
      <Box
        sx={{
          padding: 10,
          [theme.breakpoints.down("md")]: {
            padding: 2
          }
        }}>
        <Stack direction='column' spacing={1} p={5}>
          <Typography
            variant='h3'
            color='primary'
            sx={{
              fontWeight: 600,
              textAlign: "center",
              [theme.breakpoints.down("md")]: {
                fontSize: 26
              }
            }}>
            KISINIA SPECIAL
          </Typography>
          <Typography>
            Enjoy our special KISINIA OFFER for two people and more. You can
            enjoy this large plate with your lover, friends and family.
            <YT>Coming Soon.</YT>
          </Typography>
        </Stack>
        <Stack direction='row' spacing={2}>
          <Box>
            <Typography
              variant='h6'
              color='primary'
              sx={{ fontWeight: "bold" }}>
              10,000/=
            </Typography>
            <Typography>
              Suitable for two people, you also get two drinks with it
            </Typography>
          </Box>
          <Divider variant='middle' orientation='vertical' flexItem />
          <Box>
            <Typography
              variant='h6'
              color='primary'
              sx={{ fontWeight: "bold" }}>
              20,000/=
            </Typography>
            <Typography>
              Suitable for four people, you also get four drinks with it
            </Typography>
          </Box>
          <Divider variant='middle' orientation='vertical' flexItem />
          <Box>
            <Typography
              variant='h6'
              color='primary'
              sx={{ fontWeight: "bold" }}>
              25,000
            </Typography>
            <Typography>
              Suitable for six people, you also get six drinks with it
            </Typography>
          </Box>
        </Stack>
      </Box>
    </Stack>
  );
};

export default SpecialOffers;
