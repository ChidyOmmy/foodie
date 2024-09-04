import React from "react";
import { Box, Card, Stack, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import AddToCart from "./AddToCart";
import PurchasedBox from "./PurchasedBox";

const MealCardLarge = React.memo(({ meal, purchased }) => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.up("xs"));
  const tablet = useMediaQuery(theme.breakpoints.up("sm"));
  const desktop = useMediaQuery(theme.breakpoints.up("lg"));

  const direction = () => {
    if (desktop) return "row";
    if (tablet) return "row";
    if (mobile) return "column";
  };
  return (
    <Box>
      <Card sx={{ width: "100%", maxWidth: "100%", padding: 0 }}>
        <Stack
          direction={direction()}
          spacing={2}
          sx={{
            padding: 0,
            margin: 0,
            justifyContent: "flex-start",
            width: "100%",
            maxWidth: "100%"
          }}>
          <Box
            sx={{
              width: "70%",
              [theme.breakpoints.down("sm")]: {
                width: "100%"
              }
            }}
            component='img'
            alt={meal.title}
            src={`http://localhost:8000/${meal.image}`}
          />
          <Stack
            sx={{
              width: "50%",
              justifyContent: "space-between",
              padding: 0,
              [theme.breakpoints.down("sm")]: {
                width: "100%"
              }
            }}
            direction='column'
            spacing={2}>
            <Stack direction='column' spacing={2}>
              <Typography
                variant='h5'
                color='secondary'
                sx={{ fontWeight: "500" }}>
                {meal.title.toUpperCase()}
              </Typography>
              <Typography sx={{ fontSize: "130%" }}>
                {" "}
                {meal.description}
              </Typography>
            </Stack>
            <Stack direction='column' spacing={2}>
              <Stack direction='row' sx={{ justifyContent: "space-between" }}>
                <Typography>TZS {meal.price} </Typography>
                {purchased > 0 && <PurchasedBox purchased={purchased} />}
              </Stack>
              <Stack direction='row' justifyContent='space-between'>
                <AddToCart order={meal} />
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Card>
    </Box>
  );
});

export default MealCardLarge;
