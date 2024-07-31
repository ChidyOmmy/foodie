import { useTheme } from "@mui/material/styles";
import {
  Box,
  Card,
  CardActions,
  CardMedia,
  Typography,
  Stack,
  Skeleton
} from "@mui/material";
import { useState } from "react";
import AddToCart from "./AddToCart";

import Ratings from "./Ratings";

const MealCard = ({ purchased, meal }) => {
  const theme = useTheme();
  const [loaded, setLoaded] = useState(true);
  return (
    <Card sx={{ maxWidth: "100%" }}>
      <Stack
        direction='row'
        sx={{
          zIndex: 2,
          justifyContent: "space-between",
          position: "absolute",
          bottom: 50,
          width: "100%",
          backgroundImage:
            "linear-gradient(to top, rgba(0,0,0,0.2), rgba(0,0,0,0.1))"
        }}>
        <Typography
          sx={{
            color: "#fff",
            fontWeight: "900"
          }}
          variant='h6'>
          {meal.title}{" "}
        </Typography>
        <Ratings meal={meal} />
      </Stack>
      {loaded ? (
        <CardMedia
          component='img'
          onLoad={() => setLoaded(true)}
          loading='lazy'
          src={meal.image}
          alt='image of food'
          height={410}
          sx={{
            maxWidth: "100%",
            cursor: "pointer"
          }}
        />
      ) : (
        <Skeleton
          sx={{ backgroundColor: "#ccc", maxWidth: "100%" }}
          animation='wave'
          variant='rectangular'
          height={410}
        />
      )}

      <CardActions
        sx={{
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: theme.palette.secondary.main
        }}>
        {purchased ? (
          <Box
            sx={{
              display: "flex",
              width: "30px",
              height: "30px",
              justifyContent: "center",
              alignItems: "center",
              padding: 0,
              borderRadius: "25px",
              backgroundColor: theme.palette.primary.main
            }}>
            <Typography
              sx={{
                color: "#fff",
                margin: 0,
                paddign: 0
              }}
              variant='h6'>
              {purchased}
            </Typography>
          </Box>
        ) : (
          <></>
        )}
        <Box>
          <Typography sx={{ color: "#fff", fontWeight: 500 }}>
            TZS {meal.price}
          </Typography>
        </Box>
        <AddToCart order={meal} />
      </CardActions>
    </Card>
  );
};

export default MealCard;
