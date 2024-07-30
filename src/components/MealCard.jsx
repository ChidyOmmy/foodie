import { useTheme } from "@mui/material/styles";
import {
  Box,
  Card,
  CardActions,
  CardMedia,
  Typography,
  Stack
} from "@mui/material";
import AddToCart from "./AddToCart";

import Ratings from "./Ratings";

const MealCard = ({ purchased, meal }) => {
  const theme = useTheme();
  return (
    <Card sx={{ cursor: "hand" }}>
      <Stack
        direction='row'
        sx={{
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
      <CardMedia
        component='img'
        src={meal.image}
        alt='image of food'
        sx={{
          width: "100%"
        }}
      />
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
          <Typography component='b' sx={{ color: "#fff" }}>
            TZS {meal.price}
          </Typography>
        </Box>
        <AddToCart order={meal} />
      </CardActions>
    </Card>
  );
};

export default MealCard;
